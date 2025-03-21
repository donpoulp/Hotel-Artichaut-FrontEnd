import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useBedroomTypeStore = defineStore('bedroom-type', {
    state: () => {
        return {
            data: [],
            data2 : []
        }
    },
    actions: {
        async loadBedroomTypeData(){
            this.data = (await useApiFetch(`/bedroomType`)).data.value
        },
        async loadBedroomTypeDataById(id){
            this.data2 = (await useApiFetch(`/bedroomType/` + id)).data.value
        },
        async updateBedroomTypeData(bedroomData){
            await useApiFetch(`/bedroomType/${bedroomData.id}`, {
                method: 'PUT',
                body: JSON.stringify(bedroomData)
            });
        },
    }
})