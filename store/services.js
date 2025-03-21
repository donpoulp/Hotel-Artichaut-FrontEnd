import {defineStore} from 'pinia';
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useServicesStore = defineStore('services', {
    state: () => {
        return {
            data: [],
            data2: []
        }
    },
    actions: {
        async loadServicesData(){
            this.data = (await useApiFetch(`/services`)).data.value
            this.data.forEach((service) =>{
                if (service.updated_at) {
                    const date = new Date(service.updated_at);
                    service.updated_at_formatted = date.toLocaleString("fr-FR", {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
                if (service.created_at) {
                    const date = new Date(service.created_at);
                    service.created_at_formatted = date.toLocaleString("fr-FR", {
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
        async loadServicesByIdData(id){
            this.data2 = (await useApiFetch(`/services/` + id)).data.value
        },
        async updateServiceData(service){
            await useApiFetch(`/services/` + service.id, {
                method: 'PUT',
                body: JSON.stringify(service)
            });
        },
        async addServiceData(service){
            await useApiFetch(`/services` , {
                method: 'POST',
                body: JSON.stringify(service)
            });
        },
        async deleteServiceData(id){
            await useApiFetch(`/services/` + id , {
                method: 'DELETE',
            });
        }
    }
})