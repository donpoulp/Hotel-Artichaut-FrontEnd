<script setup lang="ts">
import {useStrongestStore} from "~/store/strongest";
import {useStrongestSectionStore} from "~/store/strongest-section";

const strongestStore = useStrongestStore();
const strongestSectionStore = useStrongestSectionStore();

const selectLangue = useState('selectedLangue');
</script>


<template>
  <section class="back-office-strongest">
    <div class=" back-office-strongest-div1 justify-items-center ">
      <div class="flex flex-col justify-around py-20 lg:flex-row md:justify-around justify-items-center ">
        <div v-for="strongest_section in strongestSectionStore.data" class="back-office-strongest-section w-[350px] flex flex-col flex-wrap p-6">
          <UIcon :name="strongest_section.icon" class="h-20 w-20"></UIcon>
          <p class="w-[350px]">{{ strongest_section[`text${selectLangue?.ref}`] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>

.back-office-strongest-div1{
  padding: 3% 5%;
}

.back-office-strongest-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>