<script setup>
import Popup from './Popup.vue'
import { ref } from 'vue'

const showModal = ref(false)

const langue = useState('langue') // Récupération du tableau global
const selectedLangue = useState('selectedLangue')

const onLangueChange = (newValue) => {
  selectedLangue.value = newValue
  console.log('Langue sélectionnée:', selectedLangue.value)
}

</script>

<template>
    <header>
      <section class="header">

        <div class="langue">
          <USelectMenu v-model="selectedLangue" :options="langue" option-attribute="name" class="w-full" @update:modelValue="onLangueChange">
            <UIcon :name="selectedLangue?.icon" class="langueIcon" aria-hidden="true" />
            <p class="text-white ml-2">{{selectedLangue?.name}}</p>
          </USelectMenu>
        </div>

        <NuxtLink to="/site">
          <div class="mainLogoContainer">
            <img src="/public/Logo.png" alt="logo">
          </div>
        </NuxtLink>

        <div class="nav">
            <UIcon name="humbleicons:user" class="userIcon text-white" @click="showModal = true"/>
            <Popup v-show="showModal" @close-modal="showModal = false"/>
        </div>
      </section>
    </header>
</template>

<style scoped>

.header {
  height: 15vh;
    background: #072527;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.langue {
    display: flex;
    justify-content: space-between;
    width: 20%;

}
.langueIcon {
    width: 25px;
    height: 25px;
    border-radius: 10px;
    margin-left: 20px;
}
.langue p {
    font-size: 1.2rem;
}
.nav {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: space-around
}
.mainLogoContainer{
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
}
.text-white{
  font-size: 3rem;
}
</style>