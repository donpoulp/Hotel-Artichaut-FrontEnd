import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useStrongestStore = defineStore('strongest', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadStrongestData(){
            this.data = (await useApiFetch(`/strongest/1`)).data.value
        },
        async updateStrongestData(newData){
            await useApiFetch(`/strongest/d640d4d4-73a2-457c-8c7f-c8135e7f13a9`, {
                method: 'PUT',
                body: JSON.stringify(newData)
            });
            this.data = newData;
        }
    }
})