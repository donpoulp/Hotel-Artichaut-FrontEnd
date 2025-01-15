<script setup lang="ts">
import Welcome from "~/component/Welcome.vue";
import Strongest from "~/component/Strongest.vue";
import Restaurant from "~/component/Restaurant.vue";
import Hostel from "~/component/Hostel.vue";
import Spa from "~/component/Spa.vue";
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