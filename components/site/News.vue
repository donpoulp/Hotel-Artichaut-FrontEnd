<template>

<div class="newsContainer">
    <h2>Our News</h2>
    
    <Carousel v-bind="carouselConfig">
        <Slide v-for="newsItem in news" :key="newsItem.id" class="news">
            <div class="newsContent" @click="showModalNews = true">
                <img :src="getImageUrl(newsItem.picture.picturePath)" alt="Image News" />
                <div class="newsTitle">{{ newsItem.title }}</div>
                <PopupNews v-show="showModalNews" @close-modal="showModalNews = false" />
            </div>
        </Slide>
    
        <template #addons class="addonsCarrousel">
    
    <Pagination />
    <Navigation />
    </template>
</Carousel>
</div>
</template>

<script setup>
import PopupNews from './PopupNews.vue'

const getImageUrl = (relativePath) => {
  return `http://127.0.0.1:8000${relativePath}`;
}

const { status, data: news } = useFetch('http://127.0.0.1:8000/api/news', {lazy: true,
    params:{include:'pictures'}
})

const carouselConfig = {
  itemsToShow: 3,
  wrapAround: true
}

console.log(news)


</script>

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
    width: 372px;
    height: 258px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;  
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

