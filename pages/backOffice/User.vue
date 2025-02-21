<script setup lang="ts">
import {useUserStore} from "~/store/user";

definePageMeta({
  layout: 'back-office',
})

const userStore = useUserStore().data

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'firstName',
  label: 'First name'
}, {
  key: 'lastName',
  label: 'Last name'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'emailBis',
  label: 'email bis'
}, {
  key: 'phone',
  label: 'Phone'
}, {
  key: 'phoneBis',
  label: 'Phone bis',
}, {
  key: 'role',
  label: 'Role',
}, {
  key: 'created_at',
  label: 'Created_at',
}, {
  key: 'updated_at',
  label: 'Updated_at',
}]

const selectedColumns = ref(columns.filter(col => ['id', 'firstName', 'lastName', 'email', 'phone'].includes(col.key)))

//pagination//

//const rows = computed(() => {
  //return userStore.slice((page.value - 1) * pageCount, (page.value) * pageCount)
//})

//shearchBar//
const page = ref(1)
const pageCount = 10
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return userStore.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }

  return userStore.slice((page.value - 1) * pageCount, (page.value) * pageCount).filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())

    })
  })
})
console.log(filteredRows)
</script>


<template>
  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 class="text-3xl font-noto pb-4"> User </h1>
    <UButton>Add new</UButton>
  </div>
  <div class="px-20">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="mr-4 w-[15%]"/>
      <UInput v-model="q" placeholder="Filter user..." />
    </div>
    <UTable :columns="selectedColumns" :rows="filteredRows"></UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="userStore.length" />
    </div>
  </div>
</template>


<style scoped>

</style>