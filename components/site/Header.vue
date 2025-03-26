<script setup>
import Popup from './Popup.vue'
import { ref } from 'vue'
import {useCartStore} from "~/store/cart.js";
import {useAuthStore} from "~/store/auth.js";

const showModal = ref(false)

const langue = useState('langue') // Récupération du tableau global
const selectedLangue = useState('selectedLangue')

const onLangueChange = (newValue) => {
  selectedLangue.value = newValue
  console.log('Langue sélectionnée:', selectedLangue.value)
}

const cartIsOpen = ref(false)

const cartStore = useCartStore()
const authStore = useAuthStore()
authStore.hydrateStore();
  
const notif = useToast()

const openCart = () => {
  if (authStore.isAuthenticated) {
    cartIsOpen.value = true;
  } else {
    notif.add({ title: 'Veuillez vous connecter pour accéder à votre panier.'})
    showModal.value = true
    console.log('User is not authenticated');
  }
}

</script>

<template>
    <header>
        <div class="langue">
          <USelectMenu v-model="selectedLangue" :options="langue" option-attribute="name" class="w-full" @update:modelValue="onLangueChange">
            <UIcon :name="selectedLangue?.icon" class="langueIcon" aria-hidden="true" />
            <p class="text-white ml-2">{{selectedLangue?.name}}</p>
          </USelectMenu>
        </div>
      <NuxtLink to="/site">
        <div class="mainLogoContainer">
            <img src="/public/Logo.png" alt="logo" class="logo">
        </div>
      </NuxtLink>
      <div class="nav">
<!--        <UIcon name="material-symbols:shopping-bag-outline" class="cartIcon text-white" @click="cartIsOpen = true" />-->
            <UIcon name="material-symbols:shopping-bag-outline" class="cartIcon text-white" @click="openCart" />
            <UIcon v-if="authStore.isAuthenticated === false" name="humbleicons:user" class="userIcon text-white" @click="showModal = true"/>
            <NuxtLink to="/site/Account">
              <UIcon v-if="authStore.isAuthenticated === true" name="material-symbols:manage-accounts" class="userIcon text-white"/>
            </NuxtLink>
            <UIcon v-if="authStore.isAuthenticated === true" @click="disconnect()" name="material-symbols:person-cancel" class="userIcon text-white"/>
            <Popup v-show="showModal" @close-modal="showModal = false"/>
          </div>
        </header>

      <UModal v-model="cartIsOpen">
        <UCard :ui="{ divide: 'divide-y divide-gray-500' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Modal
              </h3>
              <UButton variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="cartIsOpen = false" />
            </div>
          </template>
          <div>
            Chambre type : {{ cartStore.bedroomType?.name }}
          </div>
          <div>
            Services :
          </div>
          <div>
            Dates :
          </div>
          <template #footer>
            Total :     $
          </template>
        </UCard>
      </UModal>
    </template>

    <style scoped>
    header {
        height: 207px;
        background: linear-gradient(90deg, #0D5649 69%, #158470 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .langue {
        display: flex;
        justify-content: space-between;
        width: 250px;
    }

    .langueIcon {
        width: 80px;
        height: 60px;
        border-radius: 10px;
        margin-left: 20px;
    }

    .langue p {
        font-family: Noto Serif;
        font-size: 40px;
    }

    .nav {
        width: 250px;
        display: flex;
        justify-content: space-evenly;
        padding-right: 80px;

    }

    .nav .cartIcon, .userIcon {
        width: 80px;
        height: 100px;
    }

    .userIcon {
        cursor: pointer;
    }

    .cartIcon {
        cursor: pointer;
    }

    </style>
