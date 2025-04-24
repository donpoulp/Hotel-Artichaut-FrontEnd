<script setup lang="ts">
import BedroomType from "~/components/site/BedroomType.vue";
import {z} from "zod";
import {reactive} from "vue";
import {useBedroomTypeStore} from "~/store/bedroom-type";

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
})

const selectLangue = useState('selectedLangue');

const bedroomTypeStore = useBedroomTypeStore()

const schema = z.object({
  background_color: z.string(),
  background_opacity: z.string(),
  picture1: z.string(),
  picture2: z.string(),
  picture3: z.object({
    base64: z.string(),
    name: z.string(),
  }),
})

const state = reactive({
  background_color: undefined,
  background_opacity: undefined,
  picture1: undefined,
  picture2: undefined,
  picture3: undefined,
})

async function onSubmit(bedroomType) {
  if (bedroomType?.[`name${selectLangue.value.ref}`]?.length > 50 || bedroomType?.[`description${selectLangue.value.ref}`]?.length > 200) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: bedroomType.id,
      nameFr: bedroomType.nameFr,
      nameEn: bedroomType.nameEn,
      descriptionFr: bedroomType.descriptionFr,
      descriptionEn: bedroomType.descriptionEn,
      picture1: state.picture1,
      picture2: state.picture2,
      picture3: state.picture3,
    };
    await bedroomTypeStore.updateBedroomTypeData(formData);
    await bedroomTypeStore.loadBedroomTypeData()
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
      }else if (params == 2){
        state.picture3 = {'base64': base64Image, 'name': file.name};
        console.log(state.picture3)
      }
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="flex flex-col pt-10 px-10">
    <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h1>
    <div class="w-[80vw]">
        <BedroomType/>
    </div>

    <div class="pt-10 mb-10">
      <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h1>
      <div class="space-y-6">
        <div v-for="bedroomType in bedroomTypeStore.data" :key="bedroomType.id" class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
          <UForm :schema="schema" :state="state" class="space-y-6">
            <div class="text-lg font-semibold text-gray-700">
              Section : {{ bedroomType.id }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="md:col-span-2 space-y-4">
                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                  <UInput v-model="bedroomType[`name${selectLangue?.ref}`]" />
                </UFormGroup>

                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                  <UTextarea
                      rows="5"
                      maxrows="5"
                      v-model="bedroomType[`description${selectLangue?.ref}`]"
                      class="w-full"
                  />
                  <span class="text-sm text-gray-500 block text-right mt-1">
                {{ bedroomType[`description${selectLangue?.ref}`].length }}/200 {{ selectLangue?.ref === 'En' ? 'characters' : 'caractères' }}
              </span>
                </UFormGroup>
              </div>

              <div class="space-y-4">
                <UFormGroup
                    v-for="(picture, index) in bedroomType.picture"
                    :key="index"
                    :label="'Image ' + picture.id"
                >
                  <UInput
                      type="file"
                      size="md"
                      icon="i-heroicons-folder"
                      @change="handleFileUpload($event, index)"
                  />
                </UFormGroup>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6 mt-6">
              <h4 class="font-medium text-gray-700 mb-4">
                {{ selectLangue?.ref === 'En' ? 'Background Settings' : 'Paramètres de fond' }}
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background color' : 'Couleur de fond'" required>
                  <UInput v-model="bedroomType.background_color" placeholder="#FFFFFF" />
                </UFormGroup>

                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" required>
                  <UInput v-model="bedroomType.background_opacity" placeholder="1 ou 0.5..." />
                </UFormGroup>
              </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center pt-6">
              <UButton @click="onSubmit(bedroomType)" class="buttonSubmit w-full md:w-fit mb-4 md:mb-0">
                {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
              </UButton>

              <NuxtLink :to="{ name:'site-bedroomType-id', params: { id: bedroomType.id} }">
                <UButton class="text-center w-full md:w-fit" color="blue">
                  {{ selectLangue?.ref === 'En' ? 'Go to' : 'Aller à' }}
                  <UIcon name="hugeicons:arrow-right-01" />
                </UButton>
              </NuxtLink>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>