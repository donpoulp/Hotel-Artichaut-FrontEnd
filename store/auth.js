import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            data: [],
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
        async login(data) {
            const response = await useApiFetch(`/login`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // const token = data.access_token;
            this.user = response.user;
            localStorage.setItem('access_token', response.access_token);
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
        }
    }
})