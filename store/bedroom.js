import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useBedroomStore = defineStore('bedroom', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadBedroomData(){
            this.data = (await useApiFetch(`/bedroom`)).data.value
        },
        async updateBedroomData(bedroomData){
            await useApiFetch(`/bedroom/`, {
                method: 'PUT',
                body: JSON.stringify(bedroomData)
            });
        }
    }
})