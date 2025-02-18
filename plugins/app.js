import {useHeroStore} from "~/store/hero.js";
import {defineNuxtPlugin} from "#app";
import {useStrongestStore} from "~/store/strongest.js";
import {useStrongestSectionStore} from "~/store/strongest-section.js";

export default defineNuxtPlugin(async () => {

    const strongestSectionStore = useStrongestSectionStore();
    const strongestStore = useStrongestStore();
    const heroStore = useHeroStore();

    await strongestSectionStore.loadStrongestSectionData()
    await strongestStore.loadStrongestData()
    await heroStore.loadHeroData()

    return {
        provide:{
            strongest_section: useStrongestSectionStore(),
            strongest : useStrongestStore(),
            hero : useHeroStore()
        }
    }
})