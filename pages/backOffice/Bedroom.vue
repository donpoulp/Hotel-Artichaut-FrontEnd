<template>
    <UTable :rows="rows" :ui="{wrapper:'w-[500px] mx-auto'}"">
        
    </UTable>

    <UPagination v-model="page" :page-count="pageCount" :total="$bedroom.data.length"></UPagination>
  
    
</template>

<script setup>
import { useBedroomStore } from "~/store/bedroom";

const bedroom = useBedroomStore()

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return bedroom.data.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

definePageMeta({
  layout: 'back-office',
})

</script>

<style scoped>
.bedroom {
    color: white;
}
</style>