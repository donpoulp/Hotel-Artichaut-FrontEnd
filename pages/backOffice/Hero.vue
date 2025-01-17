<script setup lang="ts">
import Welcome from "~/components/site/Welcome.vue";
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'back-office',
})

const state = reactive({
  title: undefined,
  content: undefined,
  picture: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) errors.push({ path: 'title', message: 'Required' })
  if (!state.content) errors.push({ path: 'content', message: 'Required' })
  if (!state.picture) errors.push({ path: 'picture', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data


  console.log(event.data)
}

async function onError(event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}



</script>

<template>
  <div class="bg-white">

    <div class="flex flex-col px-20">
      <h1 class="text-black text-3xl font-noto">Preview</h1>
      <div class="py-2">
        <Welcome/>
<!--        style="height: 588px; width: 1039px;"-->
      </div>
    </div>

    <div class="text-black pb-20">
      <h2 class="text-2xl font-noto px-20 text-black">Modify</h2>

<!--          <UContainer>-->
<!--            <div class="flex flex-col text-black">-->
<!--              <div class="flex flex-row">-->
<!--                <p>Title : {{$hero.data[0].title}}</p>-->
<!--                <p>Picture : </p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <p>Content : {{$hero.data[0].description}} </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </UContainer>-->

      <UForm :validate="validate" :state="state" class="space-y-4 text-black px-20" @submit="onSubmit" @error="onError">

        <div class="flex flex-row space-x-4">
          <UFormGroup label="Title" class="custom-label">
            <UInput v-model="state.title" class="custom-input"/>
          </UFormGroup>
          <UFormGroup label="Picture" class="custom-label">
            <UInput v-model="state.picture" class="custom-input"/>
          </UFormGroup>
        </div>

        <UFormGroup label="Content">
          <UInput v-model="state.content"/>
        </UFormGroup>
        <UButton type="submit">
          Update
        </UButton>

      </UForm>
    </div>

  </div>
</template>


<style scoped>
</style>