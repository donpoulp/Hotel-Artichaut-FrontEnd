<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const langue = useState('langue', () => [
  {
    name: 'English',
    icon: 'flag:gb-4x3',
    ref: 'En',
  },
  {
    name: 'Français',
    icon: 'flag:fr-4x3',
    ref: 'Fr',
  }
])

const selectedLangue = useState('selectedLangue', () => langue.value[0]) // Valeur par défaut

onMounted(() => {
  if (process.client) {
    const savedLangue = localStorage.getItem('selectedLangue')
    if (savedLangue) {
      selectedLangue.value = JSON.parse(savedLangue) // Récupérer la valeur stockée
    }
  }
})

watch(selectedLangue, (newValue) => {
  if (process.client) {
    localStorage.setItem('selectedLangue', JSON.stringify(newValue))
  }
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="route.fullPath"/>
    <UNotifications />
  </NuxtLayout>
</template>

<style>

@font-face {
  font-family: 'Noto Serif';
  src: url('/fonts/NotoSerif-VariableFont_wdth,wght.ttf') format('truetype');
}

@font-face {
  font-family: 'Antic Didone';
  src: url('fonts/AnticDidone-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Luxurious Script';
  src: url('fonts/LuxuriousScript-Regular.ttf') format('truetype');
}

</style>