<script setup lang="ts">
import {useFooterStore} from "~/store/footer";
import LeafletMap from '~/components/LeafletMap.vue'

const footerStore = useFooterStore();
const selectLangue = useState('selectedLangue');
</script>

<template>
    <div class="footer text-white" :style="{ backgroundColor: footerStore.data.background_color, opacity: footerStore.data.background_opacity / 100 }">
        <div class="sectionSocialMedia">
            <p>{{ footerStore.data[`title${selectLangue?.ref}`] }}</p>
            <div class="socialMedia">
                <ULink v-for="icon in footerStore.data.icon" :to="icon.link">
                  <UIcon :name="icon.iconPath" class="socialMediaIcon"/>
                </ULink>
            </div>
        </div>
      <div class="sectionCopyright text-center">
        <p class="text-2xl">{{ footerStore.data[`text${selectLangue?.ref}`] }}</p>
        <p class="mt-4 text-xl">© 2025 {{ footerStore.data[`title${selectLangue?.ref}`] }}</p>
      </div>
        <div class="sectionContact">
            <ul>
              <li><strong>Contact</strong> : 08 95 69 69 29 (0,40€ / min)</li>
                <li><strong v-text="selectLangue?.ref === 'En' ? 'Adress' : 'Adresse'"></strong> : Rue du Président Favre</li>
                <li class="text-center mt-2 italic"><strong class="font-normal" v-text="selectLangue?.ref === 'En' ? 'Privay policy' : 'Politique de confidentialité'"></strong></li>
            </ul>
        </div>
        <div class="sectionMap">
          <client-only>
            <LeafletMap />
          </client-only>
        </div>
    </div>
</template>


<style scoped>
.footer {
  height: 207px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer p, ul, li {
  font-family: Noto Serif;
  font-weight: 300;
}

.sectionSocialMedia {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 3%;
}

.sectionSocialMedia p {
  font-family: Noto Serif;
  font-size: 32.5px;
  font-weight: 400;
  text-decoration: underline;
}

.socialMedia {
  width: 90%;
  display: flex;
  flex-direction: row;
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

.sectionMap{
  width: 300px;
  margin-right: 10px;
}

.sectionContact ul{
  font-size: 20px;
  text-align: start;
}
</style>