import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useBedroomTypeStore = defineStore('bedroomType', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadBedroomTypeDataById(id){
            this.data = (await useApiFetch(`/bedroomType` +id)).data.value
        }
    }
})