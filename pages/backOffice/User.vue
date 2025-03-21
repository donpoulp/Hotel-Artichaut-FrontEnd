<script setup lang="ts">
import {useUserStore} from "~/store/user";
import {z} from "zod";
import {computed, reactive} from "vue";
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'back-office',
})

const selectLangue = useState('selectedLangue');

// On instancie Le User Store ou l'on ira chercher les requetes SQL
const userStore = useUserStore()

// On instancie les columns pour le Tableau nuxt
const columns = computed(() => {
  if (selectLangue.value?.ref == "En") {
    return [{
      key: 'id',
      label: 'ID'
    }, {
      key: 'firstName',
      label: 'First name',
      sortable: true
    }, {
      key: 'lastName',
      label: 'Last name',
      sortable: true
    }, {
      key: 'email',
      label: 'Email',
      sortable: true
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
      sortable: true
    }, {
      key: 'created_at',
      label: 'Created_at',
      sortable: true
    }, {
      key: 'updated_at',
      label: 'Updated_at',
      sortable: true
    }, {
      key: 'action',
      label: 'Action',
    }]
  } else if (selectLangue.value?.ref == "Fr") {
    return [{
      key: 'id',
      label: 'ID'
    }, {
      key: 'firstName',
      label: 'Prénom',
      sortable: true
    }, {
      key: 'lastName',
      label: 'Nom',
      sortable: true
    }, {
      key: 'email',
      label: 'E-mail',
      sortable: true
    }, {
      key: 'emailBis',
      label: 'E-mail bis'
    }, {
      key: 'phone',
      label: 'Télephone'
    }, {
      key: 'phoneBis',
      label: 'Télephone bis',
    }, {
      key: 'role',
      label: 'Role',
      sortable: true
    }, {
      key: 'created_at',
      label: 'Crée le',
      sortable: true
    }, {
      key: 'updated_at',
      label: 'Mise a jour le',
      sortable: true
    }, {
      key: 'action',
      label: 'Action',
    }]
  }
});

// Modal Modify User
const isOpenModify = ref(false)

const items = row => [
  [{
    label: selectLangue.value.ref === 'En' ? 'Edit' : 'Modifier',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => openModalModify(row.id),
  }], [{
    label: selectLangue.value.ref === 'En' ? 'Delete' : 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteUser(row.id),
  }]
]

async function openModalModify(id){
  await userStore.loadUserDataById(id);
  isOpenModify.value = true
}

async function onSubmitModify(user){
  await userStore.updateUserData(user)
  reloadNuxtApp()
}

// DELETE
async function deleteUser(id){
  await userStore.deleteUserData(id);
  reloadNuxtApp()
}

// Selected Column par default
const selectedColumns = ref([]);

watch(columns, (newColumns) => {
  selectedColumns.value = newColumns.filter((col) =>
      ["id", "firstName", "lastName", "email", "phone", "action"].includes(col.key)
  );
}, { immediate: true });

// Shearch Bar//
const page = ref(1)
const pageCount = 10
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return userStore.data.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }

  return userStore.data.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())

    })
  })
})

// modal Add //
const isOpen = ref(false)
const isActiveMail = ref(false)
const isActivePhone = ref(false)

const schema_user = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email('Invalid email'),
  emailBis: z.string(),
  password: z.string(),
  phone: z.string(),
  phoneBis: z.string(),
  role: z.string(),
}).partial()

type Schema = z.output<typeof schema_user>

const state_user = reactive({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  emailBis: undefined,
  password: undefined,
  phone: undefined,
  phoneBis: undefined,
  role: undefined,
})

async function onSubmitAdd(event: FormSubmitEvent<Schema>) {
    await userStore.addUserData(event.data);
    reloadNuxtApp()
}

function displayMailBis(){
  let mailBis = document.querySelector(".emailBis").style.display;
  if (mailBis == "none") {
    document.querySelector(".emailBis").style.display = "block"
    isActiveMail.value = true
  }else{
    document.querySelector(".emailBis").style.display = "none"
    isActiveMail.value = false
  }
}
function displayPhoneBis(){
  let phoneBis = document.querySelector(".phoneBis").style.display;
  if (phoneBis == "none") {
    document.querySelector(".phoneBis").style.display = "block"
    isActivePhone.value = true
  }else{
    document.querySelector(".phoneBis").style.display = "none"
    isActivePhone.value = false
  }
}

// Modal Add - select
const selected_role = [0, 1, 2]
const select = ref(selected_role[0])

</script>


<template>
  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'User' : 'Utilisateur'" class="text-3xl font-noto pb-4"></h1>
  </div>
  <div class="px-20">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="mr-4 w-[15%]"/>
      <UInput v-model="q" :placeholder="selectLangue?.ref === 'En' ? 'Filter user...' : 'Filtrer l\'utilisateur...'" />
      <UButton v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'" @click="isOpen = true" class="ml-[60%]"></UButton>
    </div>
    <UTable :columns="selectedColumns" :rows="filteredRows">

      <template #action-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="userStore.data.length" />
    </div>
  </div>

  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema_user" :state="state_user" @submit="onSubmitAdd">
        <UFormGroup label="firstName" name="firstName">
          <UInput v-model="state_user.firstName"/>
        </UFormGroup>

        <UFormGroup label="lastName" name="lastName" class="mt-2">
          <UInput v-model="state_user.lastName"/>
        </UFormGroup>

        <UFormGroup label="email" name="email" class="mt-2">
          <UInput v-model="state_user.email"/>
        </UFormGroup>

        <UFormGroup label="emailBis" name="emailBis" class="emailBis mt-2" style="display: none">
          <UInput v-model="state_user.emailBis"/>
        </UFormGroup>
        <UButton class="btn_phone mt-2" size="sm" color="primary" square variant="solid" @click="displayMailBis()">
          <UIcon :name="isActiveMail ? 'material-symbols:remove' : 'material-symbols:add'"/>
        </UButton>

        <UFormGroup label="password" name="password" class="mt-2">
          <UInput v-model="state_user.password"/>
        </UFormGroup>

        <UFormGroup label="phone" name="phone" class="mt-2">
          <UInput v-model="state_user.phone"/>
        </UFormGroup>

        <UFormGroup label="phoneBis" name="phoneBis" class="phoneBis mt-2" style="display: none">
          <UInput v-model="state_user.phoneBis"/>
        </UFormGroup>
        <UButton class="btn_phone mt-2" size="sm" color="primary" square variant="solid" @click="displayPhoneBis()">
          <UIcon :name="isActivePhone ? 'material-symbols:remove' : 'material-symbols:add'"/>
        </UButton>

        <UFormGroup label="role" name="role" class="mt-2">
          <USelect v-model="select" :options="selected_role" />
        </UFormGroup>

        <div class="flex justify-center mt-4">
          <UButton type="submit">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>

  <UModal v-model="isOpenModify">
    <div class="p-4">
      <UForm :schema="schema_user" :state="state_user" @submit="onSubmitModify(userStore.data2[0])">
        <UFormGroup label="firstName" name="firstName">
          <UInput v-model="userStore.data2[0].firstName"/>
        </UFormGroup>

        <UFormGroup label="lastName" name="lastName" class="mt-2">
          <UInput v-model="userStore.data2[0].lastName"/>
        </UFormGroup>

        <UFormGroup label="email" name="email" class="mt-2">
          <UInput v-model="userStore.data2[0].email"/>
        </UFormGroup>

        <UFormGroup v-if="userStore.data2[0].emailBis != undefined" label="emailBis" name="emailBis" class="mt-2">
          <UInput v-model="userStore.data2[0].emailBis"/>
        </UFormGroup>

        <UFormGroup label="phone" name="phone" class="mt-2">
          <UInput v-model="userStore.data2[0].phone"/>
        </UFormGroup>

        <UFormGroup v-if="userStore.data2[0].phoneBis != undifined" label="phoneBis" name="phoneBis" class="mt-2">
          <UInput v-model="userStore.data2[0].phoneBis"/>
        </UFormGroup>

        <UFormGroup label="role" name="role" class="mt-2">
          <USelect v-model="select" :options="selected_role" />
        </UFormGroup>

        <div class="flex justify-center mt-4">
          <UButton type="submit">
            Valider
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>


<style scoped>

</style>