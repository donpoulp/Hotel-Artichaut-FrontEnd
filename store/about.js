import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAboutStore = defineStore('about', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadAboutData(){
            this.data = (await useApiFetch(`/about`)).data.value
        },
        async updateAboutData(newData){
            await useApiFetch(`/about/1`, {
                method: 'PUT',
                body: JSON.stringify(newData)
            })
        }
    }
})