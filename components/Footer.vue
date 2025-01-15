<template>
    <div class="footer">
        <div class="sectionSocialMedia">
            <p>Hôtel Artichaut</p>
            <div class="socialMedia">
                <UIcon name="ic:baseline-facebook" class="socialMediaIcon" />
                <UIcon name="ri:instagram-fill" class="socialMediaIcon" />
                <UIcon name="hugeicons:new-twitter" class="socialMediaIcon" />
            </div>
        </div>
        <div class="sectionContact">
            <ul>
                <li>Contact : 08 95 69 69 29 (0,40€ / min)</li>
                <li>Adress : Rue du Président Favre</li>
                <li>Privay policy</li>
            </ul>
        </div>
        <div class="sectionCopyright">
            <p>© 2025 Hôtel Artichaut</p>
        </div>
        <div class="sectionLorem">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div>
            <img src="/public/maps.png" alt="maps">
        </div>

    </div>
</template>





<style scoped>
.footer {
    height: 207px;
    background: linear-gradient(90deg, #0D5649 69%, #158470 100%);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.footer p, ul, li {
    font-family: Noto Serif;
    font-variation-settings: 'wght' 300;
    font-size: 22px;
}

.sectionSocialMedia {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.sectionSocialMedia p {
    font-family: Noto Serif;
    font-size: 31px;
    font-weight: 300;
}

.socialMedia {
    width: 80%;
    display: flex;
    justify-content: space-between;
}

.socialMediaIcon {
    width: 50px;
    height: 50px;
}

ul {
  text-align: center;
  margin: 0 auto;
}


.sectionLorem {
width: 160px;
}
</style>