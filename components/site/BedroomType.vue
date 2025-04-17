<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {z} from "zod";
import {reactive} from "vue";
import {useBedroomTypeStore} from "~/store/bedroom-type.js";
defineProps(['display'])
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true
}
const bedroomTypeStore = useBedroomTypeStore()

const { status, data: bedroomsTypes } = useFetch('http://127.0.0.1:8000/api/bedroomType', {lazy: true})

const selectLangue = useState('selectedLangue');

const sectionBackgroundColor = ref('#F0F0E8');

function updateSectionBackgroundColor(newIndex) {
  const selectedBedroomType = bedroomsTypes.value[newIndex];
  sectionBackgroundColor.value = selectedBedroomType.background_color;
}

const isOpen = ref(false)

async function openModalBedroomTypeColor(id) {
  await bedroomTypeStore.loadBedroomTypeDataById(id)
  isOpen.value = true
}

const schema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  picture: z.string(),
})

const state = reactive({
  background_color: undefined,
  background_opacity: undefined,
})

async function onSubmit(about) {
  await bedroomTypeStore.updateBedroomTypeData(about);
  reloadNuxtApp()
}
</script>

<template>
    <section class="sectionBedroomType" :style="{ backgroundColor: sectionBackgroundColor }">

      <h2 v-text="selectLangue.ref === 'En' ? 'Rooms and Suites' : 'Chambres et suites'" class="titleBedroomType"></h2>

      <div v-if="status === 'pending'">
        Loading ...
      </div>
      <div v-else>
        <Carousel v-bind="carouselConfig" @update:modelValue="updateSectionBackgroundColor">
          <Slide v-for="bedroomType in bedroomsTypes" :key="bedroomType" class="bedroomTypeCartSection">

            <h2 class="littletitleBedroomType">{{ bedroomType[`name${selectLangue?.ref}`] }}</h2>
            <div class="bedroomTypeCart">
                <div class="bedroomTypeImg">
                  <div>
                    <img class="bedroomTypeImg1" :src="bedroomType.picture[0].picturePath">
                    <div class="whiteline1"></div>
                    <img class="bedroomTypeImg2" :src="bedroomType.picture[1].picturePath">
                  </div>
                  <div class="whiteline2"></div>
                  <div>
                    <img class="bedroomTypeImg3" :src="bedroomType.picture[2].picturePath">
                  </div>
                </div>
              <div class="bedroomTypeContent">
                <div class="textBedroomType">{{ bedroomType[`description${selectLangue?.ref}`] }}</div>
                <Button class="Button" :title="selectLangue?.ref === 'En' ? 'To book' : 'Réserver'" route='site-bedroomType-id' :route_params="{ id: bedroomType?.id }" width="250px" height="80px" fontSize="35px"/>
              </div>
            </div>
          </Slide>
          <template #addons class="addonsCarrousel">
            <Navigation />
          </template>
        </Carousel>
      </div>
    </section>
</template>

<style scoped>
/*regle tailwind desactiver*/
img, video {
  max-width: none!important;
  height: auto!important;
}

/*.sectionBedroomType{
  background-color: v-bind();
}*/

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
  width: 350px!important;
  height: 221px!important;
}
.bedroomTypeImg2{
  width: 350px!important;
  height: 196px!important;
}
.bedroomTypeImg3{
  width: 281px!important;
  height: 417px!important;
}
.whiteline1{
  height: 1px;
  width: 350px;
}
.whiteline2{
  height: 417px;
  width: 1px;
}
.Button{
  margin-left: 13%;
  margin-top: 12%;
}
.modify-color-1{
  position: absolute;
  right: 30px;
  bottom: 0;
}
</style>