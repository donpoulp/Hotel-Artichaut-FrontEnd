<script setup lang="ts">
import Welcome from "~/components/site/Welcome.vue";
import Strongest from "~/components/site/Strongest.vue";
import Restaurant from "~/components/site/Restaurant.vue";
import Hostel from "~/components/site/Hostel.vue";
import Spa from "~/components/site/Spa.vue";
import BedroomType from "~/components/site/BedroomType.vue";
import News from "~/components/site/News.vue";
</script>

<template>
    <Welcome/>
    <Strongest class="z-50"/>
    <div class="flex flex-row py-20 justify-between px-60 bg-[#D8D27D]">
      <Hostel/>
      <Restaurant/>
      <Spa/>
    </div>

  <BedroomType></BedroomType>
  <News></News>
</template>

<style scoped>
</style>