<script setup lang="ts">
import {useAboutDescriptionStore} from "~/store/about_description";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const route = useRoute()

const aboutDescriptionStore = useAboutDescriptionStore()

const isOpen = ref(false)
const isOpen2 = ref(false)
const isOpen3 = ref(false)

const schema = z.object({
  titleEn: z.string(),
  titleFr: z.string(),
  descriptionEn: z.string(),
  descriptionFr: z.string(),
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
  picture3: z.object({
    base64: z.string(),
    name: z.string(),
  }),
})

const state = reactive({
  titleEn: undefined,
  titleFr: undefined,
  descriptionEn: undefined,
  descriptionFr: undefined,
  background_color: undefined,
  background_opacity: undefined,
  picture1: undefined,
  picture2: undefined,
  picture3: undefined,
})

async function onSubmit(about_description) {
  if (about_description?.[`description${selectLangue?.value.ref}`].length < 20 || about_description?.[`description${selectLangue?.value.ref}`].length > 600) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: about_description.id,
      titleFr: about_description.titleFr,
      titleEn: about_description.titleEn,
      descriptionFr: about_description.descriptionFr,
      descriptionEn: about_description.descriptionEn,
      background_color: about_description.background_color,
      background_opacity: about_description.background_opacity,
      picture1: state.picture1,
    };

    await aboutDescriptionStore.updateAboutDescriptionData(formData);
    reloadNuxtApp()
  }
}

async function onSubmit_restaurant(about_description) {
  if (about_description?.[`description${selectLangue?.value.ref}`].length < 20 || about_description?.[`description${selectLangue?.value.ref}`].length > 200) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: about_description.id,
      titleFr: about_description.titleFr,
      titleEn: about_description.titleEn,
      descriptionFr: about_description.descriptionFr,
      descriptionEn: about_description.descriptionEn,
      background_color: about_description.background_color,
      background_opacity: about_description.background_opacity,
      picture1: state.picture1,
    };

    await aboutDescriptionStore.updateAboutDescriptionData(formData);
    reloadNuxtApp()
  }
}

async function onSubmit_spa(about_description) {
  if (about_description?.[`description${selectLangue?.value.ref}`].length < 20 || about_description?.[`description${selectLangue?.value.ref}`].length > 300) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: about_description.id,
      titleFr: about_description.titleFr,
      titleEn: about_description.titleEn,
      descriptionFr: about_description.descriptionFr,
      descriptionEn: about_description.descriptionEn,
      background_color: about_description.background_color,
      background_opacity: about_description.background_opacity,
      picture1: state.picture1,
      picture2: state.picture2,
      picture3: state.picture3,
    };

    await aboutDescriptionStore.updateAboutDescriptionData(formData);
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
<div v-for="about_desc in aboutDescriptionStore.data">
  <div v-if="about_desc.about_section_id == route.params.id">
    <div v-if="about_desc.id == 1">
      <div class="px-12 pt-4 w-[100%] mb-6">
        <h2 class="text-3xl font-noto mb-2" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h2>
        <div class="flex flex-col items-center justify-center h-[80%] bg-center font-noto relative border" :style="{backgroundImage: `url(${about_desc.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">
          <div class="bg-black bg-opacity-50 h h-screen flex items-center">
            <div class="flex flex-col space-y-10">
              <h1 class="font-antic text-center text-[60px] text-white">{{ about_desc?.[`title${selectLangue?.ref}`] }}</h1>
              <p class="text-center px-44 text-white text-[20px]">
                {{ about_desc?.[`description${selectLangue?.ref}`] }}
              </p>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-noto mt-6 mb-2 text-gray-800" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
          <UForm :schema="schema" :state="state" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">
              {{ selectLangue?.ref === 'En' ? 'About Section' : 'Section À propos' }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="md:col-span-2 space-y-4">
                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                  <UInput v-model="about_desc[`title${selectLangue?.ref}`]" />
                </UFormGroup>

                <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                  <UTextarea
                      :rows="5"
                      :maxrows="5"
                      v-model="about_desc[`description${selectLangue?.ref}`]"
                      class="w-full"
                  />
                  <span class="text-sm text-gray-500 mt-1 block text-right">
            {{ about_desc[`description${selectLangue?.ref}`].length }}/600 {{ selectLangue?.ref === 'En' ? 'characters' : 'caractères' }}
          </span>
                </UFormGroup>
              </div>

              <!-- Colonne droite : Images -->
              <div class="space-y-4">
                <div class="space-y-2">
                  <UFormGroup
                      v-for="picture in about_desc.picture"
                      :key="picture.id"
                      :label="'Image ' + picture.id"
                  >
                    <UInput
                        type="file"
                        size="md"
                        icon="i-heroicons-folder"
                        @change="handleFileUpload($event, 0)"
                    />
                  </UFormGroup>
                </div>
              </div>
            </div>

            <!-- Bouton Valider -->
            <div class="flex justify-end pt-4">
              <UButton @click="onSubmit(about_desc)" class="text-center buttonSubmit">
                {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
    <div v-if="about_desc.id == 3">
      <div class="px-8 w-[100%]">
        <h2 class="text-3xl font-noto mb-2 mt-6" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h2>
        <div class="flex flex-col items-center justify-center py-20 px-20 border" :style="{backgroundColor: about_desc?.background_color, opacity: about_desc?.background_opacity}">
          <h1 class="font-antic title_bar">{{ about_desc?.[`title${selectLangue?.ref}`] }}</h1>
          <h2 class="font-noto text-black text-center desc_bar">{{ about_desc?.[`description${selectLangue?.ref}`] }}</h2>
        </div>
      </div>
    </div>

    <div v-if="about_desc.id == 4">
      <div class="px-8 w-[100%]">
        <h2 class="text-3xl font-noto mb-2 mt-6" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h2>
        <div class="div flex flex-row items-center border" :style="{backgroundColor: about_desc?.background_color, opacity: about_desc?.background_opacity}">
          <img class="img_bar p-4" :src="about_desc.picture?.[0]?.picturePath" alt="Restaurant"/>

          <div class="flex flex-col items-center">
            <h2 class="text-black font-noto desc_bar">{{ about_desc?.[`title${selectLangue?.ref}`] }}</h2>
            <p class="text-black font-noto text-center text_bar">
              {{ about_desc?.[`description${selectLangue?.ref}`] }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="about_desc.id == 3 || about_desc.id == 4" class="px-8 pt-10">
      <h2 class="text-3xl font-noto mb-2" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <UForm :schema="schema" :state="state" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            {{ selectLangue?.ref === 'En' ? 'Section Content' : 'Contenu de la section' }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Colonne gauche : Titre + Description -->
            <div class="md:col-span-2 space-y-4">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                <UInput v-model="about_desc[`title${selectLangue?.ref}`]" />
              </UFormGroup>

              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                <UTextarea
                    :rows="about_desc.id == 3 ? 3 : 8"
                    :maxrows="about_desc.id == 3 ? 3 : 8"
                    v-model="about_desc[`description${selectLangue?.ref}`]"
                    class="w-full"
                />
                <span class="text-sm text-gray-500 mt-1 block text-right">
              {{ about_desc[`description${selectLangue?.ref}`].length }}/200 {{ selectLangue?.ref === 'En' ? 'characters' : 'caractères' }}
            </span>
              </UFormGroup>
            </div>

            <!-- Colonne droite : Images (seulement si id == 4) -->
            <div v-if="about_desc.id == 4" class="space-y-4">
              <div class="space-y-2">
                <UFormGroup
                    v-for="picture in about_desc.picture"
                    :key="picture.id"
                    :label="'Image ' + picture.id"
                >
                  <UInput
                      type="file"
                      size="md"
                      icon="i-heroicons-folder"
                      @change="handleFileUpload($event, 0)"
                  />
                </UFormGroup>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6 mt-6">
            <h4 class="font-medium text-gray-700 mb-4">
              {{ selectLangue?.ref === 'En' ? 'Background Settings' : 'Paramètres de fond' }}
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background color' : 'Couleur de fond'" required>
                <UInput v-model="about_desc.background_color" placeholder="#FFFFFF" />
              </UFormGroup>

              <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" required>
                <UInput v-model="about_desc.background_opacity" placeholder="1 ou 0.5..." />
              </UFormGroup>
            </div>
          </div>

          <!-- Bouton Valider -->
          <div class="flex justify-end pt-4">
            <UButton @click="onSubmit_restaurant(about_desc)" class="text-center buttonSubmit">
              {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
            </UButton>
          </div>
        </UForm>
      </div>
    </div>

    <div v-if="about_desc.id == 5">
      <div class="p-8 w-[100%]">
      <div class="flex flex-col items-center justify-center py-20 px-20 border" :style="{backgroundColor: about_desc?.background_color, opacity: about_desc?.background_opacity}">
        <h1 class="font-antic title_bar">{{ about_desc?.[`title${selectLangue?.ref}`] }}</h1>
        <h2 class="font-noto text-black text-center desc_bar">{{ about_desc?.[`description${selectLangue?.ref}`] }}</h2>

        <div class="pb-32">
          <div class="flex flex-col relative">
            <img class="static w-screen" :src="about_desc?.picture?.[0]?.picturePath" alt="Spawell"/>
            <div class="absolute -bottom-32 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center space-x-20">
              <img class="h-3/6 w-3/6" :src="about_desc?.picture?.[1]?.picturePath" alt="spa"/>
              <img class="h-3/6 w-3/6" :src="about_desc?.picture?.[2]?.picturePath" alt="spa"/>
            </div>
          </div>
        </div>
      </div>
        <div class="pt-10">
          <h2 class="text-3xl font-noto mb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <UForm :schema="schema" :state="state" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2 space-y-4">
                  <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                    <UInput v-model="about_desc[`title${selectLangue?.ref}`]" />
                  </UFormGroup>

                  <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                    <UTextarea
                        :rows="4"
                        :maxrows="4"
                        v-model="about_desc[`description${selectLangue?.ref}`]"
                        type="text"
                        class="w-full"
                    />
                    <span class="text-sm text-gray-500 mt-1 block text-right">
              {{ about_desc[`description${selectLangue?.ref}`].length }}/300 {{ selectLangue?.ref === 'En' ? 'characters' : 'caractères' }}
            </span>
                  </UFormGroup>
                </div>

                <div class="space-y-4">
                  <UFormGroup
                      v-for="(picture, index) in about_desc.picture"
                      :key="index"
                      :label="'Image ' + picture.id"
                      class="mt-2"
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
                    <UInput v-model="about_desc.background_color" placeholder="#FFFFFF" />
                  </UFormGroup>

                  <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" required>
                    <UInput v-model="about_desc.background_opacity" placeholder="1 ou 0.5..." />
                  </UFormGroup>
                </div>
              </div>

              <div class="flex justify-end pt-4">
                <UButton @click="onSubmit_spa(about_desc)" class="buttonSubmit">
                  {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
                </UButton>
              </div>
            </UForm>
          </div>
        </div>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>
.title_bar {
  font-size: 70px;
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 50px;
}
.desc_bar {
  font-size: 29px;
  padding-left: 150px;
  padding-right: 150px;
  padding-bottom: 50px;
}
.text_bar {
  font-size: 20px;
  padding-left: 250px;
  padding-right: 250px;
}
.img_bar {
  padding-left: 100px;
}
.modify-color-1{
  position: absolute;
  right: 50px;
  top: 580px;
}
.modify-color-2{
  position: absolute;
  right: 50px;
  bottom: -500px;
}
.modify-color-3{
  position: absolute;
  right: 50px;
  bottom: -240px;
}
</style>