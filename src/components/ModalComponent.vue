<template>
  <v-dialog v-model="internalModel" :max-width="width" :persistent="persistent">
    <v-card class="pa-4">
      <v-card-title class="text-h6 d-flex justify-space-between align-center">
        <span>{{ title }}</span>

        <v-btn icon variant="text" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider class="my-2" />

      <v-card-text>
        <slot />
      </v-card-text>

      <v-card-actions class="justify-end">
        <slot name="actions">
          <BtnComponentVue @click="close">Cancelar</BtnComponentVue>
          <BtnComponentVue color="primary" @click="confirm">Confirmar</BtnComponentVue>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BtnComponentVue from './BtnComponent.vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: '' },
  width: { type: [String, Number], default: 500 },
  persistent: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

const internalModel = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    internalModel.value = val
  },
)

watch(internalModel, (val) => {
  emit('update:modelValue', val)
})

function close() {
  internalModel.value = false
  emit('close')
}

function confirm() {
  emit('confirm')
}
</script>

<style scoped></style>
