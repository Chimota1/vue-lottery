<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteMeta } from 'vue-router'
import { useAuthStore } from '@/entities/session'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

type LayoutName = NonNullable<RouteMeta['layout']>

const layouts: Record<LayoutName, Component> = {
  default: DefaultLayout,
  auth: AuthLayout,
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

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
</template>
