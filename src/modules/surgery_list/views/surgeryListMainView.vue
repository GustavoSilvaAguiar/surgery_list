<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="content_header_wrap">
    <InputTextComponentVue title="Buscar Paciente/Médico" density="compact" />
    <BtnComponentVue prepend-icon="mdi-magnify" color="terciary"> Buscar </BtnComponentVue>
    <BtnComponentVue prepend-icon="mdi-filter" color="secondary">Filtro</BtnComponentVue>
    <BtnComponentVue prepend-icon="mdi-filter-off">Limpar Filtros</BtnComponentVue>
  </div>

  <v-data-table-server
    v-model:options="options"
    :items="paginatedItems"
    :items-length="protocolList.length"
    :loading="loading"
    :headers="headers"
    class="elevation-3"
  >
    <template #item.dataCriacao="{ value }">
      {{
        new Date(value).toLocaleDateString('pt-BR') +
        ' ' +
        new Date(value).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }}
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import BtnComponentVue from '@/components/BtnComponent.vue'
import InputTextComponentVue from '@/components/InputTextComponent.vue'
import { ref, watch } from 'vue'

const options = ref({
  page: 1,
  itemsPerPage: 5,
})

const paginatedItems = ref<
  Array<{
    id: number
    medico: string
    paciente: string
    status: string
    dataCriacao: string
  }>
>([])
const loading = ref(false)

watch(
  options,
  () => {
    loadPage()
  },
  { deep: true },
)

function loadPage() {
  loading.value = true

  setTimeout(() => {
    const start = (options.value.page - 1) * options.value.itemsPerPage
    const end = start + options.value.itemsPerPage
    paginatedItems.value = protocolList.slice(start, end)
    loading.value = false
  }, 500) // delay para simular API
}

const protocolList = [
  {
    id: 1,
    medico: 'Afonso Silva',
    paciente: 'Gustavo Santos',
    status: 'pending',
    dataCriacao: '2024-09-20T12:00:00Z',
  },
  {
    id: 2,
    medico: 'Fernando Santos',
    paciente: 'Jurandir Santos',
    status: 'closed',
    dataCriacao: '2024-09-21T09:32:00Z',
  },
  {
    id: 3,
    medico: 'Maria Souza',
    paciente: 'Larissa Braga',
    status: 'in_review',
    dataCriacao: '2024-09-22T14:10:00Z',
  },
  {
    id: 4,
    medico: 'João Pereira',
    paciente: 'Ricardo Lima',
    status: 'pending',
    dataCriacao: '2024-09-23T08:45:00Z',
  },
  {
    id: 5,
    medico: 'Leonardo Araújo',
    paciente: 'Helena Martins',
    status: 'closed',
    dataCriacao: '2024-09-24T16:30:00Z',
  },
  {
    id: 6,
    medico: 'Mariana Castro',
    paciente: 'Carlos Duarte',
    status: 'pending',
    dataCriacao: '2024-09-25T13:20:00Z',
  },
  {
    id: 7,
    medico: 'Eduardo Mendes',
    paciente: 'Amanda Rocha',
    status: 'in_review',
    dataCriacao: '2024-09-26T10:05:00Z',
  },
  {
    id: 8,
    medico: 'Patrícia Silva',
    paciente: 'Bruno Araújo',
    status: 'pending',
    dataCriacao: '2024-09-27T18:12:00Z',
  },
  {
    id: 9,
    medico: 'Rodrigo Matos',
    paciente: 'Juliana Ribeiro',
    status: 'closed',
    dataCriacao: '2024-09-28T09:55:00Z',
  },
  {
    id: 10,
    medico: 'Ana Ferreira',
    paciente: 'Marcelo Alves',
    status: 'pending',
    dataCriacao: '2024-09-29T11:40:00Z',
  },
  {
    id: 11,
    medico: 'Beatriz Nunes',
    paciente: 'Gabriel Santos',
    status: 'pending',
    dataCriacao: '2024-10-01T10:12:00Z',
  },
  {
    id: 12,
    medico: 'Roberto Carvalho',
    paciente: 'Tatiane Lopes',
    status: 'in_review',
    dataCriacao: '2024-10-02T15:47:00Z',
  },
  {
    id: 13,
    medico: 'Fábio Almeida',
    paciente: 'Pedro Melo',
    status: 'closed',
    dataCriacao: '2024-10-03T07:30:00Z',
  },
  {
    id: 14,
    medico: 'Helena Duarte',
    paciente: 'Isabela Cunha',
    status: 'pending',
    dataCriacao: '2024-10-04T09:25:00Z',
  },
  {
    id: 15,
    medico: 'Marcelo Paiva',
    paciente: 'Rafaela Gomes',
    status: 'in_review',
    dataCriacao: '2024-10-05T17:55:00Z',
  },
  {
    id: 16,
    medico: 'Patrícia Torres',
    paciente: 'Renato Luiz',
    status: 'pending',
    dataCriacao: '2024-10-06T12:15:00Z',
  },
  {
    id: 17,
    medico: 'Daniel Ferreira',
    paciente: 'Sandra Regina',
    status: 'closed',
    dataCriacao: '2024-10-07T08:05:00Z',
  },
  {
    id: 18,
    medico: 'Carla Menezes',
    paciente: 'Eduarda Dias',
    status: 'pending',
    dataCriacao: '2024-10-08T14:18:00Z',
  },
  {
    id: 19,
    medico: 'Henrique Souza',
    paciente: 'Tiago Costa',
    status: 'in_review',
    dataCriacao: '2024-10-09T13:22:00Z',
  },
  {
    id: 20,
    medico: 'Juliana Rocha',
    paciente: 'Patrícia Franco',
    status: 'closed',
    dataCriacao: '2024-10-10T10:02:00Z',
  },
]

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Médico', key: 'medico' },
  { title: 'Paciente', key: 'paciente' },
  { title: 'Status', key: 'status' },
  { title: 'Data de Criação', key: 'dataCriacao' },
]
</script>

<style scoped lang="scss">
.content_header_wrap {
  padding-top: 8px;
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: flex-end;
}
</style>
