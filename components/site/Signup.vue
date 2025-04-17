<script setup lang="ts">
import {z} from 'zod'
import {reactive, ref} from 'vue'
import {useAuthStore} from "~/store/auth";

const selectLangue = useState('selectedLangue');

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
}).partial()

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
 const successMessage = ref('');

const emit = defineEmits(['close-modal-signup']);

async function onSubmitRegister(data) {
  if (data.email === undefined || data.password === undefined){
    errorMessage.value = selectLangue?.ref === 'En' ? 'Please fill in all fields !' : 'Veuillez remplir tout les champs';
    successMessage.value = '';
  }else {
    try {
      const registrationError = await authStore.register(data);
      if (registrationError) {
        errorMessage.value = registrationError;
        successMessage.value = '';
      } else {
        successMessage.value = selectLangue?.ref === 'En' ? 'Registration successful !' : 'Enregistrement reussie !';
        errorMessage.value = '';
        setTimeout(() => {
          reloadNuxtApp()
        }, 2000);
      }
    } catch (error) {
      console.error('registration error:', error);
      errorMessage.value = error.message || 'Une erreur inconnue est survenue lors de l’inscription.';
      successMessage.value = '';
    }
  }
}

const isActiveMail = ref(false)
const isActivePhone = ref(false)

function displayMailBis(){
  let mailBis = document.querySelector(".emailBis").style.display;
  if (mailBis == "none") {
    document.querySelector(".emailBis").style.display = "block"
    isActiveMail.value = true
  }else{
    document.querySelector(".emailBis").style.display = "none"
    isActiveMail.value = false
  }
}
function displayPhoneBis(){
  let phoneBis = document.querySelector(".phoneBis").style.display;
  if (phoneBis == "none") {
    document.querySelector(".phoneBis").style.display = "block"
    isActivePhone.value = true
  }else{
    document.querySelector(".phoneBis").style.display = "none"
    isActivePhone.value = false
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

        <form class="signup-form">
            <div class="inputs">
                <p>Sign Up</p>
                <input type="text" placeholder="Last Name">
                <input type="text" placeholder="First Name">
                <input type="email" placeholder="Email">
                <input type="email" placeholder="Email bis">
                <input type="password" placeholder="Password">
                <input type="password" placeholder="Confirm Password">
                <input type="tel" placeholder="Phone Number">
                <input type="tel" placeholder="Phone Number bis">
            </div>
            <div class="buttons">
                <button>Sign Up</button>
                <button>Sign In</button>
            </div>
        </form>

    <UForm :schema="schemaR" :state="stateR" class="px-44 space-y-4">
      <p class="font-antic text-center text-3xl pt-5">Sign Up</p>

       <div v-if="errorMessage" class="text-center error-message">
       <p>{{ errorMessage }}</p>
      </div>
      <div v-if="successMessage" class="text-center success-message">
        <p>{{ successMessage }}</p>
      </div>

      <UFormGroup label="First Name" required>
        <UInput v-model="stateR.firstName"/>
      </UFormGroup>

      <UFormGroup label="Last Name">
        <UInput v-model="stateR.lastName"/>
      </UFormGroup>

      <UFormGroup label="Password" required>
        <UInput v-model="stateR.password" type="password"/>
      </UFormGroup>

      <UFormGroup label="Email" required>
        <UInput v-model="stateR.email"/>
      </UFormGroup>

      <UFormGroup label="Email Bis" name="emailBis" class="emailBis" style="display: none">
        <UInput v-model="stateR.emailBis"/>
      </UFormGroup>
      <UButton class="btn_phone mt-2" size="sm" color="primary" square variant="solid" @click="displayMailBis()">
        <UIcon :name="isActiveMail ? 'material-symbols:remove' : 'material-symbols:add'"/>
      </UButton>

      <UFormGroup label="Phone Number" required>
        <UInput v-model="stateR.phone"/>
      </UFormGroup>

      <UFormGroup label="Phone Number Bis" name="phoneBis" class="phoneBis mt-2" style="display: none">
        <UInput v-model="stateR.phoneBis"/>
      </UFormGroup>
      <UButton class="btn_phone mt-2" size="sm" color="primary" square variant="solid" @click="displayPhoneBis()">
        <UIcon :name="isActivePhone ? 'material-symbols:remove' : 'material-symbols:add'"/>
      </UButton>

      <div class="pt-4 flex justify-center space-x-10">
        <UButton type="submit" class="btn" @click="onSubmitRegister(stateR)">Confirm</UButton>
        <UButton class="btn" @click="$emit('close-modal-signup')">Go sign in</UButton>
      </div>
    </UForm>

  </div>
</template>

<style scoped>

.error-message {
  color: red;
}

.success-message {
  color: green;
}

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