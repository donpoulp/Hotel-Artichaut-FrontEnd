<script setup lang="ts">
import {useAboutSectionStore} from "~/store/about_section";

const aboutSectionStore = useAboutSectionStore()
let hostel

aboutSectionStore?.data?.forEach(aboutSection => {
  if (aboutSection.title == 'Hostel') {
    hostel = aboutSection
  }
})

</script>

<template>
  <NuxtLink to="/site/HostelDescription">
    <div class="flex justify-center items-end h-full" :style="{backgroundImage: `url(${hostel?.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '637px', width: '392px'}">
      <div class="p-4 w-full bg-black bg-opacity-50 px-4">
        <h2 class="text-white text-3xl text-center font-antic">{{ hostel?.title }}</h2>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>