<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="content_header_wrap">
    <InputTextComponentVue
      title="Buscar Paciente/Médico"
      density="compact"
      v-model="filters.nomeMedicoPaciente"
    />
    <BtnComponentVue prepend-icon="mdi-magnify" color="terciary" :onclick="loadSurgeryList">
      Buscar
    </BtnComponentVue>
    <BtnComponentVue
      prepend-icon="mdi-filter"
      color="secondary"
      @click="filterDialog = !filterDialog"
      >Filtros</BtnComponentVue
    >

    <BtnComponentVue
      prepend-icon="mdi-filter-off"
      :disabled="!hasActiveFilters"
      @click="clearFilters"
      >Limpar Filtros</BtnComponentVue
    >
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
      {{ new Date(value).toLocaleDateString('pt-BR') }}
    </template>
  </v-data-table-server>

  <SideDrawerComponentVue v-model="filterDialog" title="Filtros">
    <div class="drawer_content">
      <InputTextComponentVue title="Paciente" density="compact" v-model="filters.paciente" />
      <InputTextComponentVue title="Médico" density="compact" v-model="filters.medico" />
      <InputTextComponentVue
        type="date"
        title="Data de Nascimento"
        v-model="filters.dataNascimento"
      />
      <InputTextComponentVue
        type="date"
        title="Data Criação (Início)"
        v-model="filters.dataCriacaoInicio"
      />
      <InputTextComponentVue
        type="date"
        title="Data Criação (Fim)"
        v-model="filters.dataCriacaoFim"
      />
    </div>
    <template #footer>
      <div class="drawer_footer">
        <BtnComponentVue @click="filterDialog = false"> Cancelar </BtnComponentVue>

        <BtnComponentVue
          color="primary"
          @click="
            () => {
              loadSurgeryList()
              filterDialog = false
            }
          "
        >
          Aplicar
        </BtnComponentVue>
      </div>
    </template>
  </SideDrawerComponentVue>
</template>

<script setup lang="ts">
import BtnComponentVue from '@/components/BtnComponent.vue'
import InputTextComponentVue from '@/components/InputTextComponent.vue'
import { useSurgeryListComposable } from '../composable/surgeryListComposable'
import SideDrawerComponentVue from '@/components/SideDrawerComponent.vue'

const {
  options,
  loading,
  surgeryList,
  filterDialog,
  totalItems,
  filters,
  headers,
  hasActiveFilters,
  loadSurgeryList,
  clearFilters,
} = useSurgeryListComposable()
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

.drawer_content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.drawer_footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
