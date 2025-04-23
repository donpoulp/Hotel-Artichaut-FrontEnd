import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            csrfToken: '',
            user: null,
            isAuthenticated: false,
            isAdmin: false
        }
    },
    actions: {
        hydrateStore() {
            if (process.client) {
                const storedUser = useCookie('user');
                const storedToken = useCookie('XSRF-TOKEN');
                const storedUserId = useCookie('user_id');
                if (storedUser.value && storedToken.value && storedUserId.value) {
                    const user = storedUser.value;

                    this.user = user;
                    this.isAuthenticated = true;
                    if (user.is_admin === 1) {
                        this.isAdmin = true;
                    }else{
                        this.isAdmin = false;
                    }
                }
            }
        },

        async fetchCsrfToken() {
            try {
                // Appel à la route /sanctum/csrf-cookie pour configurer le cookie CSRF
                await $fetch('http://localhost:8000/sanctum/csrf-cookie', {
                    credentials: 'include'
                });
            } catch (error) {
                console.error("CSRF cookie error:", error);
                throw new Error('Unable to fetch CSRF token.');
            }
        },

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

                }else{
                    if (response.data._value.user){
                        const user = response.data._value.user;
                        useCookie('user').value = user;
                        this.isAuthenticated = true;
                        this.user = user;
                        const userIdCookie = useCookie('user_id');
                        userIdCookie.value = user.id;
                        if (user.is_admin === 1){
                            this.isAdmin = true;
                        }
                    }else{
                        throw new Error("Erreur lors de la recuperation de l'ustilisateur.");
                    }
                }
            } catch (err) {
                console.error("Registration error:", err);
                throw new Error(err.message || 'Erreur lors de l’inscription.');
            }
        },

        async login(credentials) {
            try {
                await this.fetchCsrfToken();

                const response = await useApiFetch(`/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data._value.user){
                    const user = response.data._value.user;
                    useCookie('user').value = user;
                    this.isAuthenticated = true;
                    this.user = user;
                    const userIdCookie = useCookie('user_id');
                    userIdCookie.value = user.id;

                    if (user.is_admin === 1){
                        this.isAdmin = true;
                    }
                }else{
                    throw new Error("Erreur lors de la recuperation de l'ustilisateur.");
                }

            } catch (error) {
                throw new Error('Login failed. Please check your credentials and try again.');
            }
        },

        async logout() {
            await useApiFetch(`/logout`, {
                method: 'POST',
            });

            useCookie('user').value = null;
            this.user = null;
            this.isAuthenticated = false;
            navigateTo('/')
        }
    }
})
