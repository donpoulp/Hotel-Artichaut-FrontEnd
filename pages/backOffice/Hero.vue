<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import Welcome from "~/components/site/Welcome.vue";
import {useHeroStore} from "~/store/hero.js";

definePageMeta({
layout: 'back-office',
})

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

async function onSubmit() {
  await heroStore.updateHeroData( {
        title: state.title,
        description: state.description,
        picture: state.picture,
  });
}
</script>


<template>

    <div class="flex flex-col px-20 pt-10">
      <h1 class="text-3xl font-noto">Preview</h1>
      <div class="py-2">
        <Welcome :title="heroStore.data[0].titleEn" :description="heroStore.data[0].descriptionEn" :picture="heroStore.data[0].picture" style="height: 588px; width: 1039px;" />
      </div>
    </div>

    <div class="pb-20 pt-10">
      <h2 class="text-2xl font-noto px-20">Modify</h2>

      <UForm :schema="schema" :state="state" class="space-y-4 px-20" @submit.prevent="onSubmit">

        <div class="flex flex-row space-x-4">
          <UFormGroup label="Title" class="custom-label">
            <UInput v-model="heroStore.data[0].titleEn" class="custom-input"/>
          </UFormGroup>

          <UFormGroup label="Picture" class="custom-label">
            <UInput v-model="state.picture" class="custom-input" type="file"/>
          </UFormGroup>
        </div>

        <UFormGroup label="Content">
          <UInput v-model="heroStore.data[0].descriptionEn" class="custom-input"/>
        </UFormGroup>

        <UButton type="submit">
          Update
        </UButton>

      </UForm>
    </div>

</template>

<style scoped>
</style>
