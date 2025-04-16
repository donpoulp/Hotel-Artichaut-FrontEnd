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
  <div class=" h-full flex flex-col justify-around py-20 background_about md:flex-row ">
    <Hostel/>
    <Restaurant/>
    <Spa/>
  </div>
</template>

<style scoped>
.background_about{
  background-color: v-bind(bgColor);
  opacity: v-bind(bgOpacity);
}
</style>