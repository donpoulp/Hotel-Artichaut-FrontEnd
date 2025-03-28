<script setup lang="ts">
import {z} from "zod";
import {ref, onMounted, reactive} from "vue";
import {useUserStore} from "~/store/user";
import {useAuthStore} from "~/store/auth";
import {useReservationStore} from "~/store/reservation";

const userStore = useUserStore()
const resaStore = useReservationStore()
const authStore = useAuthStore()
authStore.hydrateStore();

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

const state_user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  emailBis: '',
  password: '',
  phone: '',
  phoneBis: '',
  role: '',
})

const reservations = ref([]);

onMounted(async () => {
  if (authStore.user) {
    await userStore.loadUserDataById(authStore.user.id);
    Object.assign(state_user, authStore.user);
    await getReservations(authStore.user.id);
  }
});

const notif = useToast()

async function onSubmitModify() {
  const userId = authStore.user.id;
  const updatedUserData = {...state_user, id: userId};
  try {
    await userStore.updateUserData(updatedUserData);
    notif.add({
      title: 'Success',
      description: 'Your information updated successfully.',
      color: 'green',
    });
    console.log('User data updated:', userStore.data2);
  } catch (error) {
    notif.add({
      title: 'Error',
      description: 'Failed to update.',
      color: 'red',
    });
    console.error('Error updating user data:', error);
  }
}

async function onSubmitDelete() {
  if (authStore.user) {
    try {
      await userStore.deleteUserData(authStore.user.id);
      notif.add({
        title: 'Success',
        description: 'Your account deleted successfully.',
        color: 'green',
      });
      console.log('User data deleted:', userStore.data2);
      navigateTo('/');
    } catch (error) {
      notif.add({
        title: 'Error',
        description: 'Failed to delete account.',
        color: 'red',
      });
      console.error('Error deleting user data:', error);
    }
  }
}

async function getReservations(userId) {
  await resaStore.loadReservationDataByUserId(userId);
  reservations.value = resaStore.data;
  console.log('Réservations récupérées :', reservations.value);
}

const returnClick = () => {
  navigateTo('/')
}

const selectLangue = useState('selectedLangue');
</script>

<template>
  <h1 class="text-center text-3xl py-14">{{ selectLangue?.ref === 'En' ? 'Your account' : 'Votre compte' }}</h1>
  <div class="flex flex-row space-x-72 justify-center">
    <div class="flex flex-col pb-14">
      <h1 class="text-xl text-center pb-6">
        {{ selectLangue?.ref === 'En' ? 'Personal information' : 'Informations personnelles' }}</h1>
      <UForm :schema="schema_user" :state="state_user">
        <UCard class="p-4 space-y-4 bg-gray-100">
          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Firstname' : 'Prénom'">
            <UInput v-model="state_user.firstName"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Lastname' : 'Nom'">
            <UInput v-model="state_user.lastName"/>
          </UFormGroup>

          <UFormGroup label="Email">
            <UInput v-model="state_user.email"/>
          </UFormGroup>

          <UFormGroup label="Email Bis">
            <UInput v-model="state_user.emailBis"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Password' : 'Mot de passe'">
            <UInput v-model="state_user.password"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Phone' : 'Téléphone'">
            <UInput v-model="state_user.phone"/>
          </UFormGroup>

          <div class="flex justify-center pt-10 space-x-4">
            <UButton class="btn" @click="onSubmitModify">
              <div class="text-gradient-gold">
                {{ selectLangue?.ref === 'En' ? 'Modify' : 'Modifier' }}
              </div>
            </UButton>
            <UButton class="btn" @click="onSubmitDelete">
              <div class="text-gradient-gold">
                {{ selectLangue?.ref === 'En' ? 'Delete' : 'Supprimer' }}
              </div>
            </UButton>
          </div>

        </UCard>
      </UForm>
    </div>

    <div class="flex flex-col pb-14">
      <h1 class="text-xl text-center pb-6">{{selectLangue?.ref === 'En' ? 'My reservations' : 'Mes réservations' }}</h1>
      <UCard class="p-4 max-h-[490px] overflow-y-auto bg-gray-100">
        <div class="space-y-4">
          <div v-for="reservation in reservations" :key="reservation.id" class="border rounded-md border-gray-300 p-2 space-y-1 bg-white">
            <p>{{ selectLangue?.ref === 'En' ? 'Number : ' : 'Numéro : ' }} {{ reservation.id }}</p>
            <p>{{ selectLangue?.ref === 'En' ? 'From : ' : 'Du : ' }}{{ reservation.startDate }}</p>
            <p>{{ selectLangue?.ref === 'En' ? 'To : ' : 'Au : ' }} {{ reservation.endDate }}</p>
            <p>{{ selectLangue?.ref === 'En' ? 'Price : ' : 'Prix : ' }} {{ reservation.price }} $</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
  <div class="flex justify-center pb-14">
    <UButton
        class="w-[175px] h-[50px] text-[18px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800"
        @click="returnClick">
      <div class="text-gradient-gold">
        {{ selectLangue?.ref === 'En' ? 'Return to site' : 'Retour au site' }}
      </div>
    </UButton>
  </div>
</template>


<style scoped>
.btn {
  background: rgba(13, 86, 73, 0.9);
}

.btn:hover {
  background: rgba(16, 106, 90, 0.9);
}
</style>