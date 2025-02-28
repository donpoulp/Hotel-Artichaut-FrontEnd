import {defineStore} from 'pinia';
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useServicesStore = defineStore('services', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadServicesData(){
            this.data = (await useApiFetch(`/services`)).data.value
        },
    }
})