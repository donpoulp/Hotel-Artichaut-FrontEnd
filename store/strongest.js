import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useStrongestStore = defineStore('strongest', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadStrongestData(){
            this.data = (await useApiFetch(`/strongest/1`)).data.value
        },
        async updateStrongestData(strongestData){
            await useApiFetch(`/strongest/1`, {
                method: 'PUT',
                body: JSON.stringify(strongestData)
            });
        }
    }
})