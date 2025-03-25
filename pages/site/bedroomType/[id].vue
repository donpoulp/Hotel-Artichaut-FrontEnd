<script setup lang="ts">
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import {useReservationStore} from "~/store/reservation.js";
import {z} from "zod";
import type {FormSubmitEvent} from '#ui/types';
import {reactive} from "vue";
import {useServicesStore} from "~/store/services.js";
import {useCartStore} from "~/store/cart.js";

const route = useRoute()
const reservationStore = useReservationStore()

const carouselConfig = {
  itemsToShow: 3,
  wrapAround: true
}

const serviceStore = useServicesStore();
const cartStore = useCartStore();

const {data: bedroomsType} = useFetch('http://127.0.0.1:8000/api/bedroomType/' + route.params.id, {lazy: true})

const selectLangue = useState('selectedLangue');

const schema_reservation = z.object({
  startDate: z.string(),
  endDate: z.string(),
  user_id: z.string(),
  price: z.string(),
  bedroom_type_id: z.string(),
  status_id: z.string(),
}).partial()

type Schema = z.output<typeof schema_reservation>

const state_reservation = reactive({
  startDate: undefined,
  endDate: undefined,
  user_id: undefined,
  price: undefined,
  bedroom_type_id: undefined,
  status_id: undefined,
})

async function createReservation(reservation) {
  await reservationStore.addReservation(reservation);
  //reloadNuxtApp()
}

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})

const totalPrice = ref(bedroomsType?.value?.price);
const selectedServices = ref({});

function calculPrice(servicePrice, isChecked) {
  if (isChecked) {
    totalPrice.value += servicePrice;
    cartStore.addService(serviceId, servicePrice);
  } else {
    totalPrice.value -= servicePrice;
    cartStore.removeService(serviceId, servicePrice);
  }
}

watch(bedroomsType, (newBedroomType) => {
  if (newBedroomType) {
    cartStore.setBedroomType(newBedroomType);
  }
});

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
    <UForm @submit="createReservation()">
      <div class="RoomPageBtn">
        <div class="RoomPageBtnBox">
          <div class="RoomPageBtnBoxLeft">
            <UPopover v-model:open="open">
              <UButton label="Services" @click="open.toString()" trailing-icon="i-heroicons-chevron-down-20-solid"
                       class="btn"></UButton>
              <template #panel>
                <div class="p-4" v-for="item in serviceStore.data" :key="item.id">
                  <UCheckbox :label="item.nameFr" :model-value="false" v-model="selectedServices[item.id]"
                             :value="item.price" @change="calculPrice(item.price, selectedServices[item.id])"/>
                </div>
              </template>
            </UPopover>
            <!--          <ButtonWithIcon width="175px" height="50px" fontSize="22px" title="Service" icon="ph:arrows-vertical-bold"></ButtonWithIcon>-->
            <Button width="175px" height="50px" fontSize="22px"
                    :title="selectLangue.ref === 'En' ? 'View all services' : 'Voir les services'"
                    route="site-Services"></Button>
          </div>
          <div class="RoomPageBtnBoxRight">
            <!--          <div class="RoomPageBtnBoxRightBtnCart">-->
            <!--            <UIcon name="i-ph:calendar-blank" class="RoomPageCartIcon" />-->
            <!--            <Button width="175px" height="50px" fontSize="22px" :title="selectLangue.ref === 'En' ? 'Choose date' : 'Choisir les dates'"></Button>-->
            <!--          </div>-->
            <input type="date">
            <div class="RoomPageBtnBoxRightBtnCart">
              <UIcon name="material-symbols:shopping-bag-outline" class="RoomPageCartIcon"/>
              <Button type="submit" width="175px" height="50px" fontSize="22px"
                      :title="selectLangue.ref === 'En' ? 'Add to cart' : 'Ajouter au panier'"></Button>
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
</template>

<style scoped>
.btn {
  background: rgba(13, 86, 73, 0.9);
}

.btn:hover {
  background: rgba(16, 106, 90, 0.9);
}

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