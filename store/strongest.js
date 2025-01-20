import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useStrongestStore = defineStore('cms', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadStrongestData(){
            this.data = (await useApiFetch(`/strongest/590b00f0-13b9-4ffd-aa49-bcd94e058d35`)).data.value
        },
        async updateStrongestData(newData){
            await useApiFetch(`/strongest/590b00f0-13b9-4ffd-aa49-bcd94e058d35`, {
                method: 'PUT',
                body: JSON.stringify(newData)
            });
            this.data = newData;
        }
    }
})