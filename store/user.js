import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadUserData(){
            this.data = (await useApiFetch(`/user`)).data.value
        },
        async updateUserData(userData){
            await useApiFetch(`/user/` + userData.id, {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
        }
    }
})