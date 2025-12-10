<template>
  <v-btn
    class="btn_component"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :variant="variant"
    :color="color"
    rounded="xl"
  >
    <slot></slot>
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{
  prependIcon?: string
  appendIcon?: string
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined
  color?: string
}>()
</script>
<style lang="scss" scoped></style>
