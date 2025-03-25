<script setup lang="ts">
import {z} from "zod";
import {reactive} from "vue";
import {useUserStore} from "~/store/user";

const userStore = useUserStore()

const schema_user = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email('Invalid email'),
  emailBis: z.string(),
  password: z.string(),
  phone: z.string(),
  phoneBis: z.string(),
  role: z.string(),
}).partial()

type Schema = z.output<typeof schema_user>

const state_user = reactive({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  emailBis: undefined,
  password: undefined,
  phone: undefined,
  phoneBis: undefined,
  role: undefined,
})

async function onSubmitModify(user) {
  await userStore.updateUserData(user)
  reloadNuxtApp()
}

const returnClick = () => {
  navigateTo('/')
}

</script>

<template>
    <h1 class="text-center text-3xl py-14">Espace client</h1>
    <UForm :schema="schema_user" :state="state_user" @submit="onSubmitModify">
      <div class="px-96 space-y-4">
        <div class="flex flex-row space-x-72">
          <div class="flex flex-col space-y-4 pl-48">
            <h1 class="text-xl text-center">Informations personnelles</h1>
            <UFormGroup label="firstName" name="firstName">
              <UInput/>
            </UFormGroup>

            <UFormGroup label="lastName" name="lastName">
              <UInput/>
            </UFormGroup>

            <UFormGroup label="email" name="email">
              <UInput/>
            </UFormGroup>

            <UFormGroup label="emailBis" name="emailBis">
              <UInput/>
            </UFormGroup>

            <UFormGroup label="password" name="password">
              <UInput/>
            </UFormGroup>

            <UFormGroup label="phone" name="phone">
              <UInput/>
            </UFormGroup>
          </div>

          <div class="flex flex-col space-y-4">
            <h1 class="text-xl text-center">Mes réservations</h1>
            <p>Resa 1</p>
            <p>Resa 2</p>
            <p>Resa 3</p>
            <p>Resa 4</p>
          </div>
        </div>

        <div class="absolute top-80 bottom-40 left-1/2 border-l border-gray-300"></div>

        <div class="flex justify-center space-x-10 py-14">
          <UButton class="btn" type="submit">Valider</UButton>
          <UButton class="btn" @click="returnClick">Retour</UButton>
        </div>
      </div>
    </UForm>
</template>


<style scoped>
.btn {
  background: rgba(13, 86, 73, 0.9);
}

.btn:hover {
  background: rgba(16, 106, 90, 0.9);
}
</style>