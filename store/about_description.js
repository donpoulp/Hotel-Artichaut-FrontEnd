import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAboutDescriptionStore = defineStore('about_description', {
    state: () => {
        return {
            data: [],
            data2: []
        }
    },
    actions: {
        async loadAboutDescriptionData(){
            this.data = (await useApiFetch(`/about_description`)).data.value
        },
        async loadAboutDescriptionByIdData(id){
            this.data2 = (await useApiFetch(`/about_description/` + id)).data.value
        },
        async updateAboutDescriptionData(about_description){
            await useApiFetch(`/about_description/` + about_description.id, {
                method: 'PUT',
                body: JSON.stringify(about_description)
            })
        }
    }
})