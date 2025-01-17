<script setup lang="ts">
import LeftSideBar from "~/components/backOffice/LeftSideBar.vue";
import TopBar from "~/components/backOffice/TopBar.vue";
</script>

<template>
  <div class="div">
    <LeftSideBar></LeftSideBar>
    <div class="main">
      <TopBar></TopBar>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.div{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.main{
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>