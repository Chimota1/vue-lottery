import type { App } from 'vue'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

import 'primeicons/primeicons.css'

// Primary color matching the app style (former Bootstrap primary #0d6efd),
// kept identical for both color schemes; dark scheme follows it for PrimeVue's
// dark tokens.
const AppPreset = definePreset(Aura, {
  colorScheme: {
    light: {
      primary: {
        palette: {
          50: '#e7f1ff',
          100: '#c8e0ff',
          200: '#9ecbff',
          300: '#6db3fc',
          400: '#4a9bf5',
          500: '#0d6efd',
          600: '#0b5ed7',
          700: '#0a58ca',
          800: '#094aab',
          900: '#084298',
          950: '#08366f',
        },
      },
    },
    dark: {
      primary: {
        palette: {
          50: '#e7f1ff',
          100: '#c8e0ff',
          200: '#9ecbff',
          300: '#6db3fc',
          400: '#4a9bf5',
          500: '#0d6efd',
          600: '#0b5ed7',
          700: '#0a58ca',
          800: '#094aab',
          900: '#084298',
          950: '#08366f',
        },
      },
    },
  },
})

/**
 * Single registration point for the UI library. PrimeVue components themselves
 * are imported only inside `src/shared/ui` wrappers.
 */
export function initUi(app: App): void {
  // `.app-dark` on <html> is toggled by the settings store (features/settings).
  app.use(PrimeVue, {
    theme: {
      preset: AppPreset,
      options: {
        darkModeSelector: '.app-dark',
      },
    },
  })
  app.use(ToastService)
}
