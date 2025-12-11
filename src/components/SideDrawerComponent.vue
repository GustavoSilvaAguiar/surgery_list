<template>
  <v-navigation-drawer v-model="drawer" location="right" width="380" temporary class="pa-4">
    <h3 v-if="title" class="text-h6 mb-4">{{ title }}</h3>

    <slot></slot>

    <div class="d-flex justify-end mt-6" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits(['update:modelValue'])

const drawer = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
