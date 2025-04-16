<script setup lang="ts">
import {useAboutSectionStore} from "~/store/about_section";

const selectLangue = useState('selectedLangue');

const aboutSectionStore = useAboutSectionStore()
let restaurant

aboutSectionStore?.data?.forEach(aboutSection => {
  if (aboutSection.titleEn == 'Restaurant') {
    restaurant = aboutSection
  }
})


</script>

<template>
  <NuxtLink to="/site/RestaurantDescription">
    <div class="flex  items-end object-scale-down m-3" :style="{backgroundImage: `url(${restaurant?.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '500px', width: '250px'}">
      <div class="p-4 w-full bg-black bg-opacity-50">
        <h2 class="text-white text-3xl text-center font-antic">
          {{ restaurant?.[`title${selectLangue?.ref}`] }}
        </h2>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>

a{
  justify-items: center;
}
</style>