<script setup lang="ts">
  import {useServicesStore} from "~/store/services";

  const servicesStore = useServicesStore()
  //console.log(servicesStore.data[0].picture[0].picturePath)

  //<img class="w-[50%] z-0" src="{{ service.picture[0].picturePath }}"/>
</script>

<template>
  <div class="bg-black h-[2px] w-full"></div>
  <section class="bg-[#0D5649]">
    <h3 class="services_title pt-2 mb-6">Additional Services</h3>

    <div v-for="service in servicesStore.data">
      <div v-if="service.id % 2 == 0" class="flex flex-row items-center">
        <img class="w-[50%] z-0" :src="service.picture[0].picturePath"/>
        <div class="post-it h-[450px] w-[70%] flex flex-col items-center justify-center">
          <div class="text-[64px] font-antic pl-[25%] pb-10">{{ service.name }}</div>
          <div class="text-[28px] font-noto text-center p-2">{{ service.description }}</div>
        </div>
      </div>
      <div v-else class="flex flex-row items-center">
        <div class="post-it-reverse h-[450px] w-[70%] flex flex-col items-center justify-center">
          <div class="text-[64px] font-antic pr-[25%] pb-10">{{ service.name }}</div>
          <div class="text-[28px] font-noto text-center p-2">{{ service.description }}</div>
        </div>
        <img class="w-[50%] z-0" :src="service.picture[0].picturePath"/>
      </div>
    </div>

  </section>
  <div class="bg-black h-[2px] w-full"></div>
</template>

<style scoped>
.services_title{
  text-align: center;
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 80px;
}
.post-it{
  z-index: 9999;
  margin-left: -20%;
  background: linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  opacity: 80%;
}
.post-it-reverse{
  z-index: 9999;
  margin-right: -20%;
  background: linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  opacity: 80%;
}
</style>