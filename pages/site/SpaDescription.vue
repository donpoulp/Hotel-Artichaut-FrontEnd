<script setup lang="ts">
import {useAboutDescriptionStore} from "~/store/about_description";

const aboutDescStore = useAboutDescriptionStore();
let spa

  aboutDescStore?.data?.forEach((item) => {
    if (item.title === 'SPA & Well-being') {
      spa = item
    }
  })

</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-20" :style="{backgroundColor: spa?.background_color, opacity: spa?.background_opacity}">
    <h1 class="font-antic">{{ spa?.title }}</h1>
    <h2 class="font-noto text-black text-center">{{ spa?.description }}</h2>

    <div class="pb-32">
      <div class="flex flex-col relative">
        <img class="static w-screen" :src="spa?.picture?.[0]?.picturePath" alt="Spawell"/>
        <div class="absolute -bottom-32 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center space-x-20">
          <img class="h-3/6 w-3/6" :src="spa?.picture?.[1]?.picturePath" alt="spa"/>
          <img class="h-3/6 w-3/6" :src="spa?.picture?.[2]?.picturePath" alt="spa"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

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
  padding-bottom: 100px;
}

</style>