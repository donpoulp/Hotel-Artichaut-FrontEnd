<script setup lang="ts">
import {useAboutDescriptionStore} from "~/store/about_description";
import {z} from "zod";
import {reactive} from "vue";

definePageMeta({
  layout: 'back-office',
})

const route = useRoute()

const aboutDescriptionStore = useAboutDescriptionStore()

const isOpen = ref(false)
const isOpen2 = ref(false)
const isOpen3 = ref(false)

const schema = z.object({
  title: z.string(),
  description: z.string(),
  background_color: z.string(),
  background_opacity: z.string(),
})

const state = reactive({
  title: undefined,
  description: undefined,
  background_color: undefined,
  background_opacity: undefined,
})

async function onSubmit(about_description) {
  if (about_description.description.length < 20 || about_description.description.length > 600) {
    alert("trop de caractere")
  }else {
    await aboutDescriptionStore.updateAboutDescriptionData(about_description);
    reloadNuxtApp()
  }
}

async function onSubmit_restaurant(about_description) {
  if (about_description.description.length < 20 || about_description.description.length > 200) {
    alert("trop de caractere")
  }else {
    await aboutDescriptionStore.updateAboutDescriptionData(about_description);
    reloadNuxtApp()
  }
}

async function onSubmit_spa(about_description) {
  if (about_description.description.length < 20 || about_description.description.length > 300) {
    alert("trop de caractere")
  }else {
    await aboutDescriptionStore.updateAboutDescriptionData(about_description);
    reloadNuxtApp()
  }
}
</script>

<template>
<div v-for="about_desc in aboutDescriptionStore.data">
  <div v-if="about_desc.about_section_id == route.params.id">
    <div v-if="about_desc.id == 1">
      <div class="px-8 pt-2 w-[100%] mb-6">
        <h2 class="text-3xl font-noto mb-2">Preview</h2>
        <div class="flex flex-col items-center justify-center h-[80%] bg-center font-noto relative border" :style="{backgroundImage: `url(${about_desc.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">
          <div class="bg-black bg-opacity-50 h h-screen flex items-center">
            <div class="flex flex-col space-y-10">
              <h1 class="font-antic text-center text-[60px] text-white">{{ about_desc?.title }}</h1>
              <p class="text-center px-44 text-white text-[20px]">
                {{ about_desc?.description }}
              </p>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-noto mt-4 mb-2">Modify</h2>
        <div class="back-office-strongest-modify flex flex-col w-[fit-content]">
            <UForm :schema="schema" :state="state" class="flex flex-row items-center w-[fit-content] border-2">
              <div class="flex text-center items-center whitespace-nowrap p-6">
                <UFormGroup label="Title">
                  <UInput v-model="about_desc.title" class="w-[fit-content]"></UInput>
                </UFormGroup>
              </div>
              <div class="w-[fit-content] flex flex-row border-r-2 border-l-2 p-6">
                <UFormGroup label="Text">
                  <UTextarea :rows="5" :maxrows="5" v-model="about_desc.description" type="text" class="w-[790px] h-full textearea-strongest"/>
                </UFormGroup>
                <span class="ml-2 bottom-0 flex items-end">{{about_desc.description.length}}/600 caractère</span>
              </div>
              <div class="h-full flex flex-col w-[fit-content] px-6 py-[3.9rem] border-r-2">
                <UFormGroup v-for="picture in about_desc.picture" :label="'image' + picture.id">
                  <UInput type="file" size="md" icon="i-heroicons-folder"/>
                </UFormGroup>
              </div>
              <div class="h-full flex flex-col w-[fit-content] p-6">
                <UButton block @click="onSubmit(about_desc)" class="text-center w-full">Valider</UButton>
              </div>
            </UForm>
        </div>
      </div>
    </div>
    <div v-if="about_desc.id == 3">
      <div class="px-8 w-[100%]">
        <h2 class="text-3xl font-noto mb-2 mt-6">Preview</h2>
        <div class="flex flex-col items-center justify-center py-20 px-20 border" :style="{backgroundColor: about_desc?.background_color, opacity: about_desc?.background_opacity}">
          <h1 class="font-antic title_bar">{{ about_desc?.title }}</h1>
          <h2 class="font-noto text-black text-center desc_bar">{{ about_desc?.description }}</h2>
          <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-1" @click="isOpen = true"/>
          <UModal v-model="isOpen">
            <div class="p-4">
              <UForm :schema="schema" :state="state">
                <UFormGroup label="color">
                  <UInput v-model="about_desc.background_color"/>
                </UFormGroup>
                <UFormGroup label="opacity" class="mt-3">
                  <UInput v-model="about_desc.background_opacity"/>
                </UFormGroup>
                <div class="flex justify-center mt-4">
                  <UButton @click="onSubmit(about_desc)">
                    Valider
                  </UButton>
                </div>
              </UForm>
            </div>
          </UModal>
        </div>
      </div>
    </div>

    <div v-if="about_desc.id == 4">
      <div class="px-8 w-[100%]">
        <h2 class="text-3xl font-noto mb-2 mt-6">Preview</h2>
        <div class="div flex flex-row items-center border" :style="{backgroundColor: about_desc?.background_color, opacity: about_desc?.background_opacity}">
          <img class="img_bar p-4" :src="about_desc.picture?.[0]?.picturePath" alt="Restaurant"/>

          <div class="flex flex-col items-center">
            <h2 class="text-black font-noto desc_bar">{{ about_desc?.title }}</h2>
            <p class="text-black font-noto text-center text_bar">
              {{ about_desc?.description }}
            </p>
          </div>
          <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-2" @click="isOpen2 = true"/>
          <UModal v-model="isOpen2">
            <div class="p-4">
              <UForm :schema="schema" :state="state">
                <UFormGroup label="color">
                  <UInput v-model="about_desc.background_color"/>
                </UFormGroup>
                <UFormGroup label="opacity" class="mt-3">
                  <UInput v-model="about_desc.background_opacity"/>
                </UFormGroup>
                <div class="flex justify-center mt-4">
                  <UButton @click="onSubmit(about_desc)">
                    Valider
                  </UButton>
                </div>
              </UForm>
            </div>
          </UModal>
        </div>
      </div>
    </div>

    <div v-if="about_desc.id == 3 || about_desc.id == 4" class="p-6">
      <h2 class="text-3xl font-noto mt-4 mb-2">Modify</h2>
      <div class="back-office-strongest-modify flex flex-col w-[fit-content]">
        <UForm :schema="schema" :state="state" class="flex flex-row items-center w-[fit-content] border-2">
          <div class="flex text-center items-center whitespace-nowrap p-6">
            <UFormGroup label="Title">
              <UInput v-model="about_desc.title" class="w-[fit-content]"></UInput>
            </UFormGroup>
          </div>
          <div class="w-[fit-content] flex flex-row border-r-2 border-l-2 p-6">
            <UFormGroup label="Text">
              <UTextarea v-if="about_desc.id == 3" :rows="3" :maxrows="3" v-model="about_desc.description" type="text" class="w-[500px] h-full textearea-strongest"/>
              <UTextarea v-if="about_desc.id == 4" :rows="8" :maxrows="8" v-model="about_desc.description" type="text" class="w-[183px] h-full textearea-strongest"/>
            </UFormGroup>
            <span class="text-right pr-2 ml-2 bottom-0 flex items-end">{{about_desc.description.length}}/200 caractère</span>
          </div>
          <div v-if="about_desc.id == 4" class="h-full flex flex-col w-[fit-content] px-6 py-[5.75rem] border-r-2">
            <UFormGroup v-for="picture in about_desc.picture" :label="'image' + picture.id">
              <UInput type="file" size="md" icon="i-heroicons-folder"/>
            </UFormGroup>
          </div>
          <div class="h-full flex flex-col w-[200px] p-6">
            <UButton block @click="onSubmit_restaurant(about_desc)" class="text-center w-full">Valider</UButton>
          </div>
        </UForm>
      </div>
    </div>

    <div v-if="about_desc.id == 5">
      <div class="p-8 w-[100%]">
        <h2 class="text-3xl font-noto mb-2">Preview</h2>
      <div class="flex flex-col items-center justify-center py-20 px-20 border" :style="{backgroundColor: about_desc?.background_color, opacity: about_desc?.background_opacity}">
        <h1 class="font-antic title_bar">{{ about_desc?.title }}</h1>
        <h2 class="font-noto text-black text-center desc_bar">{{ about_desc?.description }}</h2>

        <div class="pb-32">
          <div class="flex flex-col relative">
            <img class="static w-screen" :src="about_desc?.picture?.[0]?.picturePath" alt="Spawell"/>
            <div class="absolute -bottom-32 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center space-x-20">
              <img class="h-3/6 w-3/6" :src="about_desc?.picture?.[1]?.picturePath" alt="spa"/>
              <img class="h-3/6 w-3/6" :src="about_desc?.picture?.[2]?.picturePath" alt="spa"/>
            </div>
          </div>
        </div>
        <UButton icon="material-symbols:colors" color="lime" variant="soft" class="modify-color-3" @click="isOpen3 = true"/>
        <UModal v-model="isOpen3">
          <div class="p-4">
            <UForm :schema="schema" :state="state">
              <UFormGroup label="color">
                <UInput v-model="about_desc.background_color"/>
              </UFormGroup>
              <UFormGroup label="opacity" class="mt-3">
                <UInput v-model="about_desc.background_opacity"/>
              </UFormGroup>
              <div class="flex justify-center mt-4">
                <UButton @click="onSubmit(about_desc)">
                  Valider
                </UButton>
              </div>
            </UForm>
          </div>
        </UModal>
      </div>
        <h2 class="text-3xl font-noto mt-4 mb-2">Modify</h2>
        <div class="back-office-strongest-modify flex flex-col w-[fit-content]">
          <UForm :schema="schema" :state="state" class="flex flex-row items-center w-[fit-content] border-2">
            <div class="flex text-center items-center whitespace-nowrap p-6">
              <UFormGroup label="Title">
                <UInput v-model="about_desc.title" class="w-[fit-content]"></UInput>
              </UFormGroup>
            </div>
            <div class="w-[fit-content] h-full flex flex-row border-l-2 px-6 py-[4.25rem]">
              <UFormGroup label="Text">
                <UTextarea :rows="4" :maxrows="4" v-model="about_desc.description" type="text" class="w-[500px] h-full textearea-strongest"/>
              </UFormGroup>
              <span class="text-right pr-2 ml-2 bottom-0 flex items-end">{{about_desc.description.length}}/300 caractère</span>
            </div>
            <div class="h-full flex flex-col w-[fit-content] p-6 border-r-2 border-l-2">
              <UFormGroup v-for="picture in about_desc.picture" :label="'image' + picture.id" class="mt-2">
                <UInput type="file" size="md" icon="i-heroicons-folder"/>
              </UFormGroup>
            </div>
            <div class="h-full flex w-[fit-content] p-6">
              <UButton block @click="onSubmit_spa(about_desc)" class="text-center w-full">Valider</UButton>
            </div>
          </UForm>
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