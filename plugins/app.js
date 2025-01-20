import {useHeroStore} from "~/stores/hero.js";
import {defineNuxtPlugin} from "#app";
import {useStrongestStore} from "~/store/strongest.js";

export default defineNuxtPlugin(async () => {

    const strongestStore = useStrongestStore();
    const heroStore = useHeroStore();

    await strongestStore.loadStrongestData()
    await heroStore.loadHeroData()

    return {
        provide:{
            strongest : useStrongestStore(),
            hero : useHeroStore()
        }
    }
})