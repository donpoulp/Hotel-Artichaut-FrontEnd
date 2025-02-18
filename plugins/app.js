import {useHeroStore} from "~/store/hero.js";
import {defineNuxtPlugin} from "#app";
import {useStrongestStore} from "~/store/strongest.js";
import {useFooterStore} from "~/store/footer.js";
import {useStrongestSectionStore} from "~/store/strongest-section.js";

export default defineNuxtPlugin(async () => {

    const strongestSectionStore = useStrongestSectionStore();
    const strongestStore = useStrongestStore();
    const heroStore = useHeroStore();
    const footerStore = useFooterStore();

    await strongestSectionStore.loadStrongestSectionData()
    await strongestStore.loadStrongestData()
    await heroStore.loadHeroData()
    await footerStore.loadFooterData()

    return {
        provide:{
            strongest_section: useStrongestSectionStore(),
            strongest : useStrongestStore(),
            hero : useHeroStore(),
            footer : useFooterStore()
        }
    }
})