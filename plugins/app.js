import {useHeroStore} from "~/store/hero.js";
import {defineNuxtPlugin} from "#app";
import {useStrongestStore} from "~/store/strongest.js";
import {useFooterStore} from "~/store/footer.js";
import {useStrongestSectionStore} from "~/store/strongest-section.js";
import {useNewsStore} from "~/store/news.js";
import {useReservationStore} from "~/store/reservation.js";
import {useUserStore} from "~/store/user.js";
import {useServicesStore} from "~/store/services.js";
import {useAboutStore} from "~/store/about.js";
import {useAboutSectionStore} from "~/store/about_section.js";
import {useAboutDescriptionStore} from "~/store/about_description.js";

export default defineNuxtPlugin(async () => {

    const strongestSectionStore = useStrongestSectionStore();
    const strongestStore = useStrongestStore();
    const heroStore = useHeroStore();
    const footerStore = useFooterStore();
    const reservationStore = useReservationStore();
    const newsStore = useNewsStore();
    const userStore = useUserStore();
    const servicesStore = useServicesStore()
    const aboutStore = useAboutStore()
    const aboutSectionStore = useAboutSectionStore()
    const aboutDescriptionStore = useAboutDescriptionStore()

    await strongestSectionStore.loadStrongestSectionData()
    await strongestStore.loadStrongestData()
    await heroStore.loadHeroData()
    await footerStore.loadFooterData()
    await newsStore.loadNewsData()
    await reservationStore.loadReservationData()
    await userStore.loadUserData()
    await servicesStore.loadServicesData()
    await aboutStore.loadAboutData()
    await aboutSectionStore.loadAboutSectionData()
    await aboutDescriptionStore.loadAboutDescriptionData()

    return {
        provide:{
            strongest_section: useStrongestSectionStore(),
            strongest : useStrongestStore(),
            hero : useHeroStore(),
            footer : useFooterStore(),
            reservation : useReservationStore(),
            news : useNewsStore(),
            user : useUserStore(),
            services: useServicesStore(),
            about: useAboutStore(),
            aboutSection: useAboutSectionStore(),
            aboutDescription: useAboutDescriptionStore(),
        }
    }
})