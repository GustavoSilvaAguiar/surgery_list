<!-- eslint-disable vue/valid-v-slot -->
<template>
  <PageTitleComponentVue>Agendamentos</PageTitleComponentVue>
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

    <template #item.paciente.dataNascimento="{ value }">
      {{ getIdade(value) }}
    </template>

    <template #item.actions="{ item }">
      <div class="actions_wrap">
        <button><v-icon icon="mdi-pencil" color="primary" /></button>
        <button>
          <v-icon icon="mdi-eye" color="primary" @click="showItemDetail(item)" />
        </button>
        <button><v-icon icon="mdi-delete" color="red" /></button>
      </div>
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

  <ModalComponentVue v-model="modalDialog" title="Detalhes">
    <RowInfoComponentVue title="Id" :info="itemDetail.id.toString()" />
    <RowInfoComponentVue title="Nome do paciente" :info="itemDetail.paciente.nome" />
    <RowInfoComponentVue
      title="Idade"
      :info="getIdade(itemDetail.paciente.dataNascimento).toString()"
    />
    <RowInfoComponentVue title="Médico responsável" :info="itemDetail.medico.nome" />
    <RowInfoComponentVue
      title="Data de cadastro"
      :info="new Date(itemDetail.dataCriacao).toLocaleDateString('pt-BR')"
    />
    <template #actions>
      <BtnComponentVue
        prepend-icon="mdi-pencil"
        color="secondary"
        variant="elevated"
        @click="modalDialog = !modalDialog"
        >Editar</BtnComponentVue
      >
    </template>
  </ModalComponentVue>
</template>

<script setup lang="ts">
import BtnComponentVue from '@/components/BtnComponent.vue'
import InputTextComponentVue from '@/components/InputTextComponent.vue'
import { useSurgeryListComposable } from '../composable/surgeryListComposable'
import SideDrawerComponentVue from '@/components/SideDrawerComponent.vue'
import ModalComponentVue from '@/components/ModalComponent.vue'
import RowInfoComponentVue from '@/components/RowInfoComponent.vue'
import PageTitleComponentVue from '@/components/PageTitleComponent.vue'

const {
  options,
  loading,
  surgeryList,
  filterDialog,
  modalDialog,
  totalItems,
  filters,
  headers,
  hasActiveFilters,
  itemDetail,
  loadSurgeryList,
  clearFilters,
  getIdade,
  showItemDetail,
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
.actions_wrap {
  width: fit-content;
  border: 1px solid $grey-300;
  border-radius: 8px;
  background-color: $grey-100;

  button {
    background-color: $grey-100;
    border-right: 1px $grey-300 solid;
  }

  button:first-child {
    border-radius: 8px 0px 0px 8px;
  }

  button:last-child {
    border-right: none;
    border-radius: 0px 8px 8px 0px;
  }
}
</style>
