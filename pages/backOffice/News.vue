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
      <News class="w-[1500px]"></News>
    </div>
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-10">Modify</h2>

        <div v-for="news in newsStore.data" class="w-[80%]">
          <UForm class="flex flex-row items-center border-2">
            <div class="flex text-center items-center whitespace-nowrap p-8 border-r-2">
              Section : {{news.id}}
            </div>
            <div class="flex flex-row justify-center items-center p-8 border-r-2">
              <div class="mr-2">Title : </div>
              <UInput v-model="news.title"></UInput>
            </div>
            <div class="flex flex-col p-8 border-r-2">
              <div class="mb-1">Description : </div>
              <UTextarea v-model="news.description" class="w-[310px] textarea_backoffice_news"></UTextarea>
            </div>
            <div>
              <div class="w-full p-8">
                <UInput type="file" size="md" icon="i-heroicons-folder" />
                <UButton block @click="onSubmit(news)" class="text-center mt-2 h-10 w-full buttonSubmit">Valider</UButton>
              </div>
            </div>
          </UForm>
        </div>

    </div>
  </section>
</template>

<style scoped>
.textarea_backoffice_news :deep(textarea) {
  height: 150px;
  background-color: #45474B;
}
.buttonSubmit{
  background: rgba(13, 86, 73, 0.9);

}
</style>