<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import dayjs from 'dayjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps<{
  stats: {
    reservations?: Array<{ date: string; count: number }>
    users?: Array<{ date: string; count: number }>
  }
}>()

const start = dayjs().startOf('month')
const end = dayjs()
const datesInMonth: string[] = []
let current = start

while (current.isBefore(end) || current.isSame(end)) {
  datesInMonth.push(current.format('YYYY-MM-DD'))
  current = current.add(1, 'day')
}

const reservationData = props.stats.reservations ?? []
const userData = props.stats.users ?? []

const statsMapReservations = Object.fromEntries(reservationData.map(item => [item.date, item.count]))
const statsMapUsers = Object.fromEntries(userData.map(item => [item.date, item.count]))

const chartData = {
  labels: datesInMonth,
  datasets: [
    {
      label: 'Réservations',
      data: datesInMonth.map(date => statsMapReservations[date] || 0),
      borderColor: '#2563eb',
      backgroundColor: '#3b82f6',
      tension: 0.4
    },
    {
      label: 'Utilisateurs créés',
      data: datesInMonth.map(date => statsMapUsers[date] || 0),
      borderColor: '#16a34a',
      backgroundColor: '#22c55e',
      tension: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Activité du mois en cours'
    }
  },
  scales: {
    y: {
      ticks: {
        precision: 0,
        stepSize: 1,
        callback: function (value: number) {
          return Number.isInteger(value) ? value : null
        }
      },
      beginAtZero: true
    }
  }
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<style scoped>

</style>