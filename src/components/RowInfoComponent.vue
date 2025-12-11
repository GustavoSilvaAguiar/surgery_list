<template>
  <div>
    <strong>{{ title }}: </strong>{{ info }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  info: string
}>()
</script>
