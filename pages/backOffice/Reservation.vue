<script setup lang="ts">
import {useReservationStore} from "~/store/reservation";
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

</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'Reservations' : 'Réservations'" class="text-3xl font-noto pb-4"></h1>
    <UButton v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'"></UButton>
  </div>
  <div class="px-20">
    <UTable :columns="columns" :rows="reservationStore.data"/>
  </div>

</template>

<style scoped>

</style>