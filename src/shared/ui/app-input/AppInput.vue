<script setup lang="ts">
import { useId } from 'vue'
import InputText from 'primevue/inputtext'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  label: string
  placeholder?: string
  error?: string
}>()

// Works with VeeValidate: v-model + `v-bind="fieldAttrs"` fall through unchanged.
const modelValue = defineModel<string | number>()

const inputId = useId()
</script>

<template>
  <div class="field">
    <label class="form-label" :for="inputId">{{ label }}</label>
    <InputText
      v-bind="$attrs"
      :id="inputId"
      :model-value="modelValue == null ? null : String(modelValue)"
      :placeholder="placeholder"
      :invalid="Boolean(error)"
      fluid
      @update:model-value="modelValue = $event"
    />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 20px;
}

.field label {
  font-weight: 500;
  margin-bottom: 6px;
}
</style>
