import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            csrfToken: '',
            user: null
        }
    },
    actions: {
        async fetchCsrfToken() {
            await useApiFetch(`/sanctum/csrf-cookie`, {
                method: 'GET',
            })
        },
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
            const response = await useApiFetch(`/login`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            this.user = data.user;
            localStorage.setItem('access_token', data.access_token);
        },
        async logout() {
            const token = localStorage.getItem('access_token');
            await useApiFetch(`/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            localStorage.removeItem('access_token');
            this.user = null;
        }
    }
})