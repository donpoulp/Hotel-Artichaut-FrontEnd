<script setup lang="ts">
import { z } from 'zod'
import { reactive } from 'vue'
import {useStrongestStore} from "~/store/strongest";
import {useStrongestSectionStore} from "~/store/strongest-section";

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

// strongest //////////////////////////////////////////////
const strongestStore = useStrongestStore();

const isOpen = ref(false)
const isOpen2 = ref(false)

const schema = z.object({
  background_color_1: z.string(),
  background_opacity_1: z.string(),
  background_color_2: z.string(),
  background_opacity_2: z.string(),
})

const state = reactive({
  background_color_1: undefined,
  background_opacity_1: undefined,
  background_color_2: undefined,
  background_opacity_2: undefined,
})

async function onSubmit(strongest) {
  await strongestStore.updateStrongestData(strongest);
  reloadNuxtApp()
}

// strongest-section ///////////////////////////////////////
const strongestSectionStore = useStrongestSectionStore();

const schema_section = z.object({
  icon: z.string(),
  text: z.string(),
})

const state_section = reactive({
  icon: undefined,
  text: undefined,
})

async function onSubmit_section(section) {
  if (section?.[`text${selectLangue.value.ref}`].length > 143) {
    alert("trop de caractere")
  }else {
    await strongestSectionStore.updateStrongestSectionData(section);
    reloadNuxtApp()
  }
}
</script>

<template>
  <section class="back-office-strongest pt-10 px-10 pb-10">
    <h2 class="text-2xl font-noto mb-4" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h2>
    <div v-if="status1 === 'pending' && status2 === 'pending'">
      Loading ...
    </div>
    <div v-else>
      <div class="back-office-strongest-div1">
        <div class="back-office-strongest-div2">
          <div v-for="strongest_section in strongestSectionStore.data" class="back-office-strongest-section w-[350px] flex flex-wrap">
            <UIcon :name="strongest_section.icon" class="h-20 w-20"></UIcon>
            <p class="w-[350px]">{{ strongest_section[`text${selectLangue?.ref}`] }}</p>
          </div>
        </div>
      </div>
    </div>


    <h2 class="text-2xl font-noto mt-10 mb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>

    <div class="space-y-6">
      <div
          v-for="strongest_section in strongestSectionStore.data"
          :key="strongest_section.id"
          class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <UForm :schema="schema_section" :state="state_section" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            Section : {{ strongest_section.id }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
              <UTextarea
                  v-model="strongest_section[`text${selectLangue?.ref}`]"
                  :rows="4"
                  class="w-full"
              />
              <div class="text-right text-sm text-gray-500 mt-1">
                {{ strongest_section[`text${selectLangue?.ref}`].length }}/143&nbsp;
                <span v-text="selectLangue?.ref === 'En' ? 'character' : 'caractère'"></span>
              </div>
            </UFormGroup>

            <UFormGroup label="Icon" required>
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
              <UInput v-model="strongest_section.icon"/>
            </UFormGroup>
          </div>

          <div class="flex justify-end">
            <UButton @click="onSubmit_section(strongest_section)" class="text-center">
              {{ selectLangue?.ref === 'En' ? 'Submit' : 'Valider' }}
            </UButton>
          </div>
        </UForm>
      </div>
    </div>

    <!-- Section modification des couleurs de fond -->
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mt-10">
      <UForm :schema="shema" :state="state" class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          {{ selectLangue?.ref === 'En' ? 'Background Colors' : 'Couleurs de fond' }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background Color 1' : 'Couleur de fond 1'" required>
            <UInput v-model="strongestStore.data.background_color_1" placeholder="#FFFFFF" />
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity 1' : 'Opacité 1'" required>
            <UInput v-model="strongestStore.data.background_opacity_1" placeholder="0.5" type="number" step="0.1" min="0" max="1" />
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Background Color 2' : 'Couleur de fond 2'" required>
            <UInput v-model="strongestStore.data.background_color_2" placeholder="#000000" />
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Opacity 2' : 'Opacité 2'" required>
            <UInput v-model="strongestStore.data.background_opacity_2" placeholder="0.8" type="number" step="0.1" min="0" max="1" />
          </UFormGroup>
        </div>

        <div class="flex justify-end">
          <UButton @click="onSubmit_colors(backgroundColors)" class="text-center">
            {{ selectLangue?.ref === 'En' ? 'Update Colors' : 'Modifier les couleurs' }}
          </UButton>
        </div>
      </UForm>
    </div>
  </section>
</template>

<style scoped>
.back-office-strongest h2{
  font-size: 30px;
}
.back-office-strongest-div1{
  background-color: v-bind(strongestStore.data.background_color_1);
  opacity: v-bind(strongestStore.data.background_opacity_1+'%');
  padding: 3% 5%;
}
.back-office-strongest-div2{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: v-bind(strongestStore.data.background_color_2);
  opacity: v-bind(strongestStore.data.background_opacity_2+'%');
  padding: 1% 3%;
}
.back-office-strongest-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.back-office-strongest-modify{
  border: #45474B 1px solid;
}
.buttonSubmit .text{
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.modify-color-2{
  position: absolute;
  right: 130px;
  top: 330px;
  border: solid 1px black;
  z-index: 99999;
}
.modify-color-1{
  position: absolute;
  right: 55px;
  top: 375px;
  z-index: 999;
  border: solid 1px black;
}
</style>