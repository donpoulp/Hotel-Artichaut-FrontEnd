<script setup lang="ts">
import Spa from "~/components/site/Spa.vue";
import Hostel from "~/components/site/Hostel.vue";
import Restaurant from "~/components/site/Restaurant.vue";
import {useAboutStore} from "~/store/about";
import {useAboutSectionStore} from "~/store/about_section";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
})
/// About
const aboutStore = useAboutStore()

const schema = z.object({
  background_color: z.string(),
  background_opacity: z.string(),
})

const state = reactive({
  background_color: undefined,
  background_opacity: undefined,
})

const isOpen = ref(false);

async function onSubmit(about) {
  await aboutStore.updateAboutData(about);
  //reloadNuxtApp()
}

const bgColor = computed(()=>{
  return aboutStore.data?.[0]?.background_color
})
const bgOpacity = computed(()=>{
  return aboutStore.data?.[0]?.background_opacity
})

console.log(aboutStore.data)

/// About_section
const aboutSectionStore = useAboutSectionStore()

const schema_section = z.object({
  background_color: z.string(),
  background_opacity: z.string(),
})

const state_section = reactive({
  background_color: undefined,
  background_opacity: undefined,
})

async function onSubmit_section(about_section) {
  await strongestSectionStore.updateAbooutSectionData(about_section);
  reloadNuxtApp()
}
</script>

<template>
  <div class="flex flex-col pt-10 px-10">
    <h1 class="text-3xl font-noto pb-4">Preview</h1>
    <div class="background_about py-20 px-[6rem]">
      <div class="flex flex-row justify-between">
        <Hostel/>
        <Restaurant/>
        <Spa/>
      </div>
      <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-1" @click="isOpen = true"/>
    </div>

    <div class="flex flex-col pt-10">
      <h1 class="text-3xl font-noto pb-4">Modify</h1>
      <div class="flex flex-col w-[fit-content] mb-6">
        <div v-for="about_section in aboutSectionStore.data">
          <UForm :schema="schema_section" :state="state_section" class="flex flex-row items-center border-2">
            <div class="flex text-center items-center whitespace-nowrap py-[2.1rem] px-8 border-r-2">
              Title : <UInput v-model="about_section.title" class="ml-2"></UInput>
            </div>
            <div class="p-8 border-r-2">
              <UInput type="file" size="md" icon="i-heroicons-folder"/>
            </div>
            <div class="h-full flex flex-col w-[200px] py-[2.1rem] px-8 border-r-2">
              <UButton block @click="onSubmit_section(about_section)" class="text-center w-full">Valider</UButton>
            </div>
            <div class="h-full flex flex-col w-[200px] py-[2.1rem] px-8">
              <NuxtLink :to="{ name:'backOffice-aboutSection-id', params: { id: about_section.id} }"><UButton block class="text-center w-full">Go to</UButton></NuxtLink>
            </div>
          </UForm>
          </div>
      </div>
    </div>
  </div>

  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema" :state="state">
        <UFormGroup label="color">
          <UInput v-model="aboutStore.data[0].background_color"/>
        </UFormGroup>
        <UFormGroup label="opacity" class="mt-3">
          <UInput v-model="aboutStore.data[0].background_opacity"/>
        </UFormGroup>
        <div class="flex justify-center mt-4">
          <UButton @click="onSubmit({background_color: aboutStore.data[0].background_color, background_opacity: aboutStore.data[0].background_opacity})">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>

<style scoped>
.background_about{
  background-color: v-bind(bgColor);
  opacity: v-bind(bgOpacity);
}
.modify-color-1{
  position: absolute;
  right: 60px;
  bottom: 0;
}
</style>