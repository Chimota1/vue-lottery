<script setup lang="ts">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

export interface AppTableColumnDef {
  field?: string
  header: string
  /**
   * Name of the scoped slot on AppTable that renders this column's body cells,
   * e.g. `slot: 'name'` pairs with `<template #name="{ data, index }">`.
   * When omitted, the value of `field` is rendered as plain text.
   */
  slot?: string
  /** Passed to the underlying Column as `bodyClass`. */
  bodyClass?: string
}

defineProps<{
  value: unknown[]
  columns: AppTableColumnDef[]
  loading?: boolean
}>()
</script>

<template>
  <div class="app-table">
    <!-- Columns are rendered here directly (DataTable only recognizes direct
         <Column> children, wrapped components are invisible to it). -->
    <DataTable :value="value" :loading="loading" striped-rows>
      <Column
        v-for="col in columns"
        :key="col.slot ?? col.field ?? col.header"
        :field="col.field"
        :header="col.header"
        :body-class="col.bodyClass"
      >
        <template v-if="col.slot && $slots[col.slot]" #body="slotProps">
          <slot :name="col.slot" :data="slotProps.data" :index="slotProps.index" />
        </template>
      </Column>

      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.app-table :deep(.p-datatable-table-container) {
  overflow-x: auto;
}
</style>
