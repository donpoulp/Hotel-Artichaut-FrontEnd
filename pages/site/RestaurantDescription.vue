<script setup lang="ts">
import {useAboutDescriptionStore} from "~/store/about_description";

const aboutDescStore = useAboutDescriptionStore();
let restaurant
let articShow

  aboutDescStore?.data?.forEach((item) => {
    if (item.title === 'Restaurant & Bar') {
      restaurant = item
    }if (item.title === "L\'Artic Show"){
      articShow = item
    }
  })

</script>


<template>
  <div class="flex flex-col items-center justify-center py-20 px-20" :style="{backgroundColor: restaurant?.background_color, opacity: restaurant?.background_opacity}">
    <h1 class="font-antic">{{ restaurant?.title }}</h1>
    <h2 class="font-noto text-black text-center">{{ restaurant?.description }}</h2>
  </div>

  <div class="div flex flex-row items-center" :style="{backgroundColor: articShow?.background_color, opacity: articShow?.background_opacity}">
    <img class="test" :src="articShow.picture?.[0]?.picturePath" alt="Restaurant"/>

    <div class="flex flex-col items-center">
      <h2 class="text-black font-noto">{{ articShow?.title }}</h2>
      <p class="text-black font-noto text-center">
        {{ articShow?.description }}
      </p>
    </div>
  </div>
</template>


<style scoped>

.test {
  padding-left: 200px;
}

.div {
  padding-bottom: 100px;
}

h1 {
  font-size: 80px;
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 50px;
}

h2 {
  font-size: 30px;
  padding-left: 300px;
  padding-right: 300px;
  padding-bottom: 50px;
}

p {
  font-size: 20px;
  padding-left: 350px;
  padding-right: 350px;
}

</style>