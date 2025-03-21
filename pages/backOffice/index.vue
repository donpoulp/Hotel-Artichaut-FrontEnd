<script setup lang="ts">
definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');
</script>

<template>
  <section class="dashboard">
    <h2 v-text="selectLangue.ref === 'En' ? 'Dashboard' : 'Tableau de bord'"></h2>
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