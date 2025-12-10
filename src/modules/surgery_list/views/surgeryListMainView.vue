<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="content_header_wrap">
    <InputTextComponentVue
      title="Buscar Paciente/Médico"
      density="compact"
      v-model="filters.nomeMedicoPaciente"
    />
    <BtnComponentVue prepend-icon="mdi-magnify" color="terciary" :onclick="loadSurgeryList"> Buscar </BtnComponentVue>
    <BtnComponentVue prepend-icon="mdi-filter" color="secondary">Filtro</BtnComponentVue>
    <BtnComponentVue prepend-icon="mdi-filter-off">Limpar Filtros</BtnComponentVue>
  </div>

  <v-data-table-server
    v-model:options="options"
    :items="surgeryList"
    :items-length="totalItems"
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
import type IFilter from '@/interfaces/filterInterface'
import type ISurgeryListItem from '@/interfaces/surgeryListItemInterface'
import surgeryService from '@/services/Surgery/surgeryService'
import { onMounted, ref, watch } from 'vue'

const options = ref({
  page: 1,
  itemsPerPage: 10,
})

const loading = ref(false)
const surgeryList = ref<ISurgeryListItem[]>([])
const totalItems = ref(0)

const filters = ref<IFilter>({
  page: 1,
  limit: 5,
})

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
