<script setup>
import { z } from 'zod'
import { reactive } from 'vue'
import Welcome from "~/components/site/Welcome.vue";
import {useHeroStore} from "~/store/hero.js";

definePageMeta({
  layout: 'back-office',
  middleware: 'auth',
})

const selectLangue = useState('selectedLangue');

const heroStore = useHeroStore();

const schema = z.object({
  title: z.string(),
  description: z.string(),
  picture: z.object({
    base64: z.string(),
    name: z.string(),
  }),
})

const state = reactive({
  title: undefined,
  description: undefined,
  picture: undefined,
})

async function onSubmit(hero) {
  const formData = {
    id: hero.id,
    titleFr: hero.titleFr,
    titleEn: hero.titleEn,
    descriptionFr: hero.descriptionFr,
    descriptionEn: hero.descriptionEn,
    picture: state.picture,
  };

  await heroStore.updateHeroData(formData);
  reloadNuxtApp()
}

const handleFileUpload = (event) => {
  const file = event[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      state.picture = {'base64': base64Image, 'name': file.name};
    };
    reader.readAsDataURL(file);
  }
};
</script>


<<template>
  <div class="flex flex-col pt-10 px-10 pb-10">
    <h1 class="text-3xl font-noto pb-4 text-gray-800" v-text="selectLangue?.ref === 'En' ? 'Preview' : 'Aperçu'"></h1>
    <div class="py-2">
      <Welcome :title="heroStore.data[0][`title${selectLangue?.ref}`]" :description="heroStore.data[0].descriptionEn" :picture="heroStore.data[0].picture" />
    </div>

    <div class="pt-5 mb-10">
      <div class="flex flex-row justify-between items-center pb-2">
        <h2 class="text-2xl font-noto text-gray-800" v-text="selectLangue?.ref === 'En' ? 'Modify' : 'Modifier'"></h2>
        <UButton @click="onSubmit(heroStore.data[0])" type="submit" class="text-xl font-noto">
          {{ selectLangue?.ref === 'En' ? 'Update' : 'Mettre à jour' }}
        </UButton>
      </div>

      <UForm :schema="schema" :state="state" class="space-y-6">
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            {{ selectLangue?.ref === 'En' ? 'General Information' : 'Informations Générales' }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Title' : 'Titre'" required>
              <UInput v-model="heroStore.data[0][`title${selectLangue?.ref}`]" />
            </UFormGroup>

            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Content' : 'Contenu'" required>
              <UTextarea rows="2" maxrows="4" v-model="heroStore.data[0][`description${selectLangue?.ref}`]" class="w-full md:w-[580px]" />
            </UFormGroup>
          </div>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            {{ selectLangue?.ref === 'En' ? 'Picture' : 'Photo' }}
          </h3>

          <div class="flex flex-row gap-6">
            <UFormGroup :label="selectLangue?.ref === 'En' ? 'Upload Image' : 'Télécharger l’image'" class="w-full">
              <UInput class="custom-input" type="file" @change="handleFileUpload($event)" />
            </UFormGroup>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>

<style scoped>
.custom-label {
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
}

.custom-input {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  transition: border-color 0.3s ease;
}

.custom-input:focus {
  border-color: #0D5649;
  outline: none;
}
</style>
