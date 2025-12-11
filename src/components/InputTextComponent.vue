<template>
  <v-text-field
    :type="type"
    :label="title"
    :variant="variant"
    :density="density"
    :color="color"
    :bg-color="bgColor"
    :rounded="rounded"
    :hide-details="hideDetails"
    :prepend-icon="prependIcon"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
  />
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  variant: {
    type: String as () =>
      | 'underlined'
      | 'filled'
      | 'outlined'
      | 'plain'
      | 'solo'
      | 'solo-inverted'
      | 'solo-filled'
      | undefined,
    default: 'outlined',
  },
  density: {
    type: String as () => 'default' | 'comfortable' | 'compact' | null,
    default: 'compact',
  },
  color: {
    type: String,
    default: undefined,
  },
  bgColor: {
    type: String,
    default: undefined,
  },
  rounded: {
    type: String as () => '0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | undefined,
    default: 'xl',
  },
  hideDetails: {
    type: Boolean,
    default: true,
  },

  prependIcon: {
    type: String,
    default: undefined,
  },
  prependInnerIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
})
</script>

<style lang="scss" scoped></style>
