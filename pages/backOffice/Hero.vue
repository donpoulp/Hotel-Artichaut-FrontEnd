<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import Welcome from "~/components/site/Welcome.vue";

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

async function onSubmit(event) {
  await heroStore.updateHeroData( {
        title: state.title,
        description: state.description,
        picture: state.picture,
  });

  console.log(event.data)
}
</script>


<template>
  <div class="bg-white">

    <div class="flex flex-col px-20 pt-10">
      <h1 class="text-black text-3xl font-noto">Preview</h1>
      <div class="py-2">
        <Welcome :title="heroStore.data[0].title" :description="heroStore.data[0].description" :picture="heroStore.data[0].picture" />
        style="height: 588px; width: 1039px;"
      </div>
    </div>

    <div class="text-black pb-20 pt-10">
      <h2 class="text-2xl font-noto px-20 text-black">Modify</h2>

      {{heroStore.data[0]}}

      <UForm :schema="schema" :state="state" class="space-y-4 text-black px-20" @submit.prevent="onSubmit">

        <div class="flex flex-row space-x-4">

          <UFormGroup label="Title" class="custom-label">
            <UInput v-model="state.title" class="custom-input"/>
          </UFormGroup>

          <UFormGroup label="Picture" class="custom-label">
            <UInput v-model="state.picture" class="custom-input"/>
          </UFormGroup>

        </div>

        <UFormGroup label="Content">
          <UInput v-model="state.description" class="custom-input"/>
        </UFormGroup>

        <UButton type="submit">
          Update
        </UButton>

      </UForm>

    </div>

  </div>
</template>

<style scoped>
.custom-input {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.custom-label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
