import {useHeroStore} from "~/stores/hero.js";
import {defineNuxtPlugin} from "#app";

export default defineNuxtPlugin(async () => {

    const heroStore = useHeroStore();

    await heroStore.loadHeroData()

    return {
        provide:{
            hero : useHeroStore()
        }
    }
})