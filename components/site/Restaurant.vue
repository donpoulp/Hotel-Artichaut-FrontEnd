<script setup lang="ts">
import {useAboutSectionStore} from "~/store/about_section";

const aboutSectionStore = useAboutSectionStore()
let restaurant

aboutSectionStore?.data?.forEach(aboutSection => {
  if (aboutSection.title == 'Restaurant') {
    restaurant = aboutSection
  }
})


</script>

<template>
  <NuxtLink to="/site/RestaurantDescription">
    <div class="flex justify-center items-end h-full " :style="{backgroundImage: `url(${restaurant?.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '637px', width: '392px'}">
      <div class="p-4 w-full bg-black bg-opacity-50">
        <h2 class="text-white text-3xl text-center font-antic">
          {{ restaurant?.title }}
        </h2>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>