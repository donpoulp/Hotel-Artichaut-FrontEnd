<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true
}

const { status, data: bedroomsTypes } = useFetch('http://127.0.0.1:8000/api/bedroomType', {lazy: true})

</script>

<template>
    <section class="sectionBedroomType">

      <h2 class="titleBedroomType">Rooms and Suites</h2>

      <div v-if="status === 'pending'">
        Loading ...
      </div>
      <div v-else>
        <Carousel v-bind="carouselConfig">
          <Slide v-for="bedroomType in bedroomsTypes" :key="bedroomType" class="bedroomTypeCartSection">

            <h2 class="littletitleBedroomType">{{ bedroomType.name }}</h2>
            <div class="bedroomTypeCart">
                <div class="bedroomTypeImg">
                  <div>
                    <img class="bedroomTypeImg1" src="/public/image%2026.png">
                    <div class="whiteline1"></div>
                    <img class="bedroomTypeImg2" src="/public/image%2025.png">
                  </div>
                  <div class="whiteline2"></div>
                  <div>
                    <img class="bedroomTypeImg3" src="/public/image%2024.png">
                  </div>
                </div>
              <div class="bedroomTypeContent">
                <div class="textBedroomType">{{ bedroomType.description }}</div>
                <Button class="Button" title="Reserver" route='bedroomType-id' :route_params="{ id: bedroomType.id }" width="250px" height="80px" fontSize="35px"/>
              </div>
            </div>
          </Slide>
          <template #addons class="addonsCarrousel">
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>

    </section>
</template>

<style scoped>
\\ regle tailwind desactiver \\
img, video {
  max-width: none!important;
  height: auto!important;
}

.sectionBedroomType{
  background-color: #F0F0E8;
}
.titleBedroomType{
  font-family: "Antic Didone",serif;
  font-weight: lighter;
  text-align: center;
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-top: 2%;
  margin-bottom: 3%;
  font-size: 64px;
}
.littletitleBedroomType{
  font-family: "Noto Serif",serif;
  color: #072527;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 1%;
}

.bedroomTypeCartSection{
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
}

.bedroomTypeCart{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 75vw;
}
.bedroomTypeImg{
  display: flex;
  flex-direction: row;
  margin-right: 2%;
}
.bedroomTypeContent{
  display: flex;
  flex-direction: column;
  align-items: self-start;
}
.textBedroomType{
  font-family: "Noto Serif",serif;
  font-size: 30px;
  text-align: start;
  color: #072527;
}

.bedroomTypeImg1{
  max-width: 350px;
  height: 221px;
}
.bedroomTypeImg2{
  max-width: 350px;
  height: 196px;
}
.bedroomTypeImg3{
  max-width: 281px;
  height: 417px;
}
.whiteline1{
  height: 1px;
  width: 350px;
}
.whiteline2{
  height: 417px;
  width: 1px;
}

.carousel__pagination{
  display:none;
}
.carousel__next, .carousel__prev, .carousel__icon{
  width: 0!important;
  height: 0!important;
}
.carousel__next, .carousel__prev, .carousel__icon{
  width: 500px!important;
  height: 500px!important;
}
.Button{
  margin-left: 13%;
  margin-top: 12%;
}
</style>