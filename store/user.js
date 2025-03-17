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
        async loadUserData(){
            this.data = (await useApiFetch(`/user`)).data.value
        },
        async addUserData(userData){
            await useApiFetch(`/user`, {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },
        async loadUserDataById(id){
            this.data2 = (await useApiFetch(`/user/` + id)).data.value
        },
        async updateUserData(userData){
            await useApiFetch(`/user/` + userData.id, {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
        },
        async deleteUserData(id){
            await useApiFetch(`/user/` + id, {
                method: 'DELETE'
            });
        }
    }
})