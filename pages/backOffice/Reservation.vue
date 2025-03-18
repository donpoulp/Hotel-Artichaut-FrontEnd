<script setup lang="ts">
// import { onMounted } from 'vue';
import {useReservationStore} from "~/store/reservation";
import { z } from 'zod'
import { reactive } from 'vue'

definePageMeta({
  layout: 'back-office',
})

const reservationStore = useReservationStore();

onMounted(async () => {
  await reservationStore.loadReservationData();
});

const schema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  user_id: z.number(),
  bedroom_id: z.number(),
  state: z.string(),
  // services
});

const state = reactive({
  startDate: undefined,
  endDate: undefined,
  user_id: undefined,
  bedroom_id: undefined,
  state: undefined,
  //services
})

// transform data to display names of services
const transformedReservations = computed(() => {
  return reservationStore.data.map(reservation => {
    const serviceNames = reservation.services.map(service => service.name).join(', ');
    return {
      ...reservation,
      serviceNames
    };
  });
});

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
</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 class="text-3xl font-noto pb-4"> Reservations </h1>
    <UButton>Add new</UButton>
  </div>
  <div class="px-20">
    <UTable :columns="columns" :rows="transformedReservations">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
  <UModal v-model="isOpen">
    <div class="flex flex-col">
      <UForm :schema="schema" :state="state">
      <UFormGroup label="Bedroom">
      </UFormGroup>
      <UFormGroup label="User">
      </UFormGroup>
      <UFormGroup label="Services">
      </UFormGroup>
      <UFormGroup label="Start date">
      </UFormGroup>
      <UFormGroup label="End Date">
      </UFormGroup>
      <UFormGroup label="Status">
      </UFormGroup>
      </UForm>
<!--      <Placeholder class="h-48" />-->
    </div>
  </UModal>

</template>

<style scoped>
</style>