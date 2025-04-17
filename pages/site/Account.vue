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
    if (state_user.emailBis != ''){
      document.querySelector(".emailBis").style.display = "block"
      isActiveMail.value = true;
    }
    if (state_user.phoneBis != ''){
      document.querySelector(".phoneBis").style.display = "block"
      isActivePhone.value = true;
    }
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
  reservations.value = resaStore.data2;
}

const returnClick = () => {
  navigateTo('/')
}

const selectLangue = useState('selectedLangue');


const isActiveMail = ref(false)
const isActivePhone = ref(false)

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
</script>

<template>
  <h1 class="text-center font-bold text-3xl py-14 text-[#0D5649]">{{ selectLangue?.ref === 'En' ? 'Your account' : 'Votre compte' }}</h1>
  <div class="flex flex-row space-x-72 justify-center">
    <div class="flex flex-col pb-14">
      <h1 class="text-2xl font-semibold text-center pb-6 text-[#0D5649]">
        {{ selectLangue?.ref === 'En' ? 'Personal information' : 'Informations personnelles' }}</h1>
      <UForm :schema="schema_user" :state="state_user">
        <UCard class="p-4 space-y-4 bg-[#F9F9F4]">
          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Firstname' : 'Prénom'" class="mb-2">
            <UInput v-model="state_user.firstName"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Lastname' : 'Nom'" class="mb-2">
            <UInput v-model="state_user.lastName"/>
          </UFormGroup>

          <UFormGroup label="E-mail" class="mb-2">
            <UInput v-model="state_user.email"/>
          </UFormGroup>

          <UFormGroup label="E-mail bis" name="emailBis" class="emailBis mb-2" style="display: none">
            <UInput v-model="state_user.emailBis"/>
          </UFormGroup>
          <UButton class="btn_phone mb-4 bg-[#D8D27D] text-[#072527]" size="sm" color="primary" square variant="solid" @click="displayMailBis()">
            <UIcon :name="isActiveMail ? 'material-symbols:remove' : 'material-symbols:add'"/>
          </UButton>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Password' : 'Mot de passe'" class="mb-2">
            <UInput v-model="state_user.password"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Phone' : 'Téléphone'" class="mb-2">
            <UInput v-model="state_user.phone"/>
          </UFormGroup>

          <UFormGroup :label="selectLangue?.ref === 'En' ? 'Phone bis' : 'telephone bis'" name="phoneBis" class="phoneBis mb-2" style="display: none">
            <UInput v-model="state_user.phoneBis"/>
          </UFormGroup>
          <UButton class="btn_phone bg-[#D8D27D] text-[#072527]" size="sm" color="primary" square variant="solid" @click="displayPhoneBis()">
            <UIcon :name="isActivePhone ? 'material-symbols:remove' : 'material-symbols:add'"/>
          </UButton>

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
      <h1 class="text-2xl font-semibold text-center pb-6 text-[#0D5649]">
        {{ selectLangue?.ref === 'En' ? 'My reservations' : 'Mes réservations' }}
      </h1>

      <UCard class="p-4 max-h-[600px] overflow-y-auto bg-[#F9F9F4] shadow-sm border border-[#E5E7EB] rounded-xl">
        <div class="space-y-4">
          <div
              v-if="reservations.length > 0"
              v-for="(reservation, index) in reservations"
              :key="reservation.id"
              class="bg-white p-5 rounded-xl shadow border border-gray-200 transition hover:shadow-md"
          >
            <div class="flex justify-between items-center mb-3">
              <h2 class="text-xl font-semibold text-[#0D5649]">
                {{ selectLangue?.ref === 'En' ? 'Reservation #' : 'Réservation n°' }}{{ index + 1 }}
              </h2>
            </div>

            <div class="text-sm text-gray-700 space-y-2">
              <p>
                <span class="font-semibold text-[#072527]">{{ selectLangue?.ref === 'En' ? 'Bedroom type :' : 'Type de chambre :' }}</span>
                {{ reservation.bedroom_type }}
              </p>
              <p>
                <span class="font-semibold text-[#072527]">{{ selectLangue?.ref === 'En' ? 'Price:' : 'Prix :' }}</span>
                {{ reservation.price }} $
              </p>
              <p>
                <span class="font-semibold text-[#072527]">{{ selectLangue?.ref === 'En' ? 'From:' : 'Du :' }}</span>
                {{ reservation.startDate }}
              </p>
              <p>
                <span class="font-semibold text-[#072527]">{{ selectLangue?.ref === 'En' ? 'To:' : 'Au :' }}</span>
                {{ reservation.endDate }}
              </p>
              <div>
                <span class="font-semibold text-[#072527]">{{ selectLangue?.ref === 'En' ? 'Services:' : 'Services :' }}</span>
                <div class="flex flex-wrap gap-2 mt-1">
              <span
                  v-for="service in reservation.services"
                  :key="service.id"
                  class="bg-[#D8D27D] text-[#072527] text-xs font-medium px-3 py-1 rounded-full"
              >
                {{ service[`name${selectLangue?.ref}`] }}
              </span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 italic py-10">
            <p>{{ selectLangue?.ref === 'En' ? 'No reservations found.' : 'Aucune réservation trouvée.' }}</p>
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