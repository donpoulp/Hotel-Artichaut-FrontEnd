<script setup lang="ts">
import {ref, reactive} from 'vue';
import Signup from './Signup.vue';
import {z} from 'zod';
import type {FormSubmitEvent} from "#ui/types";
import {useAuthStore} from "~/store/auth";

const selectLangue = useState('selectedLangue');

const showModalSignUp = ref(false);

function openSignUp() {
  showModalSignUp.value = true;
}

const authStore = useAuthStore();

const schema = z.object({
  email: z.string(),
  password: z.string(),
})

const state = reactive({
  email: undefined,
  password: undefined,
})

const errorMessage = ref('');
const successMessage = ref('');

async function onSubmit(user) {
  console.log('Form submitted', user);
  // await authStore.fetchCsrfToken();
  if (user.email === undefined || user.password === undefined){
    errorMessage.value = selectLangue?.ref === 'En' ? 'Please fill in all fields !' : 'Veuillez remplir tout les champs';
    successMessage.value = '';
  }else{
    try {
      await authStore.login(user);
      successMessage.value = selectLangue?.ref === 'En' ? 'Login successful !' : 'Connexion reussie';
      errorMessage.value = '';
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage.value = error.message;
      successMessage.value = '';
    }
  }
}

const emit = defineEmits(['close-modal']);

const myAccountClick = () => {
  navigateTo('site/Account')
  emit('close-modal')
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

        <UForm class="px-44 space-y-4" :schema="schema" :state="state">
          <p class="font-antic text-center text-3xl pt-36">Sign In</p>

          <div v-if="errorMessage" class="text-center error-message">
            <p>{{ errorMessage }}</p>
          </div>
          <div v-if="successMessage" class="text-center success-message">
            <p>{{ successMessage }}</p>
          </div>

          <UFormGroup label="Email" required>
            <UInput placeholder="Enter your email" v-model="state.email"/>
          </UFormGroup>
          <UFormGroup label="Password" required>
            <UInput placeholder="Enter your password" v-model="state.password" type="password"/>
          </UFormGroup>
          <div class="pt-4 flex justify-center space-x-10">
            <UButton class="btn" type="submit" @click="onSubmit({'email': state.email, 'password': state.password})" v-if="!authStore.isAuthenticated">Sign In</UButton>
            <UButton class="btn" @click="openSignUp" v-if="!authStore.isAuthenticated">Sign Up</UButton>
            <UButton class="btn" @click="authStore.logout()" v-if="authStore.isAuthenticated">Log out</UButton>
            <UButton class="btn" @click="myAccountClick" v-if="authStore.isAuthenticated">My account</UButton>
          </div>
        </UForm>
      </template>
      <template v-else>
        <Signup @close-modal-signup="showModalSignUp = false"/>
      </template>
    </div>
  </div>
</template>

<style scoped>

.error-message {
  color: red;
}

.success-message {
  color: green;
}
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