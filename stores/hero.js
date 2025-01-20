import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useHeroStore = defineStore('cms', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadHeroData(){
            this.data = (await useApiFetch(`/hero/482a2b4d-4b6b-4e58-83c4-5156f2a5feb7`)).data.value
        },
        async updateHeroData(newData){
            await useApiFetch(`/hero/482a2b4d-4b6b-4e58-83c4-5156f2a5feb7`, {
                method: 'PUT',
                body: JSON.stringify(newData)
            });
            this.data = newData;
        }
    }
})
