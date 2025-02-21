<script setup lang="ts">
import { z } from 'zod'
import { reactive } from 'vue'
import {useStrongestStore} from "~/store/strongest";
import {useStrongestSectionStore} from "~/store/strongest-section";

definePageMeta({
  layout: 'back-office',
})

// strongest //////////////////////////////////////////////
const strongestStore = useStrongestStore();

const isOpen = ref(false)
const isOpen2 = ref(false)

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

async function onSubmit(strongest) {
  await strongestStore.updateStrongestData(strongest);
  reloadNuxtApp()
}

// strongest-section ///////////////////////////////////////
const strongestSectionStore = useStrongestSectionStore();

const schema_section = z.object({
  icon: z.string(),
  text: z.string(),
})

const state_section = reactive({
  icon: undefined,
  text: undefined,
})

async function onSubmit_section(section) {
  if (section.text.length > 143) {
    alert("trop de caractere")
  }else {
    await strongestSectionStore.updateStrongestSectionData(section);
    reloadNuxtApp()
  }
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
          <div v-for="strongest_section in strongestSectionStore.data" class="back-office-strongest-section w-[350px] flex flex-wrap">
            <UIcon :name="strongest_section.icon" class="h-20 w-20"></UIcon>
            <p class="w-[350px]">{{ strongest_section.text }}</p>
          </div>
          <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-2" @click="isOpen2 = true"/>
        </div>
        <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-1" @click="isOpen = true"/>
      </div>
    </div>


    <h2 class="mt-4">Modify</h2>
      <div class="back-office-strongest-modify flex flex-col w-[59%]">
        <div v-for="strongest_section in strongestSectionStore.data">
          <UForm :schema="schema_section" :state="state_section" class="flex flex-row items-center w-full border-2">
          <div class="flex text-center items-center whitespace-nowrap p-8 border-r-2">
            Section : {{strongest_section.id}}
          </div>
          <div class="flex flex-row">
            <div class="p-2 flex text-center items-center">Contenu :</div>
            <UTextarea :rows="2" :maxrows="2" v-model="strongest_section.text" type="text" class="w-[350px] h-full textearea-strongest p-2"/>
          </div>
          <div class="h-full flex flex-col w-[300px] p-4">
           <div class="flex flex-row flex-nowrap w-full"><div class="p-1 w-20">Icons : </div><UInput v-model="strongest_section.icon" class="w-80" /></div>
            <UButton block @click="onSubmit_section(strongest_section)" class="text-center mt-2 w-full buttonSubmit">Valider</UButton>
          </div>
          </UForm>
        </div>
    </div>

    <UModal v-model="isOpen">
      <div class="p-4">
        <UForm :schema="schema" :state="state">
          <UInput v-model="strongestStore.data.background_color_1"/>
          <UInput v-model="strongestStore.data.background_opacity_1"/>
          <UButton @click="onSubmit({background_color_1: strongestStore.data.background_color_1, background_opacity_1: strongestStore.data.background_opacity_1, background_color_2: strongestStore.data.background_color_2, background_opacity_2: strongestStore.data.background_opacity_2})">
            Valider
          </UButton>
        </UForm>
      </div>
    </UModal>

    <UModal v-model="isOpen2">
      <div class="p-4">
        <UForm :schema="schema" :state="state">
          <UFormGroup label="color">
            <UInput v-model="strongestStore.data.background_color_2"/>
          </UFormGroup>
          <UFormGroup label="opacity" class="mt-3">
            <UInput v-model="strongestStore.data.background_opacity_2"/>
          </UFormGroup>
          <div class="flex justify-center">
            <UButton class="mt-3 buttonSubmit" @click="onSubmit({background_color_1: strongestStore.data.background_color_1, background_opacity_1: strongestStore.data.background_opacity_1, background_color_2: strongestStore.data.background_color_2, background_opacity_2: strongestStore.data.background_opacity_2})">
              Valider
            </UButton>
          </div>
        </UForm>
      </div>
    </UModal>

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
.back-office-strongest-modify{
  border: #45474B 1px solid;
}
.textearea-strongest :deep(textarea){
  height: 100px;
  background-color: gray;
}
.buttonSubmit{
  background: rgba(13, 86, 73, 0.9);
}
.buttonSubmit .text{
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.modify-color-2{
  position: absolute;
  right: 125px;
  top: 355px;
  z-index: 99999;
}
.modify-color-1{
  position: absolute;
  right: 50px;
  top: 400px;
  z-index: 999;
}
</style>