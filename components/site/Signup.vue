<script setup lang="ts">
import {z} from 'zod'
import {reactive, ref} from 'vue'
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore();

const schemaR = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  emailBis: z.string(),
  password: z.string(),
  phone: z.string(),
  phoneBis: z.string(),
  is_admin: z.number(),
})

const stateR = reactive({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  emailBis: undefined,
  password: undefined,
  phone: undefined,
  phoneBis: undefined,
  is_admin: 0,
})

const errorMessage = ref('');

async function onSubmitRegister(data) {
  try {
    await authStore.register(data);
    errorMessage.value = '';
  } catch (error) {
    console.error('Error during registration:', error);
    errorMessage.value = 'Registration failed. Please try again.'; // Message d'erreur à afficher
    console.log(errorMessage.value);
  }
}
</script>

<template>
  <div class="signup-container">

    <div class="header">
      <UIcon
          name="icon-park-outline:return"
          class="returnIcon"
          @click="$emit('close-modal-signup')"
      />
    </div>

    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>

    <UForm :schema="schemaR" :state="stateR" class="px-44 space-y-4">
      <p class="font-antic text-center text-3xl pt-5">Sign Up</p>
      <UFormGroup label="First Name" required>
        <UInput v-model="stateR.firstName"/>
      </UFormGroup>

      <UFormGroup label="Last Name">
        <UInput v-model="stateR.lastName"/>
      </UFormGroup>

      <UFormGroup label="Email" required>
        <UInput v-model="stateR.email"/>
      </UFormGroup>

      <UFormGroup label="Password" required>
        <UInput v-model="stateR.password" type="password"/>
      </UFormGroup>

      <UFormGroup label="Email Bis">
        <UInput v-model="stateR.emailBis"/>
      </UFormGroup>

      <UFormGroup label="Phone Number">
        <UInput v-model="stateR.phone"/>
      </UFormGroup>

      <UFormGroup label="Phone Number Bis">
        <UInput v-model="stateR.phoneBis"/>
      </UFormGroup>
      <div class="pt-4 flex justify-center space-x-10">
        <UButton type="submit" class="btn" @click="onSubmitRegister(stateR)">Confirm</UButton>
        <UButton class="btn" @click="$emit('close-modal-signup')">Go sign in</UButton>
      </div>
    </UForm>

  </div>
</template>

<style scoped>
.signup-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: relative;
}

.signup-container::-webkit-scrollbar {
  display: none;
}

.signup-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.header {
  position: sticky;
  top: 0;
  background-color: #F0F0E8;
  padding: 15px 0;
  z-index: 20;
}

.returnIcon {
  width: 50px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
}

.btn {
  background: rgba(13, 86, 73, 0.9);
}

.btn:hover {
  background: rgba(16, 106, 90, 0.9);
}
</style>