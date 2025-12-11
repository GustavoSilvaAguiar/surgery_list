import { ref, computed, watchEffect } from 'vue'
import dayjs from 'dayjs'
import type IFilter from '@/interfaces/filterInterface'
import type ISurgeryListItem from '@/interfaces/surgeryListItemInterface'
import surgeryService from '@/services/Surgery/surgeryService'

export function useDashboardComposable() {
  const filters = ref<IFilter>({
    page: undefined,
    limit: undefined,
    sortBy: [{ key: 'dataCriacao', order: 'asc' }],
  })

  const loading = ref(false)
  const items = ref<ISurgeryListItem[]>([])
  const total = ref<number>(0)

  function getAge(dateString: Date) {
    const diff = Date.now() - new Date(dateString).getTime()
    return Math.abs(new Date(diff).getUTCFullYear() - 1970)
  }

  function getAgeRange(age: number) {
    if (age <= 12) return 'Criança'
    if (age <= 17) return 'Adolescente'
    if (age <= 59) return 'Adulto'
    return 'Idoso'
  }

  function last12MonthsLabels() {
    const arr: string[] = []
    for (let i = 11; i >= 0; i--) {
      arr.push(dayjs().subtract(i, 'month').format('MMM/YYYY'))
    }
    return arr
  }

  async function loadData() {
    loading.value = true
    try {
      const { items: responseItems, total: totalItems } = await surgeryService.getSurgeryList(
        filters.value,
      )

      items.value = responseItems
      total.value = totalItems
    } finally {
      loading.value = false
    }
  }

  watchEffect(loadData)

  const chartFaixaEtaria = computed(() => {
    const ranges = ['Criança', 'Adolescente', 'Adulto', 'Idoso']

    const counts = {
      Criança: 0,
      Adolescente: 0,
      Adulto: 0,
      Idoso: 0,
    }

    items.value.forEach((item) => {
      const idade = getAge(item.paciente.dataNascimento)
      const faixa = getAgeRange(idade)
      counts[faixa]++
    })

    return {
      labels: ranges,
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
        },
      ],
    }
  })

  const chartUltimos12Meses = computed(() => {
    const months = last12MonthsLabels()
    const monthlyCounts = Object.fromEntries(months.map((m) => [m, 0]))

    items.value.forEach((item) => {
      const month = dayjs(item.dataCriacao).format('MMM/YYYY')
      if (monthlyCounts[month] !== undefined) monthlyCounts[month]++
    })

    return {
      labels: months,
      datasets: [
        {
          label: 'Agendamentos',
          data: Object.values(monthlyCounts),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54,162,235,0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    }
  })

  const chartMedicos12Meses = computed(() => {
    const months = last12MonthsLabels()
    const medicoCounts: Record<string, Record<string, number>> = {}

    items.value.forEach((item) => {
      const month = dayjs(item.dataCriacao).format('MMM/YYYY')
      if (!months.includes(month)) return

      const medico = item.medico.nome

      if (!medicoCounts[medico]) {
        medicoCounts[medico] = Object.fromEntries(months.map((m) => [m, 0]))
      }

      if (medicoCounts[medico][month] !== undefined) {
        medicoCounts[medico][month]++
      }
    })

    const datasets = Object.entries(medicoCounts).map(([medico, data]) => ({
      label: medico,
      data: Object.values(data),
      backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    }))

    return {
      labels: months,
      datasets,
    }
  })

  const chartPercentualMedicos = computed(() => {
    const counts: Record<string, number> = {}

    items.value.forEach((item) => {
      const medico = item.medico.nome
      counts[medico] = (counts[medico] || 0) + 1
    })

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'],
        },
      ],
    }
  })

  return {
    loading,
    items,
    total,
    filters,

    loadData,

    chartFaixaEtaria,
    chartUltimos12Meses,
    chartMedicos12Meses,
    chartPercentualMedicos,
  }
}
