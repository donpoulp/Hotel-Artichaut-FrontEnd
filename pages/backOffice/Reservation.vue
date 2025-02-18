<script setup lang="ts">
// import { onMounted } from 'vue';
import {useReservationStore} from "~/store/reservation";

definePageMeta({
  layout: 'back-office',
})

const reservationStore = useReservationStore();

onMounted(async () => {
  await reservationStore.loadReservationData();
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
  key: 'service',
  label: 'Services'
}, {
  key: 'startDate',
  label: 'Start date'
}, {
  key: 'endDate',
  label: 'End date'
}, {
  key: 'status',
  label: 'Status'
}, {
  key: 'action',
  label: 'Action',
}]

</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 class="text-3xl font-noto pb-4"> Reservations </h1>
    <UButton>Add new</UButton>
  </div>
  <div class="px-20">
    <UTable :columns="columns" :rows="reservationStore.data"/>
  </div>

</template>

<style scoped>

</style>