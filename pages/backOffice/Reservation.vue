<script setup lang="ts">
// import { onMounted } from 'vue';
import {useReservationStore} from "~/store/reservation";
import { z } from 'zod'
import { reactive } from 'vue'
import {computed} from "vue";

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

const reservationStore = useReservationStore();

onMounted(async () => {
  await reservationStore.loadReservationData();
});

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
</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'Reservations' : 'Réservations'" class="text-3xl font-noto pb-4"></h1>
    <UButton v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'"></UButton>
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

</template>

<style scoped>

</style>