import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useReservationStore = defineStore('reservation', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadReservationData(){
            this.data = (await useApiFetch(`/reservation`)).data.value
        },
    }
})
