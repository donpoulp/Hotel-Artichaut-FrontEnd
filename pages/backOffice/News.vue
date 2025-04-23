<script setup lang="ts">
import News from "~/components/site/News.vue";
import {useNewsStore} from "~/store/news";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
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
      <h2 class="text-3xl font-noto mt-10 mb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>

      <div v-for="news in newsStore.data" :key="news.id" class="w-full mb-10">
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm w-full">
          <UForm class="space-y-6">

            <!-- ID -->
            <div class="text-lg font-semibold text-gray-700">
              Section : {{ news.id }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

              <!-- Titre & Description -->
              <div class="md:col-span-2 space-y-4">
                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                  <UInput v-model="news[`title${selectLangue?.ref}`]" />
                </UFormGroup>

                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                  <UTextarea
                      rows="6"
                      maxrows="6"
                      v-model="news[`description${selectLangue?.ref}`]"
                      class="w-full"
                  />
                  <span class="text-sm text-gray-500 block text-right mt-1">
                {{ news[`description${selectLangue?.ref}`].length }}/350 {{ selectLangue?.ref === 'En' ? 'characters' : 'caractères' }}
              </span>
                </UFormGroup>
              </div>

              <!-- Images -->
              <div class="space-y-4">
                <div v-for="(picture, index) in news.picture" :key="index">
                  <UFormGroup :label="'Image ' + picture.id" class="mb-2">
                    <UInput
                        type="file"
                        size="md"
                        icon="i-heroicons-folder"
                        @change="handleFileUpload($event, index)"
                    />
                  </UFormGroup>
                </div>
              </div>
            </div>

            <!-- Couleur & Opacité -->
            <div class="border-t border-gray-200 pt-6 mt-6">
              <h4 class="font-medium text-gray-700 mb-4">
                {{ selectLangue?.ref === 'En' ? 'Background Settings' : 'Paramètres de fond' }}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background color 1' : 'Couleur de fond 1'" required>
                  <UInput v-model="news.background_color" placeholder="#FFFFFF" />
                </UFormGroup>

                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity 1' : 'Opacité 1'" required>
                  <UInput v-model="news.background_opacity" placeholder="1 ou 0.5..." />
                </UFormGroup>
              </div>
            </div>

            <!-- Bouton -->
            <div class="flex justify-end pt-4">
              <UButton @click="onSubmit(news)" class="buttonSubmit w-full md:w-auto">
                {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
              </UButton>
            </div>

          </UForm>
        </div>
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