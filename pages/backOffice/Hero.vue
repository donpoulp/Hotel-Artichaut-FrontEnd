<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import Welcome from "~/components/site/Welcome.vue";
import {useHeroStore} from "~/store/hero.js";

definePageMeta({
layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const heroStore = useHeroStore();

const schema = z.object({
  title: z.string(),
  description: z.string(),
  picture: z.string(),
})

const state = reactive({
  title: undefined,
  description: undefined,
  picture: undefined,
})

async function onSubmit(hero) {
  await heroStore.updateHeroData(hero);
  console.log(hero)
  //reloadNuxtApp()
}
</script>


<template>

    <div class="flex flex-col px-20 pt-10">
      <h1 v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'" class="text-3xl font-noto"></h1>
      <div class="py-2">
        <Welcome :title="heroStore.data[0][`title${selectLangue?.ref}`]" :description="heroStore.data[0].descriptionEn" :picture="heroStore.data[0].picture" class="" />
      </div>

      <div class="pb-20 pt-10">
        <h2 v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'" class="text-2xl font-noto"></h2>
        <UForm :schema="schema" :state="state" class="flex flex-row items-center w-fit border-2">

          <div class="flex flex-row p-8">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" class="custom-label">
              <UInput v-model="heroStore.data[0][`title${selectLangue?.ref}`]" />
            </UFormGroup>
          </div>

          <div class="flex flex-row border-r-2 border-l-2 p-8">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'">
              <UTextarea v-model="heroStore.data[0][`description${selectLangue?.ref}`]" class="w-[580px]"/>
            </UFormGroup>

          </div>

          <div class="flex flex-row border-r-2 p-8 py-[3.2rem]">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Picture' : 'Photo'" class="custom-label">
              <UInput v-model="state.picture" class="custom-input" type="file"/>
            </UFormGroup>
          </div>

          <div class="h-full flex flex-col p-4">
            <UButton @click="onSubmit(heroStore.data[0])" type="submit" v-text="selectLangue?.ref === 'En' ? 'Update' : 'Mettre à jour'"></UButton>
          </div>
        </UForm>
      </div>
    </div>



</template>

<style scoped>

</style>
