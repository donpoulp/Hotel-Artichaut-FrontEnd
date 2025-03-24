import {defineStore} from 'pinia';
import {useApiFetch} from "~/composables/useApiFetch.ts";

/**
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} nameFr
 * @property {string} nameEn
 * @property {string} descriptionFr
 * @property {string} descriptionEn
 * @property {number} duration
 * @property {number} price
 * @property {number} time
 * @property {number} quantity
 * @property {string} background_color_1
 * @property {string} background_opacity_1
 * @property {string} backgroundText_color_1
 * @property {string} backgroundText_opacity_1
 * @property {string} backgroundText_color_2
 * @property {string} backgroundText_opacity_2
 * @property {string} created_at
 * @property {string} updated_at
 * @property {Object} pivot
 * @property {number} pivot.reservation_id
 * @property {number} pivot.service_id
 */

export const useServicesStore = defineStore('services', {
    state: () => {
        return {
            /** @type {Service[]} */
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