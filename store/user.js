import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            data: [],
            data2: {}
        }
    },
    actions: {
        async loadUserData() {
            this.data = (await useApiFetch(`/user`)).data.value
        },
        async addUserData(userData) {
            await useApiFetch(`/user`, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
        },
        async loadUserDataById(id) {
            this.data2 = (await useApiFetch(`/user/` + id)).data.value
        },
        async updateUserData(userData) {
            await useApiFetch(`/user/` + userData.id, {
                method: 'PUT',
                body: JSON.stringify(userData)
            })
        },
        async deleteUserData(id) {
            await useApiFetch(`/user/` + id, {
                method: 'DELETE'
            });
        },
        async register(userData) {
            try {
                await useApiFetch(`/register`, {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log('Registration successful');
            } catch (error) {
                console.error('Registration failed', error);
            }
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