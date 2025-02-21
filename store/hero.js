import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useHeroStore = defineStore('hero', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadHeroData(){
            this.data = (await useApiFetch(`/hero/1`)).data.value
        },
        async updateHeroData(newData){
            await useApiFetch(`/hero/1`, {
                method: 'PUT',
                body: JSON.stringify(newData)
            });
            this.data = newData;
        }
    }
})
