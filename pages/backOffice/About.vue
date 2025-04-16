<script setup lang="ts">
import Spa from "~/components/site/Spa.vue";
import Hostel from "~/components/site/Hostel.vue";
import Restaurant from "~/components/site/Restaurant.vue";
import {useAboutStore} from "~/store/about";
import {useAboutSectionStore} from "~/store/about_section";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
})

const selectedLangue = useState('selectedLangue');

/// About
const aboutStore = useAboutStore()

const schema = z.object({
  background_color: z.string(),
  background_opacity: z.string(),
})

const state = reactive({
  background_color: undefined,
  background_opacity: undefined,
})

const isOpen = ref(false);

async function onSubmit(about) {
  await aboutStore.updateAboutData(about);
  reloadNuxtApp()
}

const bgColor = computed(()=>{
  return aboutStore.data?.[0]?.background_color
})
const bgOpacity = computed(()=>{
  return aboutStore.data?.[0]?.background_opacity
})


/// About_section
const aboutSectionStore = useAboutSectionStore()

const schema_section = z.object({
  titleEn: z.string(),
  titleFr: z.string(),
  picture: z.object({
    base64: z.string(),
    name: z.string(),
  }),
})

const state_section = reactive({
  titleEn: undefined,
  titleFr: undefined,
  picture: undefined,
})

async function onSubmit_section(about_section) {
  const formData = {
    id: about_section.id,
    titleFr: about_section.titleFr,
    titleEn: about_section.titleEn,
    picture: state_section.picture,
  };

  await aboutSectionStore.updateAboutSectionData(formData);
  reloadNuxtApp()
}

const handleFileUpload = (event) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      state_section.picture = {'base64': base64Image, 'name': file.name};
      console.log(state_section.picture)
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="flex flex-col pt-10 px-10 pb-10">
    <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h1>
    <div class="py-20 px-[6rem]"  :style="{ backgroundColor: bgColor, opacity: bgOpacity / 100 }">
      <div class="flex flex-row justify-between">
        <Hostel/>
        <Restaurant/>
        <Spa/>
      </div>
    </div>

    <h1 class="text-3xl font-noto pb-4 pt-10 text-gray-800" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h1>

    <div class="space-y-6">
      <div
          v-for="about_section in aboutSectionStore.data"
          :key="about_section.id"
          class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <UForm :schema="schema_section" :state="state_section" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            Section : {{ about_section.id }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
              <UInput v-model="about_section[`title${selectedLangue?.ref}`]" />
            </UFormGroup>

            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Image' : 'Image'">
              <UInput type="file" size="md" icon="i-heroicons-folder" @change="handleFileUpload($event)" />
            </UFormGroup>
          </div>

          <div class="flex flex-col md:flex-row justify-between gap-4">
            <UButton @click="onSubmit_section(about_section)" class="w-full md:w-[200px] flex justify-center">
              {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
            </UButton>

            <NuxtLink :to="{ name:'backOffice-aboutSection-id', params: { id: about_section.id} }" class="w-full md:w-[200px]">
              <UButton block color="blue">
                {{ selectedLangue?.ref === 'En' ? 'Go to' : 'Aller à' }}
                <UIcon name="hugeicons:arrow-right-01" />
              </UButton>
            </NuxtLink>
          </div>
        </UForm>
      </div>

      <!-- Section modification couleur de fond -->
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mt-10">
        <UForm :schema="schema" :state="state" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            {{ selectLangue?.ref === 'En' ? 'Background Settings' : 'Paramètres de fond' }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background Color' : 'Couleur de fond'" required>
              <UInput v-model="aboutStore.data[0].background_color" placeholder="#FFFFFF" />
            </UFormGroup>

            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" required>
              <UInput v-model="aboutStore.data[0].background_opacity" placeholder="0.5" type="number" step="0.1" min="0" max="1" />
            </UFormGroup>
          </div>

          <div class="flex justify-end">
            <UButton @click="onSubmit_background(backgroundSettings)" class="text-center buttonSubmit">
              {{ selectLangue?.ref === 'En' ? 'Update Background' : 'Modifier le fond' }}
            </UButton>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background_about{
  background-color: v-bind(bgColor);
  opacity: v-bind(bgOpacity);
}
.modify-color-1{
  position: absolute;
  right: 60px;
  bottom: 0;
}
</style>