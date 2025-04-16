<script setup lang="ts">
import BedroomType from "~/components/site/BedroomType.vue";
import {z} from "zod";
import {reactive} from "vue";
import {useBedroomTypeStore} from "~/store/bedroom-type";

definePageMeta({
  layout: 'back-office',
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
  if (bedroomType?.[`name${selectLangue.value.ref}`]?.length > 22 || bedroomType?.[`description${selectLangue.value.ref}`]?.length > 200) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: bedroomType.id,
      titleFr: bedroomType.nameFr,
      titleEn: bedroomType.nameEn,
      descriptionFr: bedroomType.descriptionFr,
      descriptionEn: bedroomType.descriptionEn,
      picture1: state.picture1,
      picture2: state.picture2,
      picture3: state.picture3,
    };
    console.log(bedroomType)
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

    <div class="flex flex-col pt-10">
      <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h1>
      <div class="flex flex-col w-[fit-content] mb-6">
        <div v-for="bedroomType in bedroomTypeStore.data">
          <UForm :schema="schema" :state="state" class="flex flex-row items-center border-2">
            <div class="flex text-center items-center whitespace-nowrap py-[8.25rem] px-8 border-r-2">
              Section : {{bedroomType.id}}
            </div>
            <div class="flex flex-row justify-center items-center p-8">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                <UInput v-model="bedroomType[`name${selectLangue?.ref}`]"></UInput>
              </UFormGroup>
            </div>
            <div class="flex flex-col p-8 py-[4.1rem] border-r-2 border-l-2">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                <UTextarea rows="5" maxrows="5" v-model="bedroomType[`description${selectLangue?.ref}`]" class="w-[310px] textarea_backoffice_news"></UTextarea>
                <span class="float-right text-[15px]">{{bedroomType[`description${selectLangue?.ref}`].length}}/200 caractère</span>
              </UFormGroup>
            </div>
            <div>
              <div class="p-6">
                <div v-for="(picture, index) in bedroomType.picture" :key="index">
                  <UFormGroup :label="'image ' + picture.id" class="mb-2">
                    <UInput type="file" size="md" icon="i-heroicons-folder" @change="handleFileUpload($event, index)"/>
                  </UFormGroup>
                </div>
              </div>
            </div>
            <div class="py-[7.75rem] px-6 border-l-2 border-r-2">
              <UButton block @click="onSubmit(bedroomType)" class="text-center h-10 w-full buttonSubmit">Valider</UButton>
            </div>
            <div class="h-full flex flex-col py-[2.1rem] px-8">
              <NuxtLink :to="{ name:'site-bedroomType-id', params: { id: bedroomType.id} }">
                <UButton block class="text-center w-full" color="blue">
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