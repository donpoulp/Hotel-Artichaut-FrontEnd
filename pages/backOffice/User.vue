<script setup lang="ts">
import {useUserStore} from "~/store/user";

definePageMeta({
  layout: 'back-office',
})

const userStore = useUserStore();

onMounted(async () => {
  await userStore.loadUserData();
});

const columns = [{
  key: 'id',
  title: 'ID',
}, {
  key: 'firstname',
  title: 'FirstName',
}, {
  key: 'lastname',
  title: 'LastName',
}, {
  key: 'email',
  title: 'Contact',
}, {
  key: 'emailBis',
  title: 'Contact2',
}, {
  key: 'phone',
  title: 'PhoneNumber',
}, {
  key: 'phoneBis',
  title: 'PhoneNumber2',
}, {
  key: 'actions',
  label: 'Actions',
}]

const isOpen = ref(false)

const items = row => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    // click: () => console.log('Edit', row.id)
    click: () => isOpen.value = true
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }],
]
</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 class="text-3xl font-noto pb-4"> Users </h1>
    <UButton>Add new</UButton>
  </div>
  <div class="px-20">
    <UTable :columns="columns" :rows="userStore.data">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
<!--  <UModal v-model="isOpen">-->
<!--    <div class="flex flex-col">-->
<!--      <UForm :schema="schema" :state="state">-->
<!--        <UFormGroup label="Bedroom">-->
<!--        </UFormGroup>-->
<!--        <UFormGroup label="User">-->
<!--        </UFormGroup>-->
<!--        <UFormGroup label="Services">-->
<!--        </UFormGroup>-->
<!--        <UFormGroup label="Start date">-->
<!--        </UFormGroup>-->
<!--        <UFormGroup label="End Date">-->
<!--        </UFormGroup>-->
<!--        <UFormGroup label="Status">-->
<!--        </UFormGroup>-->
<!--      </UForm>-->
<!--      &lt;!&ndash;      <Placeholder class="h-48" />&ndash;&gt;-->
<!--    </div>-->
<!--  </UModal>-->

</template>

<style scoped>
</style>