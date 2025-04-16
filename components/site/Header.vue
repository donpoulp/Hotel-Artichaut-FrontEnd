<script setup>
import Popup from './Popup.vue'
import {ref} from 'vue'
import {useAuthStore} from "~/store/auth.js";

const showModal = ref(false)

const langue = useState('langue') // Récupération du tableau global
const selectedLangue = useState('selectedLangue')

const onLangueChange = (newValue) => {
  selectedLangue.value = newValue
  console.log('Langue sélectionnée:', selectedLangue.value)
}

const authStore = useAuthStore()
authStore.hydrateStore();
</script>

<template>
  <header>
    <div class="langue">
      <USelectMenu v-model="selectedLangue" :options="langue" option-attribute="name" class="w-full"
                   @update:modelValue="onLangueChange">
        <UIcon :name="selectedLangue?.icon" class="langueIcon" aria-hidden="true"/>
        <p class="text-white ml-2">{{ selectedLangue?.name }}</p>
      </USelectMenu>
    </div>
    <NuxtLink to="/site">
      <div class="mainLogoContainer">
        <img src="/public/Logo.png" alt="logo" class="logo">
      </div>
    </NuxtLink>
    <div class="nav space-x-2">
      <UIcon v-if="authStore.isAuthenticated === false" name="humbleicons:user" class="userIcon text-white"
             @click="showModal = true"/>
      <NuxtLink to="/site/Account">
        <UIcon v-if="authStore.isAuthenticated === true" name="material-symbols:manage-accounts"
               class="userIcon text-white"/>
      </NuxtLink>
      <UIcon v-if="authStore.isAuthenticated === true" @click="authStore.logout()" name="material-symbols:person-cancel"
             class="userIcon text-white"/>
      <Popup v-show="showModal" @close-modal="showModal = false"/>
    </div>
  </header>
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
  padding-right: 40px;

}

.nav .cartIcon, .userIcon {
  width: 80px;
  height: 100px;
}

.userIcon {
  cursor: pointer;
}
</style>
