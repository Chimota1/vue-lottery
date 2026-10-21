<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { useAuthStore } from '@/entities/session'
import { BaseInput, BaseButton } from '@/shared/ui'

const REQUIRED = "Поле обов'язкове для заповнення"
const MIN_PASSWORD_LENGTH = 6

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 1. Виносимо Zod-схему в окрему змінну (без required_error, щоб уникнути конфлікту типів)
const zodSchema = z.object({
  username: z.string().trim().min(1, REQUIRED),
  password: z
    .string()
    .min(1, REQUIRED)
    .min(MIN_PASSWORD_LENGTH, `Мінімум ${MIN_PASSWORD_LENGTH} символів`),
})

// 2. Виводимо тип із Zod-схеми
type LoginForm = z.infer<typeof zodSchema>

const loginSchema = toTypedSchema(zodSchema)

// 3. Передаємо тип LoginForm у useForm
const { defineField, errors, handleSubmit } = useForm<LoginForm>({
  validationSchema: loginSchema,
})

const fieldConfig = (state: { errors: string[] }) => ({
  validateOnModelUpdate: state.errors.length > 0,
})

const [username, usernameAttrs] = defineField('username', fieldConfig)
const [password, passwordAttrs] = defineField('password', fieldConfig)

const isSubmitting = ref(false)
const loginError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  loginError.value = null

  try {
    await authStore.login(values)

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : null
    router.push(redirect ?? { name: 'users' })
  } catch (e) {
    loginError.value = e instanceof Error ? e.message : 'Не вдалося увійти'
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <BaseInput
      v-model="username"
      v-bind="usernameAttrs"
      label="Username"
      placeholder="Введіть логін"
      autocomplete="username"
      :error="errors.username"
    />
    <BaseInput
      v-model="password"
      v-bind="passwordAttrs"
      type="password"
      label="Password"
      placeholder="Введіть пароль"
      autocomplete="current-password"
      :error="errors.password"
    />

    <p v-if="loginError" class="login__error">
      <i class="bi bi-exclamation-triangle"></i>
      {{ loginError }}
    </p>

    <BaseButton type="submit" class="login__submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Вхід...' : 'Увійти' }}
    </BaseButton>
  </form>
</template>

<style scoped>
.login__error {
  padding: 12px 16px;
  border-radius: 6px;
  background-color: #fdecee;
  color: #dc3545;
}

.login__submit {
  width: 100%;
}
</style>
