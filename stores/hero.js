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
            this.data = (await useApiFetch(`/hero/3353c5f6-8bd0-4c59-b76b-fcc12fed18bc`)).data.value
        }
    }
})
