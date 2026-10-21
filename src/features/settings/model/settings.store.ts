import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

/**
 * App preferences (currently: theme). This slice uses pinia-plugin-persistedstate
 * (whole-state blob under a single key), while entities/session keeps its manual
 * per-token localStorage management — see session.store.ts for the comparison.
 */
export const useSettingsStore = defineStore(
  'settings',
  () => {
    const theme = ref<ThemeMode>('light')

    function toggleTheme(): void {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, toggleTheme }
  },
  {
    persist: {
      key: 'lottery-theme',
      pick: ['theme'],
    },
  },
)
