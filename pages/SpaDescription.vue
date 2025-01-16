<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-20" style="background-color: #F0F0E8;">
    <h1 class="font-antic">SPA & Well-being</h1>
    <h2 class="font-noto text-black text-center">Nestled at the foot of the mountains, our 1,200 m² spa is a unique
      haven in the region. During your stay, you'll enjoy access to seven treatment rooms, indoor and outdoor pools, a
      hammam, sauna, hot tubs, a yoga studio, a fitness room, and a beauty salon.</h2>

    <div class="pb-32">
      <div class="flex flex-col relative">
        <!--      style="background-image: url(/img/spawell.png); height: 399px; width: 1440px-->
        <img class="static w-screen" src="/img/spawell.png" alt="Spawell"/>
        <div class="absolute -bottom-32 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center space-x-20">
          <img class="h-3/6 w-3/6" src="/img/spa1.png" alt="spa"/>
          <img class="h-3/6 w-3/6" src="/img/spa2.png" alt="spa"/>
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