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
            await useApiFetch(`/register`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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
                // console.log(response.data._value.access_token)
                // console.log(response.data._value.user.is_admin)

                if (response.data._value.access_token) {
                    sessionStorage.setItem('access_token', response.data._value.access_token);
                    this.isAuthenticated = true;
                } else {
                    console.error('Access token not found in response');
                }
            } catch (error) {
                console.error('Error during login:', error);
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
            this.user = null;
            this.isAuthenticated = false;
        }
    }
})