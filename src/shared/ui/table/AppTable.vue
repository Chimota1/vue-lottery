<script setup lang="ts">
import DataTable from 'primevue/datatable'

defineProps<{
  value: unknown[]
  loading?: boolean
}>()
</script>

<template>
  <div class="app-table">
    <DataTable :value="value" :loading="loading" striped-rows>
      <slot />
    </DataTable>
  </div>
</template>

<style scoped>
.app-table :deep(.p-datatable-table-container) {
  overflow-x: auto;
}
</style>
