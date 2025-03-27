import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useHeroStore = defineStore('hero', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadHeroData(){
            this.data = (await useApiFetch(`/hero/1`)).data.value
        },
        async updateHeroData(formData){
            const response = await useApiFetch(`/hero/1`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
        }
    }
})
