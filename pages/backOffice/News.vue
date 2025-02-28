<script setup lang="ts">
import News from "~/components/site/News.vue";
import {useNewsStore} from "~/store/news";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
})

const newsStore = useNewsStore()

const schema = z.object({
  title: z.string(),
  description: z.string(),
})

const state = reactive({
  title: undefined,
  description: undefined,
})

async function onSubmit(news) {
  if (news.title.length > 22 || news.description.length > 350) {
    alert("trop de caractere")
  }else {
    await newsStore.updateNewsData(news);
    reloadNuxtApp()
  }
}
</script>

<template>
  <section class="p-8">
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-4">Preview</h2>
      <News class="max-w-[1500px]"></News>
    </div>
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-10">Modify</h2>

        <div v-for="news in newsStore.data" class="w-[fit-content]">
          <UForm class="flex flex-row items-center border-2">
            <div class="flex text-center items-center whitespace-nowrap py-[8.25rem] px-8 border-r-2">
              Section : {{news.id}}
            </div>
            <div class="flex flex-row justify-center items-center p-8">
              <div class="mr-2">Title : </div>
              <UInput v-model="news.titleEn"></UInput>
            </div>
            <div class="flex flex-col p-8 border-r-2 border-l-2">
              <div class="mb-1">Description : </div>
              <UTextarea rows="8" maxrows="8" v-model="news.descriptionEn" class="w-[310px] textarea_backoffice_news"></UTextarea>
              <span class="text-right">{{news.descriptionEn.length}}/350 caractère</span>
            </div>
            <div>
              <div class="p-6">
                <div v-for="picture in news.picture">
                  <UFormGroup :label="'image' + picture.id" class="mb-2">
                    <UInput type="file" size="md" icon="i-heroicons-folder"/>
                  </UFormGroup>
                </div>
              </div>
            </div>
            <div class="py-[7.75rem] px-6 border-l-2">
              <UButton block @click="onSubmit(news)" class="text-center h-10 w-full buttonSubmit">Valider</UButton>
            </div>
          </UForm>
        </div>

    </div>
  </section>
</template>

<style scoped>
.buttonSubmit{
  background: rgba(13, 86, 73, 0.9);

}
</style>