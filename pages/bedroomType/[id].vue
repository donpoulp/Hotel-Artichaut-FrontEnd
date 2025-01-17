<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const route = useRoute()

const carouselConfig = {
  itemsToShow: 3,
  wrapAround: true
}

const { status, data: bedroomsType } = useFetch('http://127.0.0.1:8000/api/bedroomType/'+route.params.id, {lazy: true})
</script>

<template>
  <section class="RoomPageSection">
    <div class="RoomPageTop">
      <div>
        <img class="RoomPageImg" src="/public/image%2020.png">
      </div>
      <div class="RoomPageContent">
        <h3>{{ bedroomsType[0].name }}</h3>
        <p>{{ bedroomsType[0].description }}</p>
      </div>
    </div>
    <div class="RoomPageBtn">
      <div class="RoomPageBtnBox">
        <div class="RoomPageBtnBoxLeft">
          <ButtonWithIcon width="175px" height="50px" fontSize="22px" title="Service" icon="ph:arrows-vertical-bold"></ButtonWithIcon>
          <Button width="175px" height="50px" fontSize="22px" title="View all services"></Button>
        </div>
        <div class="RoomPageBtnBoxRight">
          <div class="RoomPageBtnBoxRightBtnCart"><UIcon name="i-ph:calendar-blank" class="RoomPageCartIcon" /><Button width="175px" height="50px" fontSize="22px" title="Choose date"></Button></div>
          <div class="RoomPageBtnBoxRightBtnCart"><UIcon name="material-symbols:shopping-bag-outline" class="RoomPageCartIcon" /><Button width="175px" height="50px" fontSize="22px" title="Add to cart"></Button></div>
          <div class="RoomPageTotalPrice">Total : 0000.00 $</div>
        </div>
      </div>
    </div>
    <div class="RoomPageCarrousel">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="bedroom in bedroomsType" :key="bedroom">
          <img class="bedroomTypeImg1" src="/public/image%2026.png">
        </Slide>
        <template #addons class="addonsCarrousel">
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
img,video{
  max-width: none!important;
}
.RoomPageSection{
  background-color: #F0F0E8;
  padding: 5% 10%;
}
.RoomPageTop{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.RoomPageImg{
  width: 588px;
  height: 388px;
}
.RoomPageContent{
  width: 50%;
  display: flex;
  flex-direction: column;
}
.RoomPageContent h3{
  font-family: "Noto Serif",serif;
  font-size: 48px;
  font-weight: 300;
  margin-bottom: 3%;
}
.RoomPageContent p{
  font-family: "Noto Serif",serif;
  font-size: 30px;
  font-weight: 300;
}
.RoomPageBtn{
  padding: 0 3%;
}
.RoomPageBtnBox{
  margin-top: 2%;
  height: 175px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.RoomPageBtnBoxLeft{
  width: 28%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.RoomPageBtnBoxRight{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.RoomPageTotalPrice{
  width: 175px;
  height: 50px;
  color: black;
  background-color: #FFF3F3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
.RoomPageCartIcon{
  width: 50px;
  height: 50px;
}
.RoomPageBtnBoxRightBtnCart{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.RoomPageCarrousel{
  margin: 0% 1%;
  margin-top: 3%;
}
</style>