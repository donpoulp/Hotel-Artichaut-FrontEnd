import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        bedroomType: null,
        // selectedServices: {},
        // selectedDates: { start: null, end: null },
        // totalPrice: 0,
    }),
    actions: {
        setBedroomType(bedroomType) {
            this.bedroomType = bedroomType;
        },
        // addService(serviceId, servicePrice) {
        //     this.selectedServices[serviceId] = servicePrice;
        //     this.totalPrice += servicePrice;
        // },
        // removeService(serviceId, servicePrice) {
        //     delete this.selectedServices[serviceId];
        //     this.totalPrice -= servicePrice;
        // },
        // setDates(start, end) {
        //     this.selectedDates = { start, end };
        // },
        // clearCart() {
        //     this.bedroomType = null;
        //     this.selectedServices = {};
        //     this.selectedDates = { start: null, end: null };
        //     this.totalPrice = 0;
        // },
    },
});

