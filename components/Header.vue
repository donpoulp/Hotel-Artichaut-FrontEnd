<template>
    <header>
        <div class="langue">
            <UIcon name="flag:gb-4x3" class="langueIcon" />
            <p>English</p>
        </div>
        <div class="mainLogoContainer">
            <img src="/public/Logo.png" alt="logo" class="logo">
        </div>
        <div class="nav">
            <UIcon name="material-symbols:shopping-bag-outline" class="cartIcon" />
            <UIcon name="humbleicons:user" class="userIcon" />
        </div>
    </header>
    </template>

<script setup>
// Pas besoin de script ici si tu n'as pas de logique
</script>

<style scoped>
header {
    height: 207px;
    background: linear-gradient(90deg, #0D5649 69%, #158470 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.langue {
    display: flex;
    justify-content: space-between;
    width: 250px;
}

.langueIcon {
    width: 80px;
    height: 60px;
    border-radius: 10px;
    margin-left: 20px;
}

.langue p {
    font-family: Noto Serif;
    font-size: 40px;
}

.nav {
    width: 250px;
    display: flex;
    justify-content: space-evenly;
    padding-right: 80px;

}

.nav .cartIcon, .userIcon {
    width: 80px;
    height: 100px;
}
</style>