<script setup lang="ts">
import {useServicesStore} from "~/store/services";
import {computed, reactive} from "vue";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
})

const selectLangue = useState('selectedLangue');

const servicesStore = useServicesStore()

const columns = computed(() => {
  if (selectLangue.value?.ref == "En") {
    return [{
      key: 'id',
      label: 'ID'
    }, {
      key: 'nameEn',
      label: 'name',
      sortable: true
    }, {
      key: 'duration',
      label: 'duration',
      sortable: true
    }, {
      key: 'price',
      label: 'price',
      sortable: true
    }, {
      key: 'quantity',
      label: 'quantity',
      sortable: true
    }, {
      key: 'time',
      label: 'time',
      sortable: true
    }, {
      key: 'created_at_formatted',
      label: 'Created_at',
      sortable: true
    }, {
      key: 'updated_at_formatted',
      label: 'Updated_at',
      sortable: true
    }, {
      key: 'action',
      label: 'Action',
    }]
  } else if (selectLangue.value?.ref == "Fr") {
    return [{
      key: 'id',
      label: 'ID'
    }, {
      key: 'nameFr',
      label: 'nom',
      sortable: true
    }, {
      key: 'duration',
      label: 'durée',
      sortable: true
    }, {
      key: 'price',
      label: 'prix',
      sortable: true
    }, {
      key: 'quantity',
      label: 'quantité',
      sortable: true
    }, {
      key: 'time',
      label: 'temps',
      sortable: true
    }, {
      key: 'created_at_formatted',
      label: 'Crée en',
      sortable: true
    }, {
      key: 'updated_at_formatted',
      label: 'Mise à jour le',
      sortable: true
    }, {
      key: 'action',
      label: 'Action',
    }]
  }
});

const items = row => [
  [{
    label: selectLangue.value.ref === 'En' ? 'Edit' : 'Modifier',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => openModalModify(row.id),
  }], [{
    label: selectLangue.value.ref === 'En' ? 'Delete' : 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteService(row.id),
  }]
]

const selectedColumns = ref([]);

watch(columns, (newColumns) => {
  selectedColumns.value = newColumns.filter((col) =>
      ["id", selectLangue.value.ref === "En" ? "nameEn" : "nameFr", "price", "duration", "quantity", "time", "updated_at_formatted", "action"].includes(col.key)
  );
}, { immediate: true });

const isOpen = ref(false);

const schema_service = z.object({
  nameEn: z.string(),
  nameFr: z.string(),
  descriptionEn: z.string(),
  descriptionFr: z.string(),
  duration: z.string(),
  price: z.string(),
  quantity: z.string(),
  time: z.string(),
  backgroundText_color_1: z.string(),
  backgroundText_opacity_1: z.string(),
  backgroundText_color_2: z.string(),
  backgroundText_opacity_2: z.string(),
  picture: z.object({
    base64: z.string(),
    name: z.string(),
  }),
}).partial()

type Schema = z.output<typeof schema_service>

const state_service = reactive({
  nameEn: undefined,
  nameFr: undefined,
  descriptionEn: undefined,
  descriptionFr: undefined,
  duration: undefined,
  price: undefined,
  quantity: undefined,
  time: undefined,
  picture: undefined,
  backgroundText_color_1: undefined,
  backgroundText_opacity_1: undefined,
  backgroundText_color_2: undefined,
  backgroundText_opacity_2: undefined,
})

async function onSubmitAdd(event: FormSubmitEvent<Schema>) {
  if (event.data.backgroundText_color_1 == undefined){
    event.data.backgroundText_color_1 = "#D8D27D"
  }
  if (event.data.backgroundText_color_2 == undefined){
    event.data.backgroundText_color_2 = "#726F42"
  }
  if (event.data.backgroundText_opacity_1 == undefined){
    event.data.backgroundText_opacity_1 = "30"
  }
  if (event.data.backgroundText_opacity_2 == undefined){
    event.data.backgroundText_opacity_2 = "100"
  }
  const formData = {
    id: event.data.id,
    nameFr: event.data.nameFr,
    nameEn: event.data.nameEn,
    descriptionEn: event.data.descriptionEn,
    descriptionFr: event.data.descriptionFr,
    duration: event.data.duration,
    price: event.data.price,
    quantity: event.data.quantity,
    time: event.data.time,
    backgroundText_color_1: event.data.backgroundText_color_1,
    backgroundText_opacity_1: event.data.backgroundText_opacity_1,
    backgroundText_color_2: event.data.backgroundText_color_2,
    backgroundText_opacity_2: event.data.backgroundText_opacity_2,
    picture: state_service.picture,
  };
  await servicesStore.addServiceData(formData);
  reloadNuxtApp()
}

async function deleteService(id){
  await servicesStore.deleteServiceData(id);
  reloadNuxtApp()
}

const isOpen2 = ref(false);

async function openModalModify(id){
  await servicesStore.loadServicesByIdData(id);
  isOpen2.value = true;
}

async function onSubmitModify(service) {
  if (service.backgroundText_color_1 == undefined){
    service.backgroundText_color_1 = "#D8D27D"
  }
  if (service.backgroundText_color_2 == undefined){
    service.backgroundText_color_2 = "#726F42"
  }
  if (service.backgroundText_opacity_1 == undefined){
    service.backgroundText_opacity_1 = "30"
  }
  if (service.backgroundText_opacity_2 == undefined){
    service.backgroundText_opacity_2 = "100"
  }
  const formData = {
    id: service.id,
    nameFr: service.nameFr,
    nameEn: service.nameEn,
    descriptionEn: service.descriptionEn,
    descriptionFr: service.descriptionFr,
    duration: service.duration,
    price: service.price,
    quantity: service.quantity,
    time: service.time,
    backgroundText_color_1: service.backgroundText_color_1,
    backgroundText_opacity_1: service.backgroundText_opacity_1,
    backgroundText_color_2: service.backgroundText_color_2,
    backgroundText_opacity_2: service.backgroundText_opacity_2,
    picture: state_service.picture,
  };
  await servicesStore.updateServiceData(formData);
  reloadNuxtApp()
}

const handleFileUpload = (event) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      state_service.picture = {'base64': base64Image, 'name': file.name};
      console.log(state_service.picture)
    };
    reader.readAsDataURL(file);
  }
};

console.log(servicesStore.data)
</script>

<template>
  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'Service' : 'Service'" class="text-3xl font-noto pb-4"></h1>
  </div>
  <div class="px-20">
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="mr-4 w-[15%]"/>
      <UButton v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'" @click="isOpen = true" class="ml-[60%]"></UButton>
    </div>
    <UTable :columns="selectedColumns" :rows="servicesStore.data">

      <template #action-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>

  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema_service" :state="state_service" @submit="onSubmitAdd">
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'name in English' : 'nom en Anglais'" name="name" class="mt-3" required>
          <UInput v-model="state_service.nameEn"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'name in French' : 'nom en Français'" name="name" class="mt-3" required>
          <UInput v-model="state_service.nameFr"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'description in English' : 'description en Anglais'" name="description" class="mt-3" required>
          <UTextarea v-model="state_service.descriptionEn"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'description in French' : 'description en Français'" name="description" class="mt-3" required>
          <UTextarea v-model="state_service.descriptionFr"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Price' : 'Prix'" name="price" class="mt-3" required>
          <UInput v-model="state_service.price"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Quantity' : 'Quantité'" name="quantity" class="mt-3" required>
          <UInput v-model="state_service.quantity"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Time' : 'Temps'" name="time" class="mt-3" required>
          <UInput v-model="state_service.time"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Duration' : 'Durée'" name="duration" class="mt-3" required>
          <UInput v-model="state_service.duration"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Picture' : 'Photo'" name="picture" class="mt-3">
          <UInput type="file" @change="handleFileUpload($event)"/>
        </UFormGroup>

        <div class="flex justify-center mt-4">
          <UButton type="submit">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>

  <UModal v-model="isOpen2">
    <div class="p-4">
      <UForm :schema="schema_service" :state="state_service" @submit="onSubmitModify(servicesStore.data2)">
        <UFormGroup :label="selectLangue?.ref === 'En' ? 'name in English' : 'nom en Anglais'" name="name" class="mt-3" required>
          <UInput v-model="servicesStore.data2.nameEn"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'name in French' : 'nom en Français'" name="name" class="mt-3" required>
          <UInput v-model="servicesStore.data2.nameFr"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'description in English' : 'description en Anglais'" name="description" class="mt-3" required>
          <UTextarea v-model="servicesStore.data2.descriptionEn"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'description in French' : 'description en Français'" name="description" class="mt-3" required>
          <UTextarea v-model="servicesStore.data2.descriptionFr"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Price' : 'Prix'" name="price" class="mt-3" required>
          <UInput v-model="servicesStore.data2.price"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Quantity' : 'Quantité'" name="quantity" class="mt-3" required>
          <UInput v-model="servicesStore.data2.quantity"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Time' : 'Temps'" name="time" class="mt-3" required>
          <UInput v-model="servicesStore.data2.time"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Duration' : 'Durée'" name="duration" class="mt-3" required>
          <UInput v-model="servicesStore.data2.duration"/>
        </UFormGroup>

        <UFormGroup :label="selectLangue?.ref === 'En' ? 'Picture' : 'Photo'" name="picture" class="mt-3">
          <UInput type="file" icon="i-heroicons-folder" @change="handleFileUpload($event)"/>
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

<style scoped>

</style>