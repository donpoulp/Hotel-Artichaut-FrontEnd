<script setup lang="ts">
const langue = useState('langue') // Récupération du tableau global
const selectedLangue = useState('selectedLangue');

const onLangueChange = (newValue) => {
  selectedLangue.value = newValue
  console.log('Langue sélectionnée:', selectedLangue.value)
}
</script>

<template>
  <section class="top-bar flex flex-row justify-between">
    <div class="p-1 mx-3 my-3 bg-langue rounded-sm flex items-center w-fit">
      <USelectMenu v-model="selectedLangue" :options="langue" option-attribute="name" class="w-fit deep" @update:modelValue="onLangueChange">
        <UIcon :name="selectedLangue?.icon" class="langueIcon" aria-hidden="true" />
        <p class="text-langue ml-2 w-fit">{{selectedLangue?.name}}</p>
      </USelectMenu>
    </div>
    <NuxtLink to="/site">
      <button v-text="selectedLangue.ref === 'En' ? 'Go to site' : 'Aller au site'" class="m-3 w-[100px] h-[35px] fs-[18px] buttonTopBarBackOffice"></button>
    </NuxtLink>
  </section>
</template>

<style scoped>
.top-bar{
  width: 100%;
  height: 60px;
  background-color: #D8D27D;
}
.text-langue{
  color: #D8D27D;
  width: fit-content;
}
.bg-langue{
  background: rgba(16, 106, 90, 0.9);
}
.deep :deep(ul){
  width: fit-content;
}
.deep :deep(li){
  width: fit-content;
}
.buttonTopBarBackOffice{
  background-color: rgba(16, 106, 90, 0.9);;
  color: #D8D27D;
  font-weight: bold;
}
</style>