import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useFooterStore = defineStore('footer', {
    state: () => {
        return {
            data: {}
        }
    },
    actions: {
        async loadFooterData(){
            this.data = (await useApiFetch(`/footer/1`)).data.value
        },
        async updateFooterData(newData){
            await useApiFetch(`/footer/1`, {
                method: 'PUT',
                body: JSON.stringify(newData)
            });
            this.data = newData;
        }
    }
})
