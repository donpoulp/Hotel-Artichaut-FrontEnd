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

async function onSubmit() {
  await footerStore.updateFooterData({
    title: state.title,
    text: state.text,
    titleReseau: state.titleReseau,
    iconReseau: state.iconReseau,
    linkReseau: state.linkReseau,
  });
}
</script>

<template>

    <div class="flex flex-col px-20 pt-10">
      <h1 class="text-3xl font-noto pb-4">Preview</h1>
      <div class="py-2">
        <Footer :title="footerStore.data[0].titleEn" :text="footerStore.data[0].textEn" :titleReseau="footerStore.data[0].titleReseauEn" :iconReseau="footerStore.data[0].iconReseau" :linkReseau="footerStore.data[0].linkReseau" />
      </div>
    </div>

    <div class="pb-20 pt-10">
      <h2 class="text-2xl font-noto px-20 pb-4">Modify</h2>

      <UForm :schema="schema" :state="state" class="space-y-4 px-20" @submit.prevent="onSubmit">

        <div class="flex flex-row space-x-4">
          <UFormGroup label="Title" class="custom-label">
            <UInput v-model="footerStore.data[0].titleEn" class="custom-input"/>
          </UFormGroup>

          <UFormGroup label="Text" class="custom-label">
            <UInput v-model="footerStore.data[0].textEn" class="custom-input"/>
          </UFormGroup>
        </div>

        <UFormGroup label="Social Title">
          <UInput v-model="footerStore.data[0].titleReseau" class="custom-input"/>
        </UFormGroup>

        <UFormGroup label="Social Icon">
          <UInput v-model="footerStore.data[0].iconReseau" class="custom-input"/>
        </UFormGroup>

        <UFormGroup label="Social Link">
          <UInput v-model="footerStore.data[0].linkReseau" class="custom-input"/>
        </UFormGroup>

        <UButton type="submit">
          Update
        </UButton>

      </UForm>
    </div>

</template>

<style scoped>
</style>