<script setup lang="ts">
  import Header from "~/components/site/Header.vue";
  import Footer from "~/components/site/Footer.vue";
</script>

<template>
    <Header/>
<main>
    <slot />
</main>
    <Footer />
</template>