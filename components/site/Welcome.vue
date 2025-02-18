<script setup lang="ts">
import {useHeroStore} from "~/store/hero";

const heroStore = useHeroStore();

// const props = defineProps({
//   title: String,
//   description: String,
//   picture: String,
// })

</script>

<template>

<!-- remplacer par image bdd-->
  <div class="flex flex-col items-center justify-center h-screen bg-center font-noto relative"
       style="background-image: url(/img/welcome.png); background-repeat: no-repeat; background-size: cover">

    <div class="bg-black bg-opacity-50 h h-screen flex items-center">
      <div class="flex flex-col space-y-10">
<!--        <h1 class="text-center">Welcome to Artichaut Hostel</h1>-->
        <!--        <p class="text-center px-12">The Artichaut Hotel is a luxury hotel,-->
        <!--          founded in 1426 located not far from the highest and most beautiful mountains of Haute-Savoie,-->
        <!--          located between lakes and mountains, the Hotel offers an exceptional living environment and a wide range of-->
        <!--          life-size activities.-->
        <!--        </p>-->
        <h1 class="text-center">{{heroStore.data[0].title}}</h1>
        <p class="text-center px-12">{{heroStore.data[0].description}}</p>
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