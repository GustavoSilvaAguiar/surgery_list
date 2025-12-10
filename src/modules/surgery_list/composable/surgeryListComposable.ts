import { ref, onMounted, watch, computed } from 'vue'
import surgeryService from '@/services/Surgery/surgeryService'
import type IFilter from '@/interfaces/filterInterface'
import type ISurgeryListItem from '@/interfaces/surgeryListItemInterface'
import { fi } from 'vuetify/locale'

export function useSurgeryListComposable() {
  const options = ref({
    page: 1,
    itemsPerPage: 10,
  })

  const loading = ref<boolean>(false)
  const surgeryList = ref<ISurgeryListItem[]>([])
  const totalItems = ref(0)
  const filterDialog = ref<boolean>(false)

  const hasActiveFilters = computed(() => {
    return (
      !!filters.value.medico ||
      !!filters.value.paciente ||
      !!filters.value.nomeMedicoPaciente ||
      !!filters.value.dataNascimento ||
      !!filters.value.dataCriacaoInicio ||
      !!filters.value.dataCriacaoFim
    )
  })

  const filters = ref<IFilter>({
    page: 1,
    limit: 10,
    nomeMedicoPaciente: '',
  })

  function clearFilters() {
    filters.value = {
      page: 1,
      limit: filters.value.limit,
      medico: '',
      paciente: '',
      nomeMedicoPaciente: '',
      dataNascimento: undefined,
      dataCriacaoInicio: undefined,
      dataCriacaoFim: undefined,
    }

    options.value.page = 1
    loadSurgeryList()
  }

  async function loadSurgeryList() {
    loading.value = true

    filters.value.page = options.value.page
    filters.value.limit = options.value.itemsPerPage

    const res = await surgeryService.getSurgeryList(filters.value)

    surgeryList.value = res.items
    totalItems.value = res.total

    loading.value = false
  }

  onMounted(loadSurgeryList)

  watch(options, loadSurgeryList, { deep: true })

  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Médico', key: 'medico.nome' },
    { title: 'Paciente', key: 'paciente.nome' },
    { title: 'Data de Criação', key: 'dataCriacao' },
  ]

  return {
    options,
    loading,
    surgeryList,
    totalItems,
    filters,
    headers,
    filterDialog,
    hasActiveFilters,
    loadSurgeryList,
    clearFilters,
  }
}
