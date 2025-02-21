<script setup>
import {useNewsStore} from "~/store/news.js";

const isOpen = ref(false)
const selectedNews = ref(null)

const newsStore = useNewsStore()

const openModal = (newsItem) => {
  selectedNews.value = newsItem
  isOpen.value = true
}

const carouselConfig = {
  itemsToShow: 3,
  wrapAround: true
}
</script>

<template>
    <div class="newsContainer">
        <h2>Our News</h2>

        <Carousel v-bind="carouselConfig">
            <Slide v-for="newsItem in newsStore.data" :key="newsItem.id" class="news">
                <div class="newsContent" label="Open" @click="openModal(newsItem)">
                  <!-- img source : :src="getImageUrl(newsItem.picture.picturePath)" -->
                    <img alt="Image News" />
                    <div class="newsTitle">{{ newsItem.title }}</div>
                </div>
                <div class=""></div>
            </Slide>

            <template #addons class="addonsCarrousel">
                <Pagination />
                <Navigation />
            </template>
        </Carousel>

    </div>
    <UModal v-model="isOpen" class="modal" :ui="{ height: 'h-[82vh]', width: 'w-[81vw] !max-w-none' }">
        <div class="bg-[#ede798] h-full w-full">
            <template v-if="selectedNews">
    <h1 class="font-noto font-light text-[4.2vw] text-center text-black mb-[10px]">{{ selectedNews.title }}</h1>
</template>
<div class="flex justify-evenly">
    <p class="w-[35vw] font-antic text-[2vw] text-black text-center !align-baseline">{{ selectedNews.description }}</p>
    <div class="flex flex-row flex-wrap w-[35vw] h-[60vh] items-center justify-between">
        <img class="w-full h-[40vh]"
            src="https://handicap.gouv.fr/sites/handicap/files/styles/w_1200/public/2024-04/Vacances-adaptees-organisees-VAO-personnes-handicapes-majeures.jpg.webp?itok=jsuUCfhW"
            alt="">
        <img class="w-[45%] h-[17vh]"
            src="https://cdn.prod.website-files.com/5e37f203adaca35c6914317f/623496f99ac1719d56ef98ff_stimuler-autonomie-personnes-agees.jpg"
            alt="">
        <img class="w-[45%] h-[17vh]"
            src="https://entreprise.maif.fr/files/live/sites/entreprise-Maif/files/images/engagement-solidarites/sous-engagements/soutenir-les-personnes-en-situation-de-handicap/soutenir-les-personnes-en-situation-de-handicap-eng.jpg"
            alt="">
    </div>
</div>

        </div>

    </UModal>
</template>

<style scoped>
.newsContainer {
    height: 516px;
    background-color: #EDE798;
}

.newsContainer h2 {
    font-family: Antic Didone;
    font-size: 64px;
    color: black;
    position: relative;
    left: 95px;
    top: 40px;
    margin-bottom: 80px;
    width: 20%;
}

.newsContent {
    width: 370px;
    height: 258px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.newsContent img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.newsTitle {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: Noto Serif;
    font-size: 30px;
    font-weight: 300;
    height: 75px;
    background-color: rgba(0, 0, 0, 0.55);
}

.carousel__pagination {
    display: none;
}
</style>
