<script setup>
  defineProps(['title', 'route', 'route_params', 'width', 'height', 'fontSize'])
</script>

<template>
  <NuxtLink :to="{ name: route, params: route_params}">
    <button>
      <div class="buttonText">{{ title }}</div>
    </button>
  </NuxtLink>
</template>

<style scoped>
button{
  width: v-bind(width);
  height: v-bind(height);
  border-radius: 5px;
  background: rgba(13, 86, 73, 0.9);
  font-size: v-bind(fontSize);
  box-shadow: rgba(7, 37, 39, 0.6) 1px 5px 5px 1px;
}

.buttonText{
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
button:hover{
  background: rgba(16, 106, 90, 0.9);
}
</style>