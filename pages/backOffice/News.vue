<script setup lang="ts">
import News from "~/components/site/News.vue";

definePageMeta({
  layout: 'back-office',
})
</script>

<template>
  <section class="p-8">
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-4">Preview</h2>
      <News></News>
    </div>
    <div>
      <h2 style="font-size: 40px; font-weight: bold" class="mt-10">Modify</h2>

    </div>
  </section>
</template>

<style scoped>

</style>