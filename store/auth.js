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
        // async fetchCsrfToken() {
        //     await useApiFetch(`/sanctum/csrf-cookie`, {
        //         method: 'GET',
        //     })
        // },
        async register(userData) {
            try {
                // Effectuer la requête avec fetch
                const response = await fetch(`http://localhost:8000/api/register`, {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Registration successful", responseData);
                    sessionStorage.setItem('access_token', responseData.access_token);
                    this.isAuthenticated = true;
                    return null
                } else {
                    const errorData = await response.json();
                    console.log("Error response:", errorData);

                    if (response.status === 422 && errorData.errors) {
                        let errorMessage = '';
                        console.log("Errors:", errorData.errors);
                        if (errorData.errors.email) {
                            console.log("emails")
                            errorMessage = errorData.errors.email[0];
                        } else if (errorData.errors.password) {
                            console.log("password")
                            errorMessage = errorData.errors.password[0];
                        }
                        console.log("errorMessage",errorMessage);
                        return errorMessage;
                    } else {
                        return 'Une erreur inconnue est survenue lors de l’inscription.'; // Erreur générique
                    }
                }
            } catch (err) {
                console.error('An unexpected error occurred:', err);
                return 'Une erreur inconnue est survenue lors de l’inscription.';

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
                console.log(response.data._value.access_token)
                const user = toRaw(response.data._value.user)
                console.log(user)
                if (response.data._value.access_token) {
                    sessionStorage.setItem('access_token', response.data._value.access_token)
                    sessionStorage.setItem('user', JSON.stringify(user))
                    this.isAuthenticated = true
                    this.user = JSON.stringify(user)
                } else {
                    console.error('Access token not found in response');
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
            })
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user');
            this.user = null;
            this.isAuthenticated = false;
        }
    }
})