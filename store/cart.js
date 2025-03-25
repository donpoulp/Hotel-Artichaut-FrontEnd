import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        bedroomType: null,
        selectedServices: {},
        totalPrice: 0,
    }),
    actions: {
        setBedroomType(bedroomType) {
            this.bedroomType = bedroomType;
        },
        addService(serviceId, servicePrice) {
            this.selectedServices[serviceId] = servicePrice;
            this.totalPrice += servicePrice;
        },
        removeService(serviceId, servicePrice) {
            delete this.selectedServices[serviceId];
            this.totalPrice -= servicePrice;
        },
        clearCart() {
            this.bedroomType = null;
            this.selectedServices = {};
            this.totalPrice = 0;
        },
    },
});
