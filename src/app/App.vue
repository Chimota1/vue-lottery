<script setup lang="ts">
import { computed, onMounted, watch, watchEffect } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteMeta } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSessionStore } from '@/entities/session'
import { useSettingsStore } from '@/features/settings'
import { AppToast } from '@/shared/ui'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

type LayoutName = NonNullable<RouteMeta['layout']>

const layouts: Record<LayoutName, Component> = {
  default: DefaultLayout,
  auth: AuthLayout,
}

const route = useRoute()
const router = useRouter()
const authStore = useSessionStore()
const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)

// PrimeVue dark mode selector: `.app-dark` mirrors the settings store theme.
watchEffect(() => {
  document.documentElement.classList.toggle('app-dark', theme.value === 'dark')
})

const currentLayout = computed(() => layouts[route.meta.layout ?? 'default'] ?? DefaultLayout)

onMounted(async () => {
  try {
    await authStore.fetchCurrentUser()
  } catch {
    // ignore silent auth check failure
  }
})

watch(
  () => authStore.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated && route.meta.requiresAuth) {
      router.push({ name: 'login', query: { redirect: route.fullPath } })
    }
  },
)
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>

  <AppToast />
</template>
