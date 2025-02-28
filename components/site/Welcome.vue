<script setup lang="ts">
import {useHeroStore} from "~/store/hero";

const heroStore = useHeroStore();
//console.log(heroStore.data[0]?.picture?.[0]?.picturePath)
</script>

<template>

<!-- remplacer par image bdd-->
  <div class="flex flex-col items-center justify-center h-screen bg-center font-noto relative" :style="{backgroundImage: `url(${heroStore.data[0]?.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">
    <div class="bg-black bg-opacity-50 h h-screen flex items-center">
      <div class="flex flex-col space-y-10">
        <h1 class="text-center text-white">{{heroStore.data[0].title}}</h1>
        <p class="text-center px-12 text-white">{{heroStore.data[0].description}}</p>
      </div>
    </div>

  </div>

</template>

<style scoped>

h1 {
  font-size: 80px;
}

p {
  font-size: 31px;
}

</style>