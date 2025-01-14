<script setup lang="ts">
import Welcome from "~/component/Welcome.vue";
import Strongest from "~/component/Strongest.vue";
import Restaurant from "~/component/Restaurant.vue";
import Hostel from "~/component/Hostel.vue";
import Spa from "~/component/Spa.vue";
import Rooms from "~/component/Rooms.vue";
</script>

<template>
    <Welcome/>

  <div class="flex flex-col bg-[#D8D27D] py-20">

    <Strongest/>

    <div class="flex flex-row py-20">
      <Hostel/>
      <Restaurant/>
      <Spa/>
    </div>

  </div>

  <Rooms/>

</template>

<style scoped>
</style>