<script setup lang="ts">

const items = [
  [{
    label: 'Hero',
    to: '/backOffice/Hero',
  }], [{
    label: 'Strongest point',
    to: '/backOffice/Strongest',
    //class: 'bg-[#D8D27D] hover:bg-[#0D5649] hover:opacity-70 active:bg-[#0D5649] active:opacity-100 focus:outline-none focus:ring focus:ring-[#0D5649] focus-opacity-80'

  }], [{
    label: 'News',
    to : '/backOffice/News',

  }], [{
    label: 'Footer',
    to : '/backOffice/Footer',
  }]
]
</script>

<template>
  <UDropdown :items="items" :ui="{ background: 'bg-[#D8D27D]', width: 'w-[240px]', base: 'group flex-col flex items-center', ring: 'ring-white', trigger: 'inline-flex w-full', divide: 'divide-y divide-black-700 dark:divide-black-700', item: { active: 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'}}" :popper="{ offsetDistance: 27, placement: 'bottom' }">
    <UButton color="rgba(216, 210, 125, 0.5)" label="Pages" class="Ubutton"/>
  </UDropdown>
</template>

<style scoped>
.Ubutton{
  font-family: "Noto Serif", serif;
  font-weight: bold;
  font-size: 25px;
  color: #D8D27D;
}
</style>