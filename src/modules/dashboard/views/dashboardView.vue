<template>
  <div class="loading" v-if="loading">
    <v-progress-circular color="primary" indeterminate :size="94" :width="11"></v-progress-circular>
  </div>

  <div v-else>
    <PageTitleComponentVue>Dashboard</PageTitleComponentVue>

    <div class="dashboard_wrap">
      <v-card class="card" elevation="3">
        <v-card-title class="text-h6">Percentual por faixa etária</v-card-title>
        <v-card-text class="chart-container">
          <Doughnut :data="chartFaixaEtaria" :options="chartOptions" />
        </v-card-text>
      </v-card>

      <v-card class="card" elevation="3">
        <v-card-title class="text-h6">Agendamentos dos últimos 12 meses</v-card-title>
        <v-card-text class="chart-container">
          <Line :data="chartUltimos12Meses" :options="chartOptions" />
        </v-card-text>
      </v-card>

      <v-card class="card" elevation="3">
        <v-card-title class="text-h6">Agendamentos por médico (últimos 12 meses)</v-card-title>
        <v-card-text class="chart-container">
          <Bar :data="chartMedicos12Meses" :options="chartOptions" />
        </v-card-text>
      </v-card>

      <v-card class="card" elevation="3">
        <v-card-title class="text-h6">Percentual de agendamentos por médico</v-card-title>
        <v-card-text class="chart-container">
          <Doughnut :data="chartPercentualMedicos" :options="chartOptions" />
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut, Line, Bar } from 'vue-chartjs'
import { useDashboardComposable } from '../composable/dashboardComposable'
import type { ChartOptions } from 'chart.js'
import PageTitleComponentVue from '@/components/PageTitleComponent.vue'

const {
  loading,
  chartFaixaEtaria,
  chartUltimos12Meses,
  chartMedicos12Meses,
  chartPercentualMedicos,
} = useDashboardComposable()

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
      },
    },
  },
} satisfies ChartOptions<'doughnut'>
</script>

<style scoped lang="scss">
.dashboard_wrap {
  display: grid;
  gap: 12px;
  padding: 16px;

  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.card {
  height: 350px;
  display: flex;
  flex-direction: column;
}

.chart-container {
  flex: 1;
  min-height: 0;
  position: relative;
}

.chart-container canvas {
  max-width: 100% !important;
  max-height: 100% !important;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
