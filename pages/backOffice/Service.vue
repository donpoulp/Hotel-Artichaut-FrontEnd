<script setup lang="ts">
import Service from "~/pages/site/Services.vue";
import {useServicesStore} from "~/store/services";
import {z} from "zod";
import {reactive} from "vue";


definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const servicesStore = useServicesStore()

const schema = z.object({
  backgroundText_color_1: z.string(),
  backgroundText_color_2: z.string(),
  backgroundText_opacity_1: z.string(),
  backgroundText_opacity_2: z.string(),
  picture: z.object({
    base64: z.string(),
    name: z.string(),
  }),
})

const state = reactive({
  backgroundText_color_1: undefined,
  backgroundText_color_2: undefined,
  backgroundText_opacity_1: undefined,
  backgroundText_opacity_2: undefined,
  picture: undefined,

})

async function onSubmit(service) {
  if (service?.[`name${selectLangue.value.ref}`]?.length > 22 || service?.[`description${selectLangue.value.ref}`]?.length > 300) {
    alert("trop de caractere")
  }else {
    const formData = {
      id: service.id,
      titleFr: service.nameFr,
      titleEn: service.nameEn,
      descriptionFr: service.descriptionFr,
      descriptionEn: service.descriptionEn,
      backgroundText_color_1: service.backgroundText_color_1,
      backgroundText_color_2: service.backgroundText_color_2,
      backgroundText_opacity_1: service.backgroundText_opacity_1,
      backgroundText_opacity_2: service.backgroundText_opacity_2,
      picture: state.picture,
    };

    await servicesStore.updateServiceData(formData);
    await servicesStore.loadServicesData()
    reloadNuxtApp()
  }
}

const handleFileUpload = (event) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      state.picture = {'base64': base64Image, 'name': file.name};
      console.log(state.picture)
    };
    reader.readAsDataURL(file);
  }
};

const isOpen = ref(false)

function openModalColor(id){
  servicesStore.loadServicesByIdData(id)
  console.log("2",servicesStore.data2)
  isOpen.value = true
}

console.log(servicesStore.data)
</script>

<template>
  <div class="flex flex-col pt-10 px-10">
    <div class="w-[80vw]">

        <div v-for="service in servicesStore.data" class="">
          <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h1>
          <div v-if="service.id % 2 == 0" class="flex flex-row items-center bg-[#0D5649]">
            <img class="w-[50%] z-0" :src="service.picture[0].picturePath"/>
            <div class="post-it h-[450px] w-[70%] flex flex-col items-center justify-center" :style="{ background: `linear-gradient(0deg, ${service.backgroundText_color_1} ${service.backgroundText_opacity_1}%, ${service.backgroundText_color_2} ${service.backgroundText_opacity_2}%)` }">
              <div class="text-[64px] font-antic pl-[25%] pb-10">{{ service[`name${selectLangue.ref}`] }}</div>
              <div class="text-[28px] font-noto text-center p-2">{{ service[`description${selectLangue.ref}`] }}</div>
            </div>
            <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-1" @click="openModalColor(service.id)"/>
          </div>

          <div v-else class="flex flex-row items-center bg-[#0D5649]">
            <div class="post-it-reverse h-[450px] w-[70%] flex flex-col items-center justify-center" :style="{ background: `linear-gradient(0deg, ${service.backgroundText_color_1} ${service.backgroundText_opacity_1}%, ${service.backgroundText_color_2} ${service.backgroundText_opacity_2}%)` }">
              <div class="text-[64px] font-antic pr-[25%] pb-10">{{ service[`name${selectLangue.ref}`] }}</div>
              <div class="text-[28px] font-noto text-center p-2">{{ service[`description${selectLangue.ref}`] }}</div>
            </div>
            <img class="w-[50%] z-0" :src="service.picture[0].picturePath"/>
            <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-1" @click="openModalColor(service.id)"/>
          </div>

          <div class="flex flex-col pt-10 mb-20">
            <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h1>
            <div class="flex flex-col w-[fit-content] mb-6">
                <UForm :schema="schema" :state="state" class="flex flex-row items-center border-2">
                  <div class="flex text-center items-center whitespace-nowrap py-[8.25rem] px-8 border-r-2">
                    Section : {{service.id}}
                  </div>
                  <div class="flex flex-row justify-center items-center p-8">
                    <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
                      <UInput v-model="service[`name${selectLangue?.ref}`]"></UInput>
                    </UFormGroup>
                  </div>
                  <div class="flex flex-col p-8 py-[4.7rem] border-r-2 border-l-2">
                    <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
                      <UTextarea rows="4" maxrows="4" v-model="service[`description${selectLangue?.ref}`]" class="w-[490px] textarea_backoffice_news"></UTextarea>
                      <span class="float-right text-[15px]">{{service[`description${selectLangue?.ref}`].length}}/300 caractère</span>
                    </UFormGroup>
                  </div>
                  <div>
                    <div class="p-6">
                        <UFormGroup :label="'image ' + service.picture[0].id" class="mb-2">
                          <UInput type="file" size="md" icon="i-heroicons-folder" @change="handleFileUpload($event)"/>
                        </UFormGroup>
                    </div>
                  </div>
                  <div class="py-[7.80rem] px-6 border-l-2">
                    <UButton block @click="onSubmit(service)" class="text-center h-10 w-full buttonSubmit">Valider</UButton>
                  </div>
                </UForm>
            </div>
          </div>
        </div>

    </div>
  </div>

  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema" :state="state">
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Color' : 'Couleur'" required>
          <UInput v-model="servicesStore.data2.backgroundText_color_1"/>
        </UFormGroup>
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" class="mt-3" required>
          <UInput v-model="servicesStore.data2.backgroundText_opacity_1"/>
        </UFormGroup>
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Color' : 'Couleur'" class="mt-3" required>
          <UInput v-model="servicesStore.data2.backgroundText_color_2"/>
        </UFormGroup>
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity' : 'Opacité'" class="mt-3" required>
          <UInput v-model="servicesStore.data2.backgroundText_opacity_2"/>
        </UFormGroup>

        <div class="flex justify-center mt-4">
          <UButton @click="onSubmit(servicesStore.data2)">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>

<style scoped>
.post-it{
  z-index: 2;
  margin-left: -20%;
  opacity: 80%;
}
.post-it-reverse{
  z-index: 2;
  margin-right: -20%;
  opacity: 80%;
}
.modify-color-1{
  z-index: 3;
  position: absolute;
  right: 80px;
}
</style>