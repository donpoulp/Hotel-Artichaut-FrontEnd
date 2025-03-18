import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";
// import { Reservation } from '~/types/reservation';

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

/**
 * @typedef {Object} Reservation
 * @property {number} id
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} user_id
 * @property {number} bedroom_id
 * @property {number} status_id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {Service[]} services
 */


export const useReservationStore = defineStore('reservation', {
    state: () => {
        return {
            /** @type {Reservation[]} */
            data: []
            // data: [] as Reservation[]
            // data2: []
        }
    },
    actions: {
        async loadReservationData(){
            this.data = (await useApiFetch(`/reservation`)).data.value
        },

        // async loadReservationData2(){
        //     this.data2 = (await useApiFetch(`/reservation`)).data.value
        // },

        // async updateReservationData(newData){
        //     await useApiFetch(`/reservation/{id}`, {
        //         method: 'PUT',
        //         body: JSON.stringify(newData)
        //     });
        //     this.data = newData;
        // }
    }
})
