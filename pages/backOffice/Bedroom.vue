<template>
    <UTable :rows="rows" :ui="{wrapper:'mx-auto text-white', th: {
      base: 'text-center rtl:text-right font-antic !text-[2em]'},
      td: {
    base: 'whitespace-nowrap text-center !text-[1.5em]'}
       }"">
        
    </UTable>

    <UPagination v-model="page" :page-count="pageCount" :total="$bedroom.data.length" :ui="{
    wrapper: 'flex items-center -space-x-px justify-center w-full'
  }"></UPagination>
  
    
</template>

<script setup>
import { useBedroomStore } from "~/store/bedroom";

const bedroom = useBedroomStore()

const page = ref(1)
const pageCount = 10

const rows = computed(() => {
  return bedroom.data.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

definePageMeta({
  layout: 'back-office',
})

</script>

<style scoped>

</style>