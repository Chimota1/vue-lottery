<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import AppButton from '@/shared/ui/app-button/AppButton.vue'

defineProps<{
  title: string
  message?: string
  errorMessage?: string | null
  isLoading?: boolean
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}>()

const visible = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  confirm: []
}>()

const visibleProxy = computed({
  get: () => visible.value,
  set: (value: boolean) => (visible.value = value),
})
</script>

<template>
  <Dialog v-model:visible="visibleProxy" :header="title" modal :style="{ width: '26rem' }">
    <p v-if="message" class="confirm-dialog__message">{{ message }}</p>
    <p v-if="errorMessage" class="confirm-dialog__error">
      {{ errorMessage }}
    </p>

    <template #footer>
      <AppButton variant="secondary" :disabled="isLoading" @click="visibleProxy = false">
        {{ cancelLabel ?? 'Скасувати' }}
      </AppButton>
      <AppButton
        :variant="danger ? 'danger' : 'primary'"
        :loading="isLoading"
        @click="emit('confirm')"
      >
        {{ confirmLabel ?? 'Підтвердити' }}
      </AppButton>
    </template>
  </Dialog>
</template>

<style scoped>
.confirm-dialog__message {
  margin: 0;
  padding-right: 8px;
}

.confirm-dialog__error {
  margin: 8px 0 0;
  color: #dc3545;
  font-size: 0.9rem;
}
</style>
