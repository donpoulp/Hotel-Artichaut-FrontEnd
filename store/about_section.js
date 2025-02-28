import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useAboutSectionStore = defineStore('about_section', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadAboutSectionData(){
            this.data = (await useApiFetch(`/about_section`)).data.value
        },
    }
})