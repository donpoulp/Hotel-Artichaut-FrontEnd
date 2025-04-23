<script setup lang="ts">
import {useDashboardStore} from "~/store/dashboard";
import ReservationChart from "~/components/backOffice/ReservationChart.vue";
import {useAuthStore} from "~/store/auth";

const selectLangue = useState('selectedLangue');
const dashboardStore = useDashboardStore()
const authStore = useAuthStore()

authStore.hydrateStore();

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
})

onMounted(async () => {
  await dashboardStore.loadReservationsPerMonthData();
  console.log("dddd", dashboardStore.data);
});

</script>

<template>
  <section class="dashboard">
    <h2 v-text="selectLangue.ref === 'En' ? 'Dashboard' : 'Tableau de bord'"></h2>

    <div v-if="dashboardStore.isLoading">
      Chargement des données...
    </div>

    <ReservationChart v-if="!dashboardStore.isLoading" :stats="dashboardStore.data" />
  </section>
</template>

<style scoped>
.dashboard{
  padding: 3%;
}
.dashboard h2{
  font-size: 40px;
  font-weight: bold;
}
</style>