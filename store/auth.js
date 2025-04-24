import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            csrfToken: '',
            user: null,
            isAuthenticated: false,
            // isAdmin: false
        }
    },
    actions: {
        hydrateStore() {
            if (process.client) {
                const storedUser = sessionStorage.getItem('user');
                if (storedUser) {
                    this.user = JSON.parse(storedUser);
                    this.isAuthenticated = true;
                }
            }
        },
        async register(userData) {
            try {
                // Effectuer la requête avec fetch

                const response = await fetch(`http://app:80/api/register`, {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // const response = await fetch(`http://artichaut_back:8000/api/register`, {
                //     method: 'POST',
                //     body: JSON.stringify(userData),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log("Error response:", errorData);

                    if (response.status === 422 && errorData.errors) {
                        let errorMessage = '';
                        if (errorData.errors.email) {
                            errorMessage = errorData.errors.email[0];
                        } else if (errorData.errors.password) {
                            errorMessage = errorData.errors.password[0];
                        }
                        return errorMessage;
                    } else {
                        throw new Error('Une erreur inconnue est survenue lors de l’inscription.');
                    }
                }

                // Convertir la réponse en JSON
                const responseData = await response.json();
                console.log("Registration successful", responseData);

                // Récupérer `user` et `access_token` correctement
                const user = responseData.user;
                const accessToken = responseData.access_token;

                if (accessToken) {
                    sessionStorage.setItem('access_token', accessToken);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.isAuthenticated = true;
                    this.user = user; // Ne pas convertir en JSON ici
                } else {
                    throw new Error('Access token not found in response');
                }

            } catch (err) {
                console.error("Registration error:", err);
                throw new Error(err.message || 'Erreur lors de l’inscription.');
            }
        },

        async login(credentials) {
            try {
                const response = await useApiFetch(`/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const user = response.data._value.user;

                if (response.data._value.access_token) {
                    sessionStorage.setItem('access_token', response.data._value.access_token);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.isAuthenticated = true;
                    this.user = user;  // Ne pas convertir en JSON ici
                } else {
                    throw new Error('Access token not found in response');
                }
            } catch (error) {
                throw new Error('Login failed. Please check your credentials and try again.');
            }
        },

        async logout() {
            const token = sessionStorage.getItem('access_token');
            await useApiFetch(`/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user');
            this.user = null;
            this.isAuthenticated = false;
            navigateTo('/')
        }
    }
})
