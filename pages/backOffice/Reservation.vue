<script setup lang="ts">
// import { onMounted } from 'vue';
import {useReservationStore} from "~/store/reservation";
import {z} from 'zod'
import {reactive} from 'vue'
import type {FormSubmitEvent} from "#ui/types";
import {useServicesStore} from "~/store/services";

definePageMeta({
  layout: 'back-office',
})

const reservationStore = useReservationStore();
const serviceStore = useServicesStore();

onMounted(async () => {
  await reservationStore.loadReservationData();
  await serviceStore.loadServicesData();
});

const serviceList = serviceStore.data;
const selectedService = ref(serviceList[0]);

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

const items = row => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    // click: () => console.log('Edit', row.id)
    click: () => isOpen.value = true
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }],
]

const page = ref(1)
const pageCount = 10

async function onSubmitAdd(event: FormSubmitEvent<Schema>) {
  await reservationStore.addReservation(event.data);
  reloadNuxtApp()
}

import { sub, format, isSameDay, type Duration } from 'date-fns'

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}
</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 class="text-3xl font-noto pb-4"> Reservations </h1>
    <UButton @click="isOpen = true">Add new</UButton>
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

        <UFormGroup>
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid">
              {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
            </UButton>

            <template #panel="{ close }">
              <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                <div class="hidden sm:flex flex-col py-4">
                  <UButton
                      v-for="(range, index) in ranges"
                      :key="index"
                      :label="range.label"
                      color="gray"
                      variant="ghost"
                      class="rounded-none px-6"
                      :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                      truncate
                      @click="selectRange(range.duration)"
                  />
                </div>

                <DatePicker v-model="selected" @close="close" />
              </div>
            </template>
          </UPopover>
        </UFormGroup>

        <UFormGroup label="Start date">
          <UInput v-model="state_reservation.startDate"/>
        </UFormGroup>
        <UFormGroup label="End Date">
          <UInput v-model="state_reservation.endDate"/>
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

</template>

<style scoped>
</style>