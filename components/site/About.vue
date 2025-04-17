<script setup lang="ts">
import Spa from "~/components/site/Spa.vue";
import Hostel from "~/components/site/Hostel.vue";
import Restaurant from "~/components/site/Restaurant.vue";
import {useAboutStore} from "~/store/about";

const aboutStore = useAboutStore()

const bgColor = aboutStore.data[0].background_color
const bgOpacity = aboutStore.data[0].background_opacity

</script>

<template>
  <div class="flex flex-row py-20 justify-between px-60" :style="{ backgroundColor: bgColor, opacity: bgOpacity / 100 }">
  <div class=" h-full flex flex-col justify-around py-20 background_about md:flex-row ">
    <Hostel/>
    <Restaurant/>
    <Spa/>
  </div>
</template>

<style scoped>

</style>