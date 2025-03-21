<script setup lang="ts">
// import { onMounted } from 'vue';
import {useReservationStore} from "~/store/reservation";
import { z } from 'zod'
import { reactive } from 'vue'
import {computed} from "vue";
import type {FormSubmitEvent} from "#ui/types";
import {useServicesStore} from "~/store/services";
import { format } from 'date-fns'

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const reservationStore = useReservationStore();
const serviceStore = useServicesStore();

onMounted(async () => {
  await reservationStore.loadReservationData();
  await serviceStore.loadServicesData();
});

const serviceList = serviceStore.data;
const selectedService = ref(serviceList[0]);

const columns = computed(() => {
  console.log(reservationStore.data)
  if (selectLangue.value?.ref == "En") {
    return [{
      key: 'id',
      label: 'ID'
    }, {
      key: 'bedroom_id',
      label: 'Bedroom',
      sortable: true
    }, {
      key: 'user_id',
      label: 'User',
      sortable: true
    }, {
      key: 'service',
      label: 'Services',
      sortable: true
    }, {
      key: 'startDate',
      label: 'Start date',
      sortable: true
    }, {
      key: 'endDate',
      label: 'End date',
      sortable: true
    }, {
      key: 'status_id',
      label: 'Status',
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
      key: 'bedroom_id',
      label: 'Chambre',
      sortable: true
    }, {
      key: 'user_id',
      label: 'Utilisateur',
      sortable: true
    }, {
      key: 'service',
      label: 'Services',
      sortable: true
    }, {
      key: 'startDate',
      label: 'Date de début',
      sortable: true
    }, {
      key: 'endDate',
      label: 'Date de fin',
      sortable: true
    }, {
      key: 'status_id',
      label: 'Status',
      sortable: true
    }, {
      key: 'action',
      label: 'Action',
    }]
  }
});

const schema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  user_id: z.number(),
  bedroom_id: z.number(),
  state: z.string(),
  services: z.string(),
});

type Schema = z.output<typeof schema>

const state_reservation = reactive({
  startDate: undefined,
  endDate: undefined,
  user_id: undefined,
  bedroom_id: undefined,
  state: undefined,
  services: undefined,
})

// transform data to display names of services
const transformedReservations = computed(() =>
    reservationStore.data.map(reservation => {
      const serviceNames = reservation.services.map(service => service.nameFr).join(', ');
      return {
        ...reservation,
        serviceNames
      };
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount));

//to select service in add reservation
const serviceNamesSelect = computed(() => serviceStore.data.map(service => service.nameFr));

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'bedroom',
  label: 'Bedroom'
}, {
  key: 'user_id',
  label: 'User'
}, {
  key: 'serviceNames',
  label: 'Services'
}, {
  key: 'startDate',
  label: 'Start date'
}, {
  key: 'endDate',
  label: 'End date'
}, {
  key: 'state',
  label: 'Status'
}, {
  key: 'actions',
  label: 'Actions',
}]

const isOpen = ref(false)
const isOpenModify = ref(false)

const items = row => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => openModalModify(row.id)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteReservation(row.id)
  }],
]

async function onSubmitAdd(event: FormSubmitEvent<Schema>) {
  await reservationStore.addReservation(event.data);
  reloadNuxtApp()
}

async function deleteReservation(id) {
  await reservationStore.deleteReservation(id);
  reloadNuxtApp()
}

async function openModalModify(id) {
  await reservationStore.loadReservationDataById(id);
  isOpenModify.value = true
}

async function onSubmitModify(reservation) {
  await reservationStore.updateReservation(reservation)
  reloadNuxtApp()
}

const page = ref(1)
const pageCount = 10
</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'Reservations' : 'Réservations'" class="text-3xl font-noto pb-4"></h1>
    <UButton @click="isOpen = true" v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'"></UButton>
  </div>
  <div class="px-20">
    <UTable :columns="columns" :rows="transformedReservations">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid"/>
        </UDropdown>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="reservationStore.data.length" />
    </div>
  </div>
  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema" :state="state_reservation" @submit="onSubmitAdd" class="space-y-2">
        <UFormGroup label="Bedroom">
          <UInput v-model="state_reservation.bedroom_id"/>
        </UFormGroup>
        <UFormGroup label="User">
          <UInput v-model="state_reservation.user_id"/>
        </UFormGroup>
        <UFormGroup label="Services">
          <USelect v-model="selectedService" :options="serviceNamesSelect"/>
        </UFormGroup>
        <UFormGroup label="Start date">
          <UInput type="date" v-model="state_reservation.startDate"/>
        </UFormGroup>
        <UFormGroup label="End Date">
          <UInput type="date" v-model="state_reservation.endDate"/>
        </UFormGroup>
        <UFormGroup label="Status">
          <UInput v-model="state_reservation.state"/>
        </UFormGroup>
      </UForm>
      <div class="flex justify-center mt-4">
        <UButton type="submit">
          Confirm
        </UButton>
      </div>
    </div>
  </UModal>

  <UModal v-model="isOpenModify">
    <div class="p-4">
      <UForm :schema="schema" :state="state_reservation" @submit="onSubmitModify(reservationStore.data[0])" class="space-y-2">
        <UFormGroup label="Bedroom">
          <UInput v-model="reservationStore.data[0].bedroom_id"/>
        </UFormGroup>
        <UFormGroup label="User">
          <UInput v-model="reservationStore.data[0].user_id"/>
        </UFormGroup>
        <UFormGroup label="Services">
          <USelect v-model="selectedService" :options="serviceNamesSelect"/>
        </UFormGroup>
        <UFormGroup label="Start date">
          <UInput type="date" v-model="reservationStore.data[0].startDate"/>
        </UFormGroup>
        <UFormGroup label="End Date">
          <UInput type="date" v-model="reservationStore.data[0].endDate"/>
        </UFormGroup>
        <UFormGroup label="Status">
          <UInput v-model="reservationStore.data[0].status_id"/>
        </UFormGroup>
      </UForm>
      <div class="flex justify-center mt-4">
        <UButton type="submit">
          Confirm
        </UButton>
      </div>
    </div>
  </UModal>

</template>

<style scoped>
</style>