<script setup lang="ts">
import {useReservationStore} from "~/store/reservation";
import { z } from 'zod'
import {computed, reactive} from "vue";
import type {FormSubmitEvent} from "#ui/types";
import {useServicesStore} from "~/store/services";
import { format } from 'date-fns'
import {useBedroomTypeStore} from "~/store/bedroom-type";
import {useUserStore} from "~/store/user";

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
})

const selectLangue = useState('selectedLangue');

const reservationStore = useReservationStore();
const serviceStore = useServicesStore();
const bedroomTypeStore = useBedroomTypeStore();
const userStore = useUserStore()

onMounted(async () => {
  await reservationStore.loadReservationData();
  await serviceStore.loadServicesData();
  await userStore.loadUserData();
});

const serviceList = serviceStore.data;
const selectedService = ref([]);
const selectedServiceM = ref([])
const serviceTab = computed(() =>
    serviceList.map(service => (service[`name${selectLangue?.value.ref}`])),
);

const bedroomTypeList = bedroomTypeStore.data;
const selectedBedroomType = ref(bedroomTypeList[0]);
const bedroomTypeNamesSelect = computed(() =>
    bedroomTypeStore.data.map(bedroomType => ({
      label: `${bedroomType.id} - ${bedroomType[`name${selectLangue?.value.ref}`]}`,
      value: bedroomType.id
    }))
);

const userList = userStore.data;
const selectedUser = ref(userList[0]);
const userNameSelect = computed(() =>
    userStore.data.map(user => ({
      label: `${user.id} - ${user.firstName} ${user.lastName}`,
      value: user.id
    }))
);

const roles = {
  0: 'Canceled',
  1: 'Paid',
  2: 'Pending'
};
const selected_role = [0 , 1, 2]
const select = ref(null);
const options = selected_role.map(roleId => ({
  label: `${roleId} - ${roles[roleId]}`,
  value: roleId
}));


const columns = computed(() => {
  if (selectLangue.value?.ref == "En") {
    return [{
      key: 'id',
      label: 'ID'
    }, {
      key: 'bedroom_type.nameEn',
      label: 'Bedroom type',
      sortable: true
    }, {
      key: 'user_id',
      label: 'User',
      sortable: true
    }, {
      key: 'services',
      label: 'Services',
      sortable: true
    }, {
      key: 'startDate',
      label: 'Start date',
      sortable: true
    }, {
      key: 'endDate',
      label: 'End date',
      sortable: true
    }, {
      key: 'status_id',
      label: 'Status',
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
      key: 'bedroom_type.nameFr',
      label: 'Type de chambre',
      sortable: true
    }, {
      key: 'user_id',
      label: 'Utilisateur',
      sortable: true
    }, {
      key: 'services',
      label: 'Services',
      sortable: true
    }, {
      key: 'startDate',
      label: 'Date de début',
      sortable: true
    }, {
      key: 'endDate',
      label: 'Date de fin',
      sortable: true
    }, {
      key: 'status_id',
      label: 'Status',
      sortable: true
    }, {
      key: 'action',
      label: 'Action',
    }]
  }
});

const schema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  user_id: z.number(),
  bedroom_id: z.number(),
  state: z.string(),
  services: z.string(),
});

const state_reservation = reactive({
  startDate: undefined,
  endDate: undefined,
  user_id: undefined,
  bedroom_type_id: undefined,
  state: undefined,
  services: undefined,
})

function selectBedroomTypeChange(id){
  state_reservation.bedroom_type_id = id;
}

function selectUserChange(id){
  state_reservation.user_id = id;
}

function selectServicesChange(id){
  state_reservation.services = id
}

function selectStatusChange(id){
  state_reservation.state = id
}

const transformedReservations = computed(() =>
    reservationStore.data.map(reservation => {
      const serviceNames = reservation.services.map(service => service.nameFr).join(', ');
      return {
        ...reservation,
        serviceNames
      };
    }).slice((page.value - 1) * pageCount, (page.value) * pageCount));

const isOpen = ref(false)
const isOpenModify = ref(false)

const items = row => [
  [{
    label: selectLangue?.value.ref === 'En' ? 'Edit' : 'Modifier',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => openModalModify(row.id),
  }], [{
    label: selectLangue?.value.ref === 'En' ? 'Delete' : 'Supprimer',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteReservation(row.id)
  }]
]

async function onSubmitAdd(reservation) {
  await reservationStore.addReservationFromBo(reservation);
  reloadNuxtApp()
}

async function deleteReservation(id) {
  await reservationStore.deleteReservation(id);
  reloadNuxtApp()
}

const reservationId = ref(null);

async function openModalModify(id) {
  await reservationStore.loadReservationDataById(id);

  reservationId.value = id;

  select.value = reservationStore.data2[0].status_id
  state_reservation.state = reservationStore.data2[0].status_id

  selectedUser.value = reservationStore.data2[0].user_id
  state_reservation.user_id = reservationStore.data2[0].user_id

  selectedBedroomType.value = reservationStore.data2[0].bedroom_type_id
  state_reservation.bedroom_type_id = reservationStore.data2[0].bedroom_type_id

  selectedServiceM.value = reservationStore.data2[0].services.map(service => service[`name${selectLangue?.value.ref}`]);
  state_reservation.services = reservationStore.data2[0].services.map(service => service[`name${selectLangue?.value.ref}`]);

  state_reservation.startDate = reservationStore.data2[0].startDate
  state_reservation.endDate = reservationStore.data2[0].endDate

  isOpenModify.value = true
}

async function onSubmitModify(reservation) {
  console.log(reservationStore.data2[0].id);

  await reservationStore.updateReservationFromBo(reservation, reservationStore.data2[0].id)
  reloadNuxtApp()
}

const page = ref(1)
const pageCount = 10
const selectedColumns = ref([]);

watch(columns, (newColumns) => {
  selectedColumns.value = newColumns.filter((col) =>
      ["id", `bedroom_type.name${selectLangue?.value.ref}`, "user_id", "startDate", "endDate", "status_id", "action"].includes(col.key)
  );
}, { immediate: true });

const formatServices = (services) => {
  if (!services || services.length === 0) return selectLangue.value.ref === 'En' ? 'void' : 'vide';
  return services.map(service => selectLangue.value.ref === 'En' ? service.nameEn : service.nameFr).join(', ');
};

console.log(reservationStore.data)
</script>

<template>

  <div class="flex flex-row py-4 px-20 justify-between items-center">
    <h1 v-text="selectLangue?.ref === 'En' ? 'Reservations' : 'Réservations'" class="text-3xl font-noto pb-4"></h1>
  </div>
  <div class="px-20">
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="mr-4 w-[15%]"/>
      <UButton @click="isOpen = true" v-text="selectLangue?.ref === 'En' ? 'Add new' : 'Ajouter un nouveau'"></UButton>
    </div>
    <UTable :columns="selectedColumns" :rows="transformedReservations">
      <template #services-data="{ row }">
        <span>{{ formatServices(row.services) }}</span>
      </template>
      <template #action-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="reservationStore.data.length" />
    </div>
  </div>
  <UModal v-model="isOpen">
    <div class="p-4">
      <UForm :schema="schema" :state="state_reservation" class="space-y-2">
        <UFormGroup label="Bedroom type" required>
          <USelect v-model="selectedBedroomType" :options="bedroomTypeNamesSelect" @change="selectBedroomTypeChange(selectedBedroomType)"/>
        </UFormGroup>
        <UFormGroup label="User" required>
          <USelect v-model="selectedUser" :options="userNameSelect" @change="selectUserChange(selectedUser)"/>
        </UFormGroup>
        <UFormGroup label="Services">
          <USelectMenu v-model="selectedService" :options="serviceTab" @change="selectServicesChange(selectedService)" multiple/>
        </UFormGroup>
        <UFormGroup label="Start date" required>
          <UInput type="date" v-model="state_reservation.startDate"/>
        </UFormGroup>
        <UFormGroup label="End Date" required>
          <UInput type="date" v-model="state_reservation.endDate"/>
        </UFormGroup>
        <UFormGroup label="Status" required>
          <USelect v-model="select" :options="options" @change="selectStatusChange(select)"/>
        </UFormGroup>
      </UForm>
      <div class="flex justify-center mt-4">
        <UButton type="submit" @click="onSubmitAdd(state_reservation)">
          Confirm
        </UButton>
      </div>
    </div>
  </UModal>

  <UModal v-model="isOpenModify">
    <div class="p-4">
      <UForm :schema="schema" :state="state_reservation" class="space-y-2">
        <UFormGroup label="Bedroom type" required>
          <USelect v-model="selectedBedroomType" :options="bedroomTypeNamesSelect" @change="selectBedroomTypeChange(selectedBedroomType)"/>
        </UFormGroup>
        <UFormGroup label="User" required>
          <USelect v-model="selectedUser" :options="userNameSelect" @change="selectUserChange(selectedUser)"/>
        </UFormGroup>
        <UFormGroup label="Services">
          <USelectMenu v-model="selectedServiceM" :options="serviceTab" @change="selectServicesChange(selectedServiceM)" multiple/>
        </UFormGroup>
        <UFormGroup label="Start date" required>
          <UInput type="date" v-model="state_reservation.startDate"/>
        </UFormGroup>
        <UFormGroup label="End Date" required>
          <UInput type="date" v-model="state_reservation.endDate"/>
        </UFormGroup>
        <UFormGroup label="Status" required>
          <USelect v-model="select" :options="options" @change="selectStatusChange(select)"/>
        </UFormGroup>
      </UForm>
      <div class="flex justify-center mt-4">
        <UButton type="submit" @click="onSubmitModify(state_reservation)">
          Confirm
        </UButton>
      </div>
    </div>
  </UModal>

</template>

<style scoped>

</style>