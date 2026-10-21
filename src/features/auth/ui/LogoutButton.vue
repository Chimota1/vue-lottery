<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = useRouter()
const sessionStore = useSessionStore()

function logout(): void {
  sessionStore.clearSession()
  router.push({ name: 'login' })
}
</script>

<template>
  <button type="button" class="nav-item nav-item--auth" @click="logout">
    <i class="bi bi-box-arrow-right"></i>
    Logout
  </button>
</template>
