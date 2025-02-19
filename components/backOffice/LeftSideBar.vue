<script setup lang="ts">

import DropDownMenu from "~/components/backOffice/DropDownMenu.vue";
</script>

<template>
  <section class="left-side-bar">
    <div class="top-left-side-bar">
      <img src="/public/back-office-img/fauxuser.png">
      <div class="top-left-side-bar-content">
        <p>Admin1253</p>
        <button class="btn-top-left-side-bar-content">Profile</button>
      </div>
    </div>

    <div class="left-side-bar-line"></div>

    <NuxtLink to="/backOffice">
    <div class="left-side-bar-dashboard">
      <div v-if="$route.path == '/backOffice'" class="selected-left-side-bar"></div>
      <UIcon name="i-ph:house-simple-bold" class="dashboard-icon"></UIcon>
      <h5>Dashboard</h5>
    </div>
    </NuxtLink>

    <div class="left-side-bar-line"></div>

    <div class="left-side-bar-dashboard">
      <div v-if="$route.path == '/backOffice/Hero' || $route.path == '/backOffice/Strongest' || $route.path == '/backOffice/News' || $route.path == '/backOffice/Footer'" class="selected-left-side-bar"></div>
      <UIcon name="i-ph:list-bullets-fill" class="dashboard-icon"></UIcon>
      <DropDownMenu></DropDownMenu>
    </div>

    <div class="left-side-bar-line"></div>

    <div class="left-side-bar-dashboard">
      <div v-if="$route.path == '/backOffice/reservation'" class="selected-left-side-bar"></div>
      <UIcon name="i-ph:book-bold" class="dashboard-icon"></UIcon>
      <h5>Reservation</h5>
    </div>

    <div class="left-side-bar-line"></div>

    <NuxtLink to="/backOffice/bedroom">
    <div class="left-side-bar-dashboard">
      <div v-if="$route.path == '/backOffice/bedroom'" class="selected-left-side-bar"></div>
      <UIcon name="i-ph:key" class="dashboard-icon"></UIcon>
      <h5>Bedroom</h5>
    </div>
  </NuxtLink>

    <div class="left-side-bar-line"></div>

    <div class="left-side-bar-dashboard">
      <div v-if="$route.path == '/backOffice/user'" class="selected-left-side-bar"></div>
      <UIcon name="i-ph:user-circle-duotone" class="dashboard-icon"></UIcon>
      <h5>User</h5>
    </div>

    <div class="left-side-bar-line"></div>

  </section>
</template>

<style scoped>
.left-side-bar{
  width: fit-content;
  height: 100vh;
  background-color: rgba(13, 86, 73, 0.9);
}
.top-left-side-bar{
  width: 250px;
  padding: 4%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-left-side-bar img {
  margin-right: 2%;
}
.top-left-side-bar-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.top-left-side-bar-content p{
  font-size: 20px;
  font-family: "Noto Serif", serif;
}
.btn-top-left-side-bar-content{
  padding: 1%;
  background-color: #D8D27D;
  font-family: "Noto Serif",serif;
  color: #0D5649;
}
.left-side-bar-line{
  width: 100%;
  height: 1px;
  background-color: #D8D27D;
}
.left-side-bar-dashboard{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 85px;
  color: #D8D27D;
}
.selected-left-side-bar{
  height: 85px;
  width: 15px;
  background-color: rgba(216, 210, 125, 0.5);
  margin-right: 5%;
}
.dashboard-icon{
  width: 50px;
  height: 50px;
}
.left-side-bar-dashboard h5{
  font-family: "Noto Serif", serif;
  font-weight: bold;
  margin-top: 3%;
  margin-left: 2%;
  font-size: 25px;
}
</style>