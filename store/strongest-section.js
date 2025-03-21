import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useStrongestSectionStore = defineStore('strongest-section', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadStrongestSectionData(){
            this.data = (await useApiFetch(`/strongest_section`)).data.value
        },
        async updateStrongestSectionData(section){
            await useApiFetch(`/strongest_section/` + section.id, {
                method: 'PUT',
                body: JSON.stringify(section)
            });
        }
    }
})