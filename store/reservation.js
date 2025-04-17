import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";
import {useWebFetch} from "~/composables/useWebFetch.ts";
import reservation from "~/pages/backOffice/Reservation.vue";
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
            data: [],
            data2: []
        }
    },
    actions: {
        async loadReservationData() {
            this.data = (await useApiFetch(`/reservation`)).data.value
        },
        async addReservation(reservationData) {
            const { data, error, status } = await useApiFetch(`/reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (status.value === 'success' && data.value) {
                sessionStorage.setItem('reservation', JSON.stringify(reservationData));
                sessionStorage.setItem('id_res', data.value.reservation.id);
                return 201;
            } else if (status.value === 'error' && error.value) {
                return error.value.statusCode || 500;
            }
            return 500;
        },
        async addReservationFromBo(reservationData){
            await useApiFetch(`/reservation-from-bo`, {
                method: 'POST',
                body: JSON.stringify(reservationData),
            })
        },
        async loadReservationDataById(id) {
            this.data2 = (await useApiFetch(`/reservation/` + id, {
                method: 'GET',
            })).data.value
        },
        async loadReservationDataByUserId(user_id) {
            this.data2 = (await useApiFetch(`/reservations/user/` + user_id, {
                method: 'GET',
            })).data.value

        },
        async updateReservation(reservationData) {
          await useApiFetch(`/reservation/`, + reservationData.id, {
              method: 'PUT',
              body: JSON.stringify(reservationData),
          })
        },
        async updateReservationFromBo(reservationData, id) {
            await useApiFetch(`/reservation-from-bo/${id}`, {
                method: 'PUT',
                body: JSON.stringify(reservationData),
            })
        },
        async deleteReservation(id) {
            await useApiFetch(`/reservation/` + id, {
                method: 'DELETE'
            });
        }
    }
})
