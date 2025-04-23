<script setup lang="ts">
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import {useReservationStore} from "~/store/reservation.js";
import {z} from "zod";
import type {FormSubmitEvent} from '#ui/types';
import {reactive, ref} from "vue";
import {useServicesStore} from "~/store/services.js";
import {sub, format, isSameDay, addDays, type Duration, differenceInDays} from 'date-fns'
import {useAuthStore} from "~/store/auth";

const route = useRoute()
const reservationStore = useReservationStore()

const carouselConfig = {
  itemsToShow: 3,
  wrapAround: true
}

const serviceStore = useServicesStore();

const {data: bedroomsType} = useFetch('http://163.172.156.97:8000/api/bedroomType/' + route.params.id, {lazy: true})

const selectLangue = useState('selectedLangue');

const totalPrice = computed(() => {
  const days = differenceInDays(selected.value.end, selected.value.start) // Nombre de jours
  return (bedroomsType.value?.price * days) + extraServicesPrice.value // Prix total
})

const open = ref(false)
const openBis = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const selectedServices = ref({});
const extraServicesPrice = ref(0)

function calculPrice(servicePrice, isChecked) {
  if (isChecked) {
    extraServicesPrice.value += servicePrice;
  } else {
    extraServicesPrice.value -= servicePrice;
  }
}

const selected = ref({start: new Date(), end: addDays(new Date(), 5)})

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = {start: sub(new Date(), duration), end: new Date()}
}

const authStore = useAuthStore()
authStore.hydrateStore();

const schema_reservation = z.object({
  startDate: z.string(),
  endDate: z.string(),
  user_id: z.string(),
  price: z.string(),
  bedroom_type_id: z.string(),
  status_id: z.string(),
  services: z.string()
}).partial()

const state_reservation = reactive({
  startDate: selected.value.start,
  endDate: selected.value.end,
  user_id: authStore.user?.id || undefined,
  price: totalPrice.value,
  bedroom_type_id: route.params.id,
  status_id: 3,
  services: []
})

watchEffect(() => {
  state_reservation.startDate = selected.value.start
  state_reservation.endDate = selected.value.end
  state_reservation.price = totalPrice.value
  state_reservation.user_id = authStore.user?.id || undefined
})

const resModal = ref(false)
const notif = useToast()
const reservationId = ref();

async function createReservation(reservation) {
  // console.log(reservation)
  // console.log(authStore.user?.id)

  const status = await reservationStore.addReservation(reservation);
  reservationId.value = sessionStorage.getItem('id_res');

  if (status === 201) {
    notif.add({
      title : "Success",
      description : "Reservation created successfully",
      color: 'green',
    });
  } else if (status === 406) {
    notif.add({
      title : "Sorry",
      description : "No rooms available for the selected room type.",
      color: 'red',
    });
  } else if (status === 400) {
    notif.add({
      title : "Error",
      description : "Check reservation informations",
      color: 'red',
    });
  } else {
    notif.add({
      title : "Sorry",
      description : "Servor Error",
      color: 'red',
    });
  }

  resModal.value = false

  useApiFetch('http://163.172.156.97:8000/inscription/' + reservationId.value, {
    method: 'GET',
  });

  const checkoutUrl = 'http://163.172.156.97:8000/checkout/' + reservationId.value;
  window.open(checkoutUrl, '_blank');
}

function addService(service_id) {
  const index = state_reservation.services.indexOf(service_id);

  if (index !== -1) {
    state_reservation.services = state_reservation.services.filter(id => id !== service_id);
  } else {
    state_reservation.services.push(service_id);
  }
}

function checkLogin() {
  const currentUser = authStore.user?.id
  if (currentUser == undefined) {
    console.log("ereure fait ce connecter")
    notif.add({ title: 'Veuillez vous connecter pour poursuivre la réservation.'})
  } else {
    resModal.value = true
  }
}

console.log(bedroomsType)
</script>

<template>
  <section class="RoomPageSection">
    <div class="RoomPageTop">
      <div>
        <img class="RoomPageImg" :src="bedroomsType?.picture?.[0]?.picturePath">
      </div>
      <div class="RoomPageContent text-black">
        <h3>{{ bedroomsType?.[`name${selectLangue.ref}`] }}</h3>
        <p>{{ bedroomsType?.[`description${selectLangue.ref}`] }}</p>
      </div>
    </div>
    <UForm :state="state_reservation" :schema="schema_reservation">
      <div class="RoomPageBtn">
        <div class="RoomPageBtnBox">
          <div class="RoomPageBtnBoxLeft">
            <UPopover v-model:open="open">
              <UButton
                  class="mr-4 w-[175px] h-[50px] text-[20px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800"
                  @click="open.toString()" trailing-icon="i-heroicons-chevron-down-20-solid">
                <div class="text-gradient-gold">Services</div>
              </UButton>
              <template #panel>
                <div class="p-4" v-for="item in serviceStore.data" :key="item.id">
                  <UCheckbox
                      :label="item.nameFr"
                      v-model="selectedServices[item.id]"
                      :value="item.price"
                      @change="calculPrice(item.price, selectedServices[item.id]), addService(item.id)"
                  />
                </div>
              </template>
            </UPopover>
            <NuxtLink to="/site/Services">
              <UButton
                  class="w-[175px] h-[50px] text-[20px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800">
                <div class="text-gradient-gold">
                  {{ selectLangue.ref === 'En' ? 'View all services' : 'Voir les services' }}
                </div>
              </UButton>
            </NuxtLink>
          </div>
          <div class="RoomPageBtnBoxRight">

            <!--CALENDRIER-->
            <UPopover :popper="{ placement: 'top-start' }">
              <UIcon name="i-heroicons-calendar-days-20-solid" class="RoomPageCartIcon"/>
              <UButton
                  class="w-[175px] h-[50px] text-[15px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800">
                <div class="text-gradient-gold">
                  {{ selectLangue?.ref === 'En' ? 'From ' : 'Du ' }}
                  {{ format(selected.start, 'd MMM, yyy') }}
                  <br>
                  {{ selectLangue?.ref === 'En' ? 'To ' : 'Au ' }}
                  {{ format(selected.end, 'd MMM, yyy') }}
                </div>
              </UButton>

              <template #panel="{ close }">
                <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                  <div class="hidden sm:flex flex-col py-4">
                    <UButton
                        v-for="(range, index) in ranges"
                        :key="index"
                        :label="range.label"
                        color="gray"
                        variant="ghost"
                        class="rounded-none px-6"
                        :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                        truncate
                        @click="selectRange(range.duration)"
                    />
                  </div>
                  <DatePicker v-model="selected" @close="close" color="green"/>
                </div>
              </template>
            </UPopover>
            <!--CALENDRIER-->

            <div class="RoomPageBtnBoxRightBtnCart">
              <UIcon name="material-symbols:shopping-bag-outline" class="RoomPageCartIcon"/>
              <UButton @click="checkLogin"
                       class="w-[175px] h-[50px] text-[18px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800">
                <div class="text-gradient-gold">
                  {{ selectLangue.ref === 'En' ? 'Confirm' : 'Réserver' }}
                </div>
              </UButton>
            </div>
            <div class="RoomPageTotalPrice">Total : {{ totalPrice }} $</div>
          </div>
        </div>
      </div>
    </UForm>

    <div class="RoomPageCarrousel">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="picture in bedroomsType?.picture" :key="picture" class="flex flex-col">
          <img :alt="picture.id" :src="picture.picturePath"/>
        </Slide>
        <template #addons class="addonsCarrousel">
          <Navigation/>
        </template>
      </Carousel>
    </div>
  </section>

  <!--MODAL VERIFICATION-->
  <UModal v-model="resModal">
    <div class="p-8 space-y-6">
      <h2 class="text-xl text-center font-semibold pb-3">{{ selectLangue.ref === 'En' ? 'Check your reservation' : 'Vérifier votre réservation' }}</h2>
      <div class="flex flex-row space-x-3">
        <p>{{ selectLangue?.ref === 'En' ? 'Room type :' : 'Type de chambre :' }}</p>
        <p class="font-semibold">{{ bedroomsType?.[`name${selectLangue.ref}`] }}</p>
      </div>
      <UForm :schema="schema_reservation" :state="state_reservation">
        <div class="flex flex-row space-x-4">

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton class="bg-custom-green bg-opacity-90 hover:bg-green-800">
              <!--          <UButton class="w-[175px] h-[50px] text-[15px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800">-->
              <div>
                {{ selectLangue?.ref === 'En' ? 'From : ' : 'Du : ' }}
                {{ format(selected.start, 'd MMM - yyy') }}

                {{ selectLangue?.ref === 'En' ? 'To : ' : 'Au : ' }}
                {{ format(selected.end, 'd MMM - yyy') }}
              </div>
            </UButton>

            <template #panel="{ close }">
              <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                <div class="hidden sm:flex flex-col py-4">
                  <UButton
                      v-for="(range, index) in ranges"
                      :key="index"
                      :label="range.label"
                      color="gray"
                      variant="ghost"
                      class="rounded-none px-6"
                      :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                      truncate
                      @click="selectRange(range.duration)"
                  />
                </div>
                <DatePicker v-model="selected" @close="close" color="green"/>
              </div>
            </template>
          </UPopover>

          <UPopover v-model:open="openBis">
            <UButton class="bg-custom-green bg-opacity-90 hover:bg-green-800" @click="open.toString()" trailing-icon="i-heroicons-chevron-down-20-solid">
              <div>Services</div>
            </UButton>
            <template #panel>
              <div class="p-4" v-for="item in serviceStore.data" :key="item.id">
                <UCheckbox
                    :label="item.nameFr"
                    v-model="selectedServices[item.id]"
                    :value="item.price"
                    @change="calculPrice(item.price, selectedServices[item.id]), addService(item.id)"
                />
              </div>
            </template>
          </UPopover>
        </div>
        <div class="flex flex-row space-x-3 pb-3">
          <p class="pt-6 text-center">Total :</p>
          <p class="pt-6 font-semibold text-center">{{ state_reservation.price }} $</p>
        </div>
        <div class="flex justify-center mt-4">
          <UButton @click="createReservation(state_reservation)"
                   class="w-[175px] h-[50px] text-[18px] flex items-center justify-center bg-custom-green bg-opacity-90 hover:bg-green-800">
            <div class="text-gradient-gold">
              {{ selectLangue?.ref === 'En' ? 'Confirm & Pay ' : 'Valider et payer ' }}
            </div>
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
  <!--MODAL VERIFICATION-->
</template>

<style scoped>
img, video {
  max-width: none !important;
}

.RoomPageSection {
  background-color: #F0F0E8;
  padding: 5% 10%;
}

.RoomPageTop {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.RoomPageImg {
  width: 588px;
  height: 388px;
}

.RoomPageContent {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.RoomPageContent h3 {
  font-family: "Noto Serif", serif;
  font-size: 48px;
  font-weight: 300;
  margin-bottom: 3%;
}

.RoomPageContent p {
  font-family: "Noto Serif", serif;
  font-size: 30px;
  font-weight: 300;
}

.RoomPageBtn {
  padding: 0 3%;
}

.RoomPageBtnBox {
  margin-top: 2%;
  height: 175px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.RoomPageBtnBoxLeft {
  width: 28%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.RoomPageBtnBoxRight {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.RoomPageTotalPrice {
  width: 175px;
  height: 50px;
  color: black;
  background-color: #FFF3F3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}

.RoomPageCartIcon {
  width: 50px;
  height: 50px;
}

.RoomPageBtnBoxRightBtnCart {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.RoomPageCarrousel {
  margin: 3% 1% 0;
}
</style>
