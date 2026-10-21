<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main class="app">
      <slot />
    </main>
  </div>
</template>
