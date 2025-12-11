import { ref, onMounted, watch, computed } from 'vue'
import surgeryService from '@/services/Surgery/surgeryService'
import type IFilter from '@/interfaces/filterInterface'
import type ISurgeryListItem from '@/interfaces/surgeryListItemInterface'

export function useSurgeryListComposable() {
  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [] as { key: string; order: 'asc' | 'desc' }[],
  })
  const loading = ref<boolean>(false)
  const surgeryList = ref<ISurgeryListItem[]>([])
  const totalItems = ref(0)
  const filterDialog = ref<boolean>(false)
  const modalDialog = ref<boolean>(false)
  const isReady = ref<boolean>(false)
  const itemDetail = ref<ISurgeryListItem>({} as ISurgeryListItem)

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
    filters.value.sortBy = options.value.sortBy
    const res = await surgeryService.getSurgeryList(filters.value)

    surgeryList.value = res.items
    totalItems.value = res.total

    loading.value = false
  }

  const getIdade = (dataNascimento: string | Date): number => {
    const dataNasc = new Date(dataNascimento)
    const hoje = new Date()

    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--
    }

    return idade
  }

  const showItemDetail = (item: ISurgeryListItem) => {
    itemDetail.value = item
    modalDialog.value = !modalDialog.value
  }

  onMounted(async () => {
    options.value.sortBy = [{ key: 'dataCriacao', order: 'asc' }]

    await loadSurgeryList()

    isReady.value = true
  })

  watch(
    options,
    () => {
      if (!isReady.value) return
      loadSurgeryList()
    },
    { deep: true },
  )

  const headers = [
    { title: 'ID', key: 'id', sortable: true },
    { title: 'Paciente', key: 'paciente.nome', sortable: true },
    { title: 'Idade', key: 'paciente.dataNascimento', sortable: true },
    { title: 'Médico', key: 'medico.nome', sortable: true },
    { title: 'Data de Criação', key: 'dataCriacao', sortable: true },
    { title: 'Ações', key: 'actions' },
  ]

  return {
    options,
    loading,
    surgeryList,
    totalItems,
    filters,
    headers,
    filterDialog,
    modalDialog,
    hasActiveFilters,
    itemDetail,
    loadSurgeryList,
    clearFilters,
    getIdade,
    showItemDetail,
  }
}
