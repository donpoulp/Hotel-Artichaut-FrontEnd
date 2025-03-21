<script setup lang="ts">
import {ref, reactive} from 'vue';
import Signup from './Signup.vue';
import {z} from 'zod';
import type {FormSubmitEvent} from "#ui/types";
import {useAuthStore} from "~/store/auth";

const showModalSignUp = ref(false);

function openSignUp() {
  showModalSignUp.value = true;
}

const authStore = useAuthStore();

const schema = z.object({
  email: z.string(),
  password: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

const errorMessage = ref('');

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Form submitted', event.data);
  // await authStore.fetchCsrfToken();
  try {
    await authStore.login(event.data);
    errorMessage.value = '';
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.value = 'Connection failed. Please try again.';
    console.log(errorMessage.value);
  }
}

</script>

<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop="">
      <template v-if="!showModalSignUp">
        <UIcon
            name="material-symbols:cancel-outline"
            class="closeIcon"
            @click="$emit('close-modal')"
        />

        <UForm class="px-44 space-y-4" :schema="schema" :state="state" @submit="onSubmit">
          <p class="font-antic text-center text-3xl pt-36">Sign In</p>

          <UFormGroup label="Email" required>
            <UInput placeholder="Enter your email" v-model="state.email"/>
          </UFormGroup>
          <UFormGroup label="Password" required>
            <UInput placeholder="Enter your password" v-model="state.password" type="password"/>
          </UFormGroup>
          <div class="pt-4 flex justify-center space-x-10">
            <UButton class="btn" type="submit" @click="$emit('close-modal')">Sign In</UButton>
            <UButton class="btn" @click="openSignUp">Sign Up</UButton>
            <UButton class="btn" @click="authStore.logout()" v-if="authStore.isAuthenticated">Log out</UButton>
          </div>
        </UForm>
      </template>
      <template v-else>
        <Signup @close-modal-signup="showModalSignUp = false"/>
      </template>
      <div v-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
}

.closeIcon {
  width: 50px;
  height: 50px;
  position: relative;
  left: 20px;
  top: 10px;
  cursor: pointer;
}

.modal {
  width: 40%;
  background-color: #F0F0E8;
  opacity: 90%;
  height: 770px;
}

.btn {
  background: rgba(13, 86, 73, 0.9);
}

.btn:hover {
  background: rgba(16, 106, 90, 0.9);
}
</style>