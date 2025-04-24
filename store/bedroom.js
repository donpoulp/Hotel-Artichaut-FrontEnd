import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useBedroomStore = defineStore('bedroom', {
    state: () => {
        return {
            data: [],
            data2 : []
        }
    },
    actions: {
        async loadBedroomData(){
            this.data = (await useApiFetch(`/bedroom`)).data.value
            console.log(this.data)

            this.data.forEach((bedroom) =>{
                if (bedroom.updated_at) {
                    const date = new Date(bedroom.updated_at);
                    bedroom.updated_at_formatted = date.toLocaleString("fr-FR", {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
            })
        },
        async loadBedroomDataById(id){
            this.data2 = (await useApiFetch(`/bedroom/` + id)).data.value
        },
        async addBedroom(bedroomData){
            await useApiFetch(`/bedroom`, {
                method: 'POST',
                body: JSON.stringify(bedroomData)
            });
        },
        async updateBedroomData(bedroomData, id){
            await useApiFetch(`/bedroom/${id}`, {
                method: 'PUT',
                body: JSON.stringify(bedroomData)
            });
        },
        async deleteBedroom(id){
            await useApiFetch(`/bedroom/${id}`, {
                method: 'DELETE'
            });
        }
    }
})