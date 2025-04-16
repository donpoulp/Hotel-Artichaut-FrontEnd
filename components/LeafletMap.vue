<template>
  <div id="map" class="w-full h-[500px] shadow-md"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  if (process.client) {
    const L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')

    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    })

    const map = L.map('map').setView([45.903245, 6.126034], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    L.marker([45.903245, 6.126034])
        .addTo(map)
        .bindPopup('Hôtel Artichaut 🇫🇷')
        .openPopup()
  }
})
</script>

<style scoped>
#map {
  height: 190px;
}
</style>