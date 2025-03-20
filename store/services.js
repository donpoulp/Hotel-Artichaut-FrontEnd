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
            data: []
        }
    },
    actions: {
        async loadServicesData(){
            this.data = (await useApiFetch(`/services`)).data.value
        },
    }
})