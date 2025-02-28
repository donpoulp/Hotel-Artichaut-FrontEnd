<script setup lang="ts">
import {useAboutDescriptionStore} from "~/store/about_description";

const aboutDescStore = useAboutDescriptionStore();
let hostel
let team

  aboutDescStore?.data?.forEach((item) => {
    if (item.title === 'History of Artichaut') {
      hostel = item
    }if (item.title === 'Our Team'){
      team = item
      console.log(team)
    }
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-center font-noto relative" :style="{backgroundImage: `url(${hostel.picture?.[0]?.picturePath})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}">

    <div class="bg-black bg-opacity-50 h h-screen flex items-center">
      <div class="flex flex-col space-y-10">
        <h1 class="font-antic text-center text-white">{{ hostel?.title }}</h1>
        <p class="text-center px-44 text-white">
          {{ hostel?.description }}
        </p>
      </div>
    </div>
  </div>

  <div :style="{backgroundColor: team.background_color}">
    <h1 class="font-antic colorspe text-center">{{ team?.title }}</h1>
    <div v-for="item in team?.teams">
      <div v-if="item.id % 2 == 0" class="p-12">
        <div class="flex flex-row items-center justify-start">
          <div class="bg-[#EDE798] h-[500px] w-[800px]">
            <h3 class="text-center font-bold text-[64px] font-noto">{{item?.name}}</h3>
            <div class="pt-[5%] flex flex-col items-center pr-12 pl-12">
              <ul class="ul_style_none">
                <li v-for="bullet_point in item.teams_strongest_point" class="text-[25px]">{{bullet_point?.text}}</li>
              </ul>
            </div>
          </div>
          <img v-if="item.name == 'The Sarrazin'" :src="item.picture?.[0]?.picturePath" class="h-[1000px] w-[900px] mt-[-250px] ml-[-200px]" />
          <img v-if="item.name != 'The Sarrazin'" :src="item.picture?.[0]?.picturePath" class="h-[700px] w-[600px] ml-[-30px]" />
        </div>
        <div class="flex flex-row items-center justify-center">
          <div v-if="item.name != 'The Sarrazin'" class="text-[30px] text-white mt-4 mb-4 font-antic">{{item?.description}}</div>
          <div v-if="item.name == 'The Sarrazin'" class="text-[30px] text-white mt-[-50px] mb-4 font-antic">{{item?.description}}</div>
        </div>
      </div>
      <div v-else class="p-12">
        <div class="flex flex-row items-center justify-center">
          <img v-if="item.name == 'The Sarrazin'" :src="item.picture?.[0]?.picturePath" class="h-[900px] w-[900px] mr-[-30px]" />
          <img v-if="item.name != 'The Sarrazin'" :src="item.picture?.[0]?.picturePath" class="h-[700px] w-[600px] mr-[-30px]" />
          <div class="bg-[#EDE798] h-[500px] w-[800px]">
            <h3 class="text-center font-bold text-[64px] font-noto">{{item?.name}}</h3>
            <div class="pt-[5%] flex flex-col items-center pr-12 pl-12">
              <ul class="ul_style_none">
                <li v-for="bullet_point in item.teams_strongest_point" class="text-[25px]">{{bullet_point?.text}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-center">
          <div class="text-[30px] text-white mt-4 mb-4 font-antic">{{item?.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.colorspe {
  background: -webkit-linear-gradient(0deg, #D8D27D 30%, #726F42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1 {
  font-size: 60px;
}

p {
  font-size: 20px;
}

.ul_style_none{
  list-style: inside;
}
</style>