import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useDashboardStore = defineStore('dashboard', {
    state: () => {
        return {
            data: [],
            isLoading: false,
        }
    },
    actions: {
        async loadReservationsPerMonthData() {
            this.isLoading = true;
            try {
                const res = await useApiFetch(`/stats/reservations`);

                if (res.data) {
                    this.data = {
                        reservations: res.data.value.reservations,
                        users: res.data.value.users
                    }
                } else {
                    console.error("No data received from API");
                }
            } catch (error) {
                console.error("Erreur de récupération des données:", error);
            } finally {
                this.isLoading = false;
            }
        }
    }
})