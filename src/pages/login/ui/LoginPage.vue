<script setup lang="ts">
import { LoginForm } from '@/features/auth'
</script>

<template>
  <div class="login">
    <div class="card login__card">
      <div class="card-body">
        <h1 class="login__title">Вхід</h1>

        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
}

.login__card {
  width: 100%;
  max-width: 440px;
}

.login__title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 24px;
}
</style>
