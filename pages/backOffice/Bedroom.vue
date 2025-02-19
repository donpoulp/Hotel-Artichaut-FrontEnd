<template>
    <table>
<tr v-for="bedroom in bedroomStore.data">
    <td class="bedroom">{{bedroom.id}}</td>
    <td>{{bedroom.number}}</td>
</tr>

    </table>
</template>

<script setup>
import {useBedroomStore} from "~/store/bedroom";


const bedroomStore = useBedroomStore();

definePageMeta({
  layout: 'back-office',
})

</script>

<style scoped>
.bedroom {
    color: white;
}
</style>