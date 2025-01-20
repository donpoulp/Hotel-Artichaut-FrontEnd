<script setup lang="ts">
import { z } from 'zod'
import { reactive } from 'vue'
import {useStrongestStore} from "~/store/strongest";

definePageMeta({
  layout: 'back-office',
})

const strongestStore = useStrongestStore();

const {status: status1 ,data: strongest } = await useFetch('http://127.0.0.1:8000/api/strongest')

const { status: status2 ,data: strongest_section } = await useFetch('http://127.0.0.1:8000/api/strongest_section')

const color1 = strongest._rawValue[0].background_color_1
const opacity1 = strongest._rawValue[0].background_opacity_1
const color2 = strongest._rawValue[0].background_color_2
const opacity2 = strongest._rawValue[0].background_opacity_2

console.log(strongest)
console.log(strongest_section)

const schema = z.object({
  background_color_1: z.string(),
  background_opacity_1: z.string(),
  background_color_2: z.string(),
  background_opacity_2: z.string(),
})

const state = reactive({
  background_color_1: undefined,
  background_opacity_1: undefined,
  background_color_2: undefined,
  background_opacity_2: undefined,
})

async function onSubmit(event) {
  await strongestStore.updateStrongestData( {
    background_color_1: state.background_color_1,
    background_opacity_1: state.background_opacity_1,
    background_color_2: state.background_color_2,
    background_opacity_2: state.background_opacity_2,
  });
}
</script>

<template>
  <section class="back-office-strongest">
    <h2>Preview</h2>
    <div v-if="status1 === 'pending' && status2 === 'pending'">
      Loading ...
    </div>
    <div v-else>
      <div class="back-office-strongest-div1">
        <div class="back-office-strongest-div2">
          <div v-for="s in strongest_section" :key="s" class="back-office-strongest-section">
            <UIcon :name="s.icon" class="h-20 w-20"></UIcon>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <h2>Modify</h2>
    <div class="back-office-strongest-modify">
      {{strongestStore.data[0]}}
    </div>
  </section>
</template>

<style scoped>
.back-office-strongest{
  padding: 3%;
}
.back-office-strongest h2{
  font-size: 40px;
  font-weight: bold;
}
.back-office-strongest-div1{
  background-color: v-bind(color1);
  opacity: v-bind(opacity1+'%');
  padding: 3% 5%;
}
.back-office-strongest-div2{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: v-bind(color2);
  opacity: v-bind(opacity2+'%');
  padding: 1% 3%;
}
.back-office-strongest-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.back-office-strongest-modify{
  border: #45474B 1px solid;
}
</style>