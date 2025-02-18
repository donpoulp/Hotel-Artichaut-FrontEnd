<script setup lang="ts">
import {useStrongestStore} from "~/store/strongest";
import {useStrongestSectionStore} from "~/store/strongest-section";

const strongestStore = useStrongestStore();
const strongestSectionStore = useStrongestSectionStore();
</script>


<template>
  <section class="back-office-strongest">
    <div class="back-office-strongest-div1">
      <div class="back-office-strongest-div2">
        <div v-for="strongest_section in strongestSectionStore.data" class="back-office-strongest-section w-[350px] flex flex-wrap">
          <UIcon :name="strongest_section.icon" class="h-20 w-20"></UIcon>
          <p class="w-[350px]">{{ strongest_section.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.back-office-strongest-div1{
  background-color: v-bind(strongestStore.data.background_color_1);
  opacity: v-bind(strongestStore.data.background_opacity_1+'%');
  padding: 3% 5%;
}
.back-office-strongest-div2{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: v-bind(strongestStore.data.background_color_2);
  opacity: v-bind(strongestStore.data.background_opacity_2+'%');
  padding: 1% 3%;
}
.back-office-strongest-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>