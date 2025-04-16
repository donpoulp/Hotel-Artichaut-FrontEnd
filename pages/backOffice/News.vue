<script setup lang="ts">
import News from "~/components/site/News.vue";
import {useNewsStore} from "~/store/news";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const newsStore = useNewsStore()

const isOpen = ref(false)

const schema = z.object({
  title: z.string(),
  description: z.string(),
  background_color: z.string(),
  background_opacity: z.string(),
  picture1: z.object({
    base64: z.string(),
    name: z.string(),
  }),
  picture2: z.object({
    base64: z.string(),
    name: z.string(),
  }),
})

const state = reactive({
  title: undefined,
  description: undefined,
  background_color: undefined,
  background_opacity: undefined,
  picture1: undefined,
  picture2: undefined,
})

async function onSubmit(news) {
  if (news?.[`title${selectLangue.value.ref}`]?.length > 22 || news?.[`description${selectLangue.value.ref}`]?.length > 350) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: news.id,
      titleFr: news.titleFr,
      titleEn: news.titleEn,
      descriptionFr: news.descriptionFr,
      descriptionEn: news.descriptionEn,
      background_color: news.background_color,
      background_opacity: news.background_opacity,
      picture1: state.picture1,
      picture2: state.picture2,
    };

    await newsStore.updateNewsData(formData);
    reloadNuxtApp()
  }
}

const handleFileUpload = (event, params) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      if (params == 0){
        state.picture1 = {'base64': base64Image, 'name': file.name};
        console.log(state.picture1)
      }else if (params == 1){
        state.picture2 = {'base64': base64Image, 'name': file.name};
        console.log(state.picture2)
      }
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <section class="p-8">
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-4" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h2>
      <News class="max-w-[1500px]"></News>
    </div>
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-10" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>

        <div v-for="news in newsStore.data" class="w-[fit-content]">
          <UForm class="flex flex-row items-center border-2">
            <div class="flex text-center items-center whitespace-nowrap py-[8.25rem] px-8 border-r-2">
              Section : {{news.id}}
            </div>
            <div class="flex flex-row justify-center items-center p-8">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                <UInput v-model="news[`title${selectLangue?.ref}`]"></UInput>
              </UFormGroup>
            </div>
            <div class="flex flex-col p-8 border-r-2 border-l-2">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                <UTextarea rows="8" maxrows="8" v-model="news[`description${selectLangue?.ref}`]" class="w-[310px] textarea_backoffice_news"></UTextarea>
                <span class="float-right text-[15px]">{{news[`description${selectLangue?.ref}`].length}}/350 caractère</span>
              </UFormGroup>
            </div>
            <div>
              <div class="p-6">
                <div v-for="(picture, index) in news.picture" :key="index">
                  <UFormGroup :label="'image ' + picture.id" class="mb-2">
                    <UInput type="file" size="md" icon="i-heroicons-folder" @change="handleFileUpload($event, index)"/>
                  </UFormGroup>
                </div>
              </div>
            </div>
            <div class="p-5 border-l-2 py-[5.1rem]">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Color' : 'Couleur'" required>
                <UInput v-model="news.background_color"/>
              </UFormGroup>
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" class="mt-3" required>
                <UInput v-model="news.background_opacity"/>
              </UFormGroup>
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

.modify-color-1{
  position: absolute;
  right: 70px;
  top: 640px;
}
</style>