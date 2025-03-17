<template>
    <UTable :columns="columns" :rows="rows" :ui="{wrapper:'mx-auto text-white h-[80vh]', th: {
      base: 'text-center rtl:text-right font-antic !text-[2em] '},
      td: {
    base: 'whitespace-nowrap text-center !text-[1.5em]'}
       }"">
        <template #name-data="{ row }">
      <span :class="[selected.find(bedroom => bedroom.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        <UModal v-model="openEditModal" :overlay="false" :ui="{width: '!max-w-[50vw]' }">
          
    </UModal>
      </UDropdown>
    </template>
    </UTable>

    <UPagination v-model="page" :page-count="pageCount" :total="$bedroom.data.length" :ui="{
    wrapper: 'flex items-center -space-x-px justify-center w-full'
  }"></UPagination>


    
</template>

<script setup>
import { useBedroomStore } from "~/store/bedroom";


definePageMeta({
  layout: 'back-office',
})

const openEditModal = ref(false)

const bedroom = useBedroomStore()

const page = ref(1)
const pageCount = 10

const rows = computed(() => {

  const processedData = bedroom.data.map(bedroom => {

        return {
            ...bedroom,
            bedroom_type: bedroom.bedroom_type.name,
            created_at: new Date(bedroom.created_at).toLocaleString("fr-EU", {timeZone: 'UTC'}),
            updated_at: new Date(bedroom.updated_at).toLocaleString("fr-EU", {timeZone: 'UTC'}),
        }
    })

  return processedData.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const columns = [{
  key:'id',
  label:'ID de la chambre'
},{
  key:'number',
  label:'Numéro de la chambre'
},{
  key:'updated_at',
  label:'Mis à jour le'
},{
  key:'bedroom_type',
  label:'Type de Chambre'
},{
  key:'actions'
}]

const items = row => [
  [{
    label: 'Modifier',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => { openEditModal.value = true
      bedroom.updateBedroomData(bedroom, row.id)
      bedroom.loadBedroomData()
    }
  },],[{
    label: 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click : async () => {
      await bedroom.deleteBedroomData(row.id)
      bedroom.loadBedroomData()
    } 
  }]
]

const selected = ref([bedroom[1]])

</script>

<style scoped>

</style>