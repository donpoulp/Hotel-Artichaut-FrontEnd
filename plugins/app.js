import {useHeroStore} from "~/store/hero.js";
import {defineNuxtPlugin} from "#app";
import {useStrongestStore} from "~/store/strongest.js";
import {useFooterStore} from "~/store/footer.js";

export default defineNuxtPlugin(async () => {

    const strongestStore = useStrongestStore();
    const heroStore = useHeroStore();
    const footerStore = useFooterStore();

    await strongestStore.loadStrongestData()
    await heroStore.loadHeroData()
    await footerStore.loadFooterData()

    return {
        provide:{
            strongest : useStrongestStore(),
            hero : useHeroStore(),
            footer : useFooterStore()
        }
    }
})