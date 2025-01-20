import {defineNuxtPlugin} from "#app";
import {useStrongestStore} from "~/store/strongest.js";

export default defineNuxtPlugin(async () => {

    const strongestStore = useStrongestStore();

    await strongestStore.loadStrongestData()

    return {
        provide:{
            strongest : useStrongestStore()
        }
    }
})