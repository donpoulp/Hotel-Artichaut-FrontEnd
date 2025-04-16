<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import {useFooterStore} from "~/store/footer.js";
import Footer from "~/components/site/Footer.vue";
import Welcome from "~/components/site/Welcome.vue";

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const footerStore = useFooterStore();
console.log(footerStore.data)

const schema = z.object({
  title: z.string(),
  text: z.string(),
  titleReseau: z.string(),
  iconReseau: z.string(),
  linkReseau: z.string(),
})

const state = reactive({
  title: undefined,
  text: undefined,
  titleReseau: undefined,
  iconReseau: undefined,
  linkReseau: undefined,
})

async function onSubmit() {
  await footerStore.updateFooterData({
    title: state.title,
    text: state.text,
    titleReseau: state.titleReseau,
    iconReseau: state.iconReseau,
    linkReseau: state.linkReseau,
  });
}
</script>

<template>

    <div class="flex flex-col px-20 pt-10">
      <h1 class="text-3xl font-noto pb-4" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h1>
      <div class="py-2">
        <Footer />
      </div>
    </div>

    <div class="pb-20 pt-10">
      <h2 class="text-2xl font-noto px-20 pb-4" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>

      <UForm :schema="schema" :state="state" class="space-y-4 px-20" @submit.prevent="onSubmit">

        <div class="flex flex-row space-x-4">
          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" class="custom-label" required>
            <UInput v-model="footerStore.data[0][`title${selectLangue?.ref}`]" class="custom-input"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" class="custom-label" required>
            <UInput v-model="footerStore.data[0][`text${selectLangue?.ref}`]" class="custom-input"/>
          </UFormGroup>
        </div>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Social title' : 'Titre des réseaux'" required>
          <UInput v-model="footerStore.data[0].titleReseau" class="custom-input"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Social icon' : 'Icon réseaux'" required>
          <UInput v-model="footerStore.data[0].iconReseau" class="custom-input"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Social link' : 'Liens réseaux'" required>
          <UInput v-model="footerStore.data[0].linkReseau" class="custom-input"/>
        </UFormGroup>

        <UButton type="submit" v-text="selectLangue?.ref === 'En' ? 'Update' : 'Modifier'">
        </UButton>

      </UForm>
    </div>

</template>

<style scoped>
</style>