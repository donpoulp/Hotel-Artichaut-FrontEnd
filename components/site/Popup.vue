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
            <UInput placeholder="Enter your password" v-model="state.password"/>
          </UFormGroup>
          <div class="pt-4 flex justify-center space-x-10">
            <UButton class="btn" type="submit">Sign In</UButton>
            <UButton class="btn" @click="openSignUp">Sign Up</UButton>
          </div>
        </UForm>
      </template>
      <template v-else>
        <Signup @close-modal-signup="showModalSignUp = false"/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import Signup from './Signup.vue';
import {useUserStore} from "~/store/user";
import {z} from 'zod';
import type {FormSubmitEvent} from "#ui/types";

const showModalSignUp = ref(false);

function openSignUp() {
  showModalSignUp.value = true;
}

const userStore = useUserStore();

const schema = z.object({
  email: z.string(),
  password: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Form submitted', event.data);
  await userStore.login(event.data);
}
</script>

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
</style>