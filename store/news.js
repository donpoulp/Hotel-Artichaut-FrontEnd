import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch.ts";

export const useNewsStore = defineStore('news', {
    state: () => {
        return {
            data: []
        }
    },
    actions: {
        async loadNewsData(){
            this.data = (await useApiFetch(`/news`)).data.value
        },
        async updateNewsData(news){
            await useApiFetch(`/news/` + news.id, {
                method: 'PUT',
                body: JSON.stringify(news)
            });
        }
    }
})