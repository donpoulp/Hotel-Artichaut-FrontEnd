<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import {useFooterStore} from "~/store/footer.js";
import Footer from "~/components/site/Footer.vue";
import Welcome from "~/components/site/Welcome.vue";

definePageMeta({
  layout: 'back-office',
})

const footerStore = useFooterStore();

const schema = z.object({
  title: z.string(),
  text: z.string(),
  titleReseau: z.string(),
  iconReseau: z.string(),
  linkReseau: z.string(),
})

const state = reactive({
  title: undefined,
  text: undefined,
  titleReseau: undefined,
  iconReseau: undefined,
  linkReseau: undefined,
})

async function onSubmit(event) {
  await footerStore.updateFooterData({
    title: state.title,
    text: state.text,
    titleReseau: state.titleReseau,
    iconReseau: state.iconReseau,
    linkReseau: state.linkReseau,
  });
  // console.log(event.data)
}
</script>

<template>
  <div class="bg-white">

    <div class="flex flex-col px-20 pt-10">
      <h1 class="text-black text-3xl font-noto">Preview</h1>
      <div class="py-2">
        <Footer :title="footerStore.data[0].title" :text="footerStore.data[0].text" :titleReseau="footerStore.data[0].titleReseau" :iconReseau="footerStore.data[0].iconReseau" :linkReseau="footerStore.data[0].linkReseau" />
        style="height: 588px; width: 1039px;"
      </div>
    </div>

    <div class="text-black pb-20 pt-10">
      <h2 class="text-2xl font-noto px-20 text-black">Modify</h2>

      {{footerStore.data[0]}}

      <UForm :schema="schema" :state="state" class="space-y-4 text-black px-20" @submit.prevent="onSubmit">

        <div class="flex flex-row space-x-4">

          <UFormGroup label="Title" class="custom-label">
            <UInput v-model="state.title" class="custom-input"/>
          </UFormGroup>

          <UFormGroup label="Text" class="custom-label">
            <UInput v-model="state.text" class="custom-input"/>
          </UFormGroup>

        </div>

        <UFormGroup label="Social Title">
          <UInput v-model="state.titleReseau" class="custom-input"/>
        </UFormGroup>

        <UFormGroup label="Social Icon">
          <UInput v-model="state.iconReseau" class="custom-input"/>
        </UFormGroup>

        <UFormGroup label="Social Link">
          <UInput v-model="state.linkReseau" class="custom-input"/>
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