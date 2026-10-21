<script setup lang="ts">
import Column from 'primevue/column'

defineProps<{
  field?: string
  header: string
}>()
</script>

<template>
  <Column :field="field" :header="header">
    <template v-if="$slots.default" #body="slotProps">
      <slot :data="slotProps.data" />
    </template>
  </Column>
</template>
