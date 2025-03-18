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
      label: 'Bedroom'
    }, {
      key: 'user_id',
      label: 'User'
    }, {
      key: 'service',
      label: 'Services'
    }, {
      key: 'startDate',
      label: 'Start date'
    }, {
      key: 'endDate',
      label: 'End date'
    }, {
      key: 'status_id',
      label: 'Status'
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
      label: 'Chambre'
    }, {
      key: 'user_id',
      label: 'Utilisateur'
    }, {
      key: 'service',
      label: 'Services'
    }, {
      key: 'startDate',
      label: 'Date de début'
    }, {
      key: 'endDate',
      label: 'Date de fin'
    }, {
      key: 'status_id',
      label: 'Status'
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