<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import {useFooterStore} from "~/store/footer.js";
import Footer from "~/components/site/Footer.vue";
import Welcome from "~/components/site/Welcome.vue";

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
})

const selectLangue = useState('selectedLangue');

const footerStore = useFooterStore();
console.log("dd", footerStore.data)

const schema = z.object({
  titleEn: z.string(),
  titleFr: z.string(),
  textEn: z.string(),
  textFr: z.string(),
  picture1: z.object({
    base64: z.string(),
    name: z.string(),
  }),
  picture2: z.object({
    base64: z.string(),
    name: z.string(),
  }),
  picture3: z.object({
    base64: z.string(),
    name: z.string(),
  })
})

const state = reactive({
  titleEn: undefined,
  titleFr: undefined,
  textEn: undefined,
  textFr: undefined,
  picture1: undefined,
  picture2: undefined,
  picture3: undefined,
})

async function onSubmit(footer) {
  await footerStore.updateFooterData(footer);
  reloadNuxtApp()
}

const handleFileUpload = (event, params) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      if (params === 0){
        state.picture1 = {'base64': base64Image, 'name': file.name};
        console.log(state.picture1)
      }else if (params === 1){
        state.picture2 = {'base64': base64Image, 'name': file.name};
        console.log(state.picture2)
      }else if (params === 2){
        state.picture3 = {'base64': base64Image, 'name': file.name};
        console.log(state.picture3)
      }
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="flex flex-col px-20 pt-10">
    <h1 class="text-3xl font-noto pb-4 text-gray-800" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h1>
    <div class="py-2">
      <Footer />
    </div>
  </div>

  <div class="pb-20 pt-10 px-20">
    <div class="flex flex-row justify-between items-center pb-2">
      <h2 class="text-2xl font-noto text-gray-800" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>
      <UButton @click="onSubmit(footerStore.data)" type="submit" class="text-xl font-noto">
        {{ selectLangue?.ref === 'En' ? 'Update' : 'Modifier' }}
      </UButton>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-6">
      <!-- Bloc Général -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          {{ selectLangue?.ref === 'En' ? 'General Information' : 'Informations Générales' }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
            <UInput v-model="footerStore.data[`title${selectLangue?.ref}`]" />
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
            <UInput v-model="footerStore.data[`text${selectLangue?.ref}`]" />
          </UFormGroup>
        </div>
      </div>

      <!-- Bloc Réseaux -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          {{ selectLangue?.ref === 'En' ? 'Social Networks' : 'Réseaux Sociaux' }}
        </h3>

        <div class="space-y-6">
          <div
              v-for="(icon, index) in footerStore.data.icon"
              :key="index"
              class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Name' : 'Nom'">
                <UInput v-model="icon.name" />
              </UFormGroup>

              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Link' : 'Lien'">
                <UInput v-model="icon.link" />
              </UFormGroup>
            </div>

            <UFormGroup label="Icon">
              <div class="flex items-end gap-1 mt-1 text-sm text-gray-500">
                <span class="inline-block text-[20px]" style="color: #3c3a3a; filter: drop-shadow(0 -1.5px 3px rgba(255,244,0,0.80)) drop-shadow(0 -3px 5px rgba(255,244,0,0.80)) drop-shadow(0 1px 2px rgba(255,244,0,0.80));">
                  <UIcon name="material-symbols:lightbulb-outline" />
                </span>
                <p>
                  {{ selectLangue?.ref === 'En' ? 'To change the icon, copy its name from ' : 'Pour changer l’icône, copiez son nom depuis ' }}
                  <a href="https://icones.js.org/" target="_blank" class="text-primary underline hover:opacity-80" style="color: #0D5649;">
                    icones.js.org
                  </a>
                </p>
              </div>
              <UInput v-model="icon.iconPath" />
            </UFormGroup>
          </div>
        </div>
      </div>

      <!-- Bloc Apparence -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          {{ selectLangue?.ref === 'En' ? 'Appearance' : 'Apparence' }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background Color' : 'Couleur de fond'" required>
            <UInput v-model="footerStore.data.background_color" placeholder="#ffffff" />
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity (%)' : 'Opacité (%)'" required>
            <UInput
                v-model="footerStore.data.background_opacity"
                type="number"
                min="0"
                max="100"
                placeholder="100"
            />
          </UFormGroup>
        </div>
      </div>
    </UForm>
  </div>
</template>

<style scoped>
</style>