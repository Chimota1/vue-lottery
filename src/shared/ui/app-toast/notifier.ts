import { useToast } from 'primevue/usetoast'

const SUCCESS_LIFETIME_MS = 3000
const ERROR_LIFETIME_MS = 5000

/**
 * Operation result notifications (created/updated/removed/errors) shown
 * via the PrimeVue Toast service.
 */
export function useOperationsNotifier() {
  const toast = useToast()

  return {
    notifySuccess(message: string): void {
      toast.add({ severity: 'success', summary: 'Успішно', detail: message, life: SUCCESS_LIFETIME_MS })
    },
    notifyError(message: string): void {
      toast.add({ severity: 'error', summary: 'Помилка', detail: message, life: ERROR_LIFETIME_MS })
    },
  }
}
