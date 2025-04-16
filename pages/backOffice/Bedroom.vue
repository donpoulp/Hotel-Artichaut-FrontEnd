<script setup lang="ts">
import { useBedroomStore } from "~/store/bedroom";
import {z} from "zod";
import {computed, reactive} from "vue";
import type { FormSubmitEvent } from '#ui/types'
import {forEach} from "superjson/dist/util";

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const bedroomStore = useBedroomStore()

const columns = computed(() => {
  return [{
    key:'number',
    label: selectLangue.value.ref === 'En' ? 'Bedroom number' : 'Chambre numéro',
    sortable: true
  },{
    key:'updated_at_formatted',
    label: selectLangue.value.ref === 'En' ? 'Updated at' : 'Mise à jour le',
    sortable: true
  },{
    key:'bedroom_type.nameEn',
    label: selectLangue.value.ref === 'En' ? 'Bedroom Type' : 'Type de chambre'
  },{
    key: 'action',
    label: 'Action',
  }]
});

const items = row => [
  [{
    label: selectLangue.value.ref === 'En' ? 'Edit' : 'Modifier',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => openModalModify(row.id),
  },],[{
    label: selectLangue.value.ref === 'En' ? 'Delete' : 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click : () => deleteBedroom(row.id),
  }]
]


const dropdownBedroomType = [
  [{
    label: 'Tous',
    click : () => {q.value = ''}
  }],
  [{
    label: 'Royal Suite',
    click : () => {q.value = "Royal Suite"}
  }],
  [{
    label: 'Artichoke Suite',
    click : () => {q.value = "Artichoke Suite"}
  }],
  [{
    label: 'X Suite',
    click : () => {q.value = "X Suite"}
  }],
  [{
    label: 'Classic Bedroom',
    click : () => {q.value = "Classic Bedroom"}
  }]
]

const page = ref(1)
const pageCount = 10
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return bedroomStore.data.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }

  return bedroomStore.data.filter((person) => {
    const obj = Object.values(person).find(val => val?.nameEn);

    return obj?.nameEn.toLowerCase().includes(q.value.toLowerCase());
  }).slice((page.value - 1) * pageCount, (page.value) * pageCount);
});

// DELETE
async function deleteBedroom(id){
  await bedroomStore.deleteBedroom(id);
  reloadNuxtApp()
}

// modal Add //
const isOpen = ref(false)

const schema_bedroom = z.object({
  number: z.string(),
  bedroom_type_id: z.string(),
  picture: z.object({
    base64: z.string(),
    name: z.string(),
  }),
}).partial()

type Schema = z.output<typeof schema_bedroom>

const state_bedroom = reactive({
  number: undefined,
  bedroom_type_id: undefined,
  picture: undefined,
})

const bedroom_type_choice = [
  selectLangue?.ref === 'En' ? 'Royal Suite' : 'Suite Royal',
  selectLangue?.ref === 'En' ? 'Artichoke Suite' : 'Suite Artichaut',
  selectLangue?.ref === 'En' ? 'X suite' : 'Suite X',
  selectLangue?.ref === 'En' ? 'Classique Bedroom' : 'Chambre Classique',
]

const errorMessage = ref("");

async function onSubmitAdd(event: FormSubmitEvent<Schema>) {
  if (event.data.bedroom_type_id == 'Royal Suite' || event.data.bedroom_type_id == 'Suite Royal'){
    event.data.bedroom_type_id = 1;
  } if (event.data.bedroom_type_id == 'Artichoke Suite' || event.data.bedroom_type_id == 'Suite Artichaut'){
    event.data.bedroom_type_id = 2;
  } if (event.data.bedroom_type_id == 'X suite' || event.data.bedroom_type_id == 'Suite X'){
    event.data.bedroom_type_id = 3;
  } if (event.data.bedroom_type_id == 'Classique Bedroom' || event.data.bedroom_type_id == 'Chambre Classique'){
    event.data.bedroom_type_id = 4;
  }
  const exists = bedroomStore.data.some(bedroom => {
    if (event.data.number === bedroom.number) {
      errorMessage.value = "Une chambre avec ce numéro existe déjà";
      return true;
    }
    return false;
  });

  if (exists) return;

  await bedroomStore.addBedroom(event.data);
  reloadNuxtApp();
}

// modal modify //
const isOpenModify = ref(false)
const selectedBedroomType = ref(bedroom_type_choice[0])
let oldNUmber = 0;
console.log(bedroomStore.data2)

async function openModalModify(id){
  await bedroomStore.loadBedroomDataById(id);
  if (bedroomStore.data2){
    if (bedroomStore.data2.bedroom_type_id == 1){
      selectedBedroomType.value = bedroom_type_choice[0]
    } if (bedroomStore.data2.bedroom_type_id == 2){
      selectedBedroomType.value = bedroom_type_choice[1]
    } if (bedroomStore.data2.bedroom_type_id == 3){
      selectedBedroomType.value = bedroom_type_choice[2]
    } if (bedroomStore.data2.bedroom_type_id == 4){
      selectedBedroomType.value = bedroom_type_choice[3]
    }
  }
  isOpenModify.value = true
  oldNUmber = bedroomStore.data2.number
}

async function onSubmitModify(bedroom, selectedBedroomType){
  if (selectedBedroomType == 'Royal Suite' || selectedBedroomType == 'Suite Royal'){
    bedroom.bedroom_type_id = 1;
  } if (selectedBedroomType == 'Artichoke Suite' || selectedBedroomType == 'Suite Artichaut'){
    bedroom.bedroom_type_id = 2;
  } if (selectedBedroomType == 'X suite' || selectedBedroomType == 'Suite X'){
    bedroom.bedroom_type_id = 3;
  } if (selectedBedroomType == 'Classique Bedroom' || selectedBedroomType == 'Chambre Classique'){
    bedroom.bedroom_type_id = 4;
  }

  const exists = bedroomStore.data.some(bedroomForeach => {
    if (bedroom.number === bedroomForeach.number && bedroom.number != oldNUmber) {
      errorMessage.value = "Une chambre avec ce numéro existe déjà";
      return true;
    }
    return false;
  });

  if (exists) return;

  await bedroomStore.updateBedroomData(bedroom, bedroom.id);
  reloadNuxtApp()
}
</script>

<template>
  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'Bedroom' : 'Chambre'" class="text-3xl font-noto pb-4"></h1>
  </div>
  <div class="px-20 text-[0.8em]">
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UDropdown :items="dropdownBedroomType" mode="click" :popper="{ placement: 'bottom-start' }">
        <UButton v-model="q" color="white" :label="selectLangue?.ref === 'En' ? 'Filter by room type' : 'Filtrer par type de chambre'" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
      <UButton v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'" @click="isOpen = true" class="ml-[60%]"></UButton>
    </div>
    <UTable :columns="columns" :rows="filteredRows">
      <template #action-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="bedroomStore.data.length">
      </UPagination>
    </div>
  </div>

  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema_bedroom" :state="state_bedroom" @submit="onSubmitAdd">
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Number' : 'Numéro'" name="number" :error="errorMessage" required>
          <UInput v-model="state_bedroom.number"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Bedroom type' : 'Type de chambre'" name="bedroom_type_id" class="mt-2" required>
          <USelect v-model="state_bedroom.bedroom_type_id" :options="bedroom_type_choice" />
        </UFormGroup>

        <div class="flex justify-center mt-4">
          <UButton type="submit">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>

  <UModal v-model="isOpenModify">
    <div class="p-4">
      <UForm :schema="schema_bedroom" :state="state_bedroom" @submit="onSubmitModify(bedroomStore.data2, selectedBedroomType)">
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Number' : 'Numéro'" name="number" :error="errorMessage" required>
          <UInput v-model="bedroomStore.data2.number"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Bedroom type' : 'Type de chambre'" name="bedroom_type_id" class="mt-2" required>
          <USelect v-model="selectedBedroomType" :options="bedroom_type_choice" />
        </UFormGroup>

        <div class="flex justify-center mt-4">
          <UButton type="submit">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>

<style scoped></style>