<script setup lang="ts">
import Welcome from "~/components/Welcome.vue";
import Strongest from "~/components/Strongest.vue";
import Restaurant from "~/components/Restaurant.vue";
import Hostel from "~/components/Hostel.vue";
import Spa from "~/components/Spa.vue";
</script>

<template>
    <Welcome/>

  <div class="flex flex-col bg-[#D8D27D] py-20 px-10">

    <Strongest/>

    <div class="flex flex-row py-20 px-32">
      <Hostel/>
      <Restaurant/>
      <Spa/>
    </div>

  </div>

</template>

<style scoped>


</style>