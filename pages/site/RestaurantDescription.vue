<script setup lang="ts">
</script>


<template>

  <div class="flex flex-col items-center justify-center py-20 px-20" style="background-color: #F0F0E8;">
    <h1 class="font-antic">Restaurant & Bar</h1>
    <h2 class="font-noto text-black text-center">The Hôtel Artichaut, an essential stopover for gastronomy, offers you
      its exceptional restaurant: L'Artic Show,
      which has been awarded a star in the Michelin Guide.</h2>
  </div>

  <div class="div flex flex-row items-center" style="background-color: #F0F0E8;">
    <img class="test" src="/img/restaubar.png" alt="Restaurant"/>

    <div class="flex flex-col items-center">
      <h2 class="text-black font-noto">L'Artic Show</h2>
      <p class="text-black font-noto text-center">
        The Hôtel Artichaut, an essential stopover for gastronomy, offers you its exceptional restaurant: L'Artic Show,
        which has been awarded a star in the Michelin Guide.
      </p>
    </div>
  </div>
</template>


<style scoped>

.test {
  padding-left: 200px;
}

.div {
  padding-bottom: 100px;
}

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
  padding-bottom: 50px;
}

p {
  font-size: 20px;
  padding-left: 350px;
  padding-right: 350px;
}

</style>