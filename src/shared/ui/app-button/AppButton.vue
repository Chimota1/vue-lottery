<script setup lang="ts">
import Button from 'primevue/button'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
  },
)

defineEmits<{
  click: []
}>()
</script>

<template>
  <Button
    :type="type"
    :severity="props.variant === 'primary' ? undefined : props.variant"
    :disabled="disabled"
    :loading="loading"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>
