<script setup lang="ts">
import type { User } from '@/entities/user'
import type { AppTableColumnDef } from '@/shared/ui'
import { AppTable } from '@/shared/ui'

defineProps<{
  users: User[]
  startIndex: number
}>()

const emit = defineEmits<{
  delete: [user: User]
}>()

const columns: AppTableColumnDef[] = [
  { header: '#', slot: 'index' },
  { header: 'Name', slot: 'name' },
  { field: 'age', header: 'Age' },
  { field: 'gender', header: 'Gender' },
  { field: 'email', header: 'Email', slot: 'email' },
  { field: 'phone', header: 'Phone number' },
  { header: 'Actions', slot: 'actions', bodyClass: 'actions-cell' },
]

function fullName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
</script>

<template>
  <AppTable :value="users" :columns="columns">
    <template #index="{ index }">
      {{ startIndex + (index as number) + 1 }}
    </template>

    <template #name="{ data }">
      <RouterLink
        :to="{ name: 'user-details', params: { id: (data as User).id } }"
        class="user-cell"
      >
        <img
          v-if="(data as User).image"
          :src="(data as User).image"
          :alt="fullName(data as User)"
          class="user-cell__avatar"
        />
        <span v-else class="user-cell__avatar user-cell__avatar--empty">
          <i class="pi pi-user"></i>
        </span>
        <span class="text-cell" :title="fullName(data as User)">
          {{ fullName(data as User) }}
        </span>
      </RouterLink>
    </template>

    <template #email="{ data }">
      <span class="text-cell" :title="(data as User).email">{{ (data as User).email }}</span>
    </template>

    <template #actions="{ data }">
      <div class="actions">
        <RouterLink
          :to="{ name: 'user-details', params: { id: (data as User).id } }"
          class="icon-btn"
          title="Переглянути"
          aria-label="Переглянути"
        >
          <i class="pi pi-eye"></i>
        </RouterLink>
        <RouterLink
          :to="{ name: 'user-edit', params: { id: (data as User).id } }"
          class="icon-btn icon-btn--edit"
          title="Редагувати дані"
          aria-label="Редагувати дані"
        >
          <i class="pi pi-pencil"></i>
        </RouterLink>
        <button
          type="button"
          class="icon-btn icon-btn--delete"
          title="Видалити учасника"
          aria-label="Видалити учасника"
          @click="emit('delete', data as User)"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </template>

    <template #empty>
      <p class="empty-message">Користувачів не знайдено</p>
    </template>
  </AppTable>
</template>

<style scoped>
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.user-cell:hover .text-cell {
  color: #0d6efd;
  text-decoration: underline;
}

.user-cell__avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f3f5;
  object-fit: cover;
}

.user-cell__avatar--empty {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.text-cell {
  display: inline-block;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: #fff;
  color: #495057;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.icon-btn:hover {
  background-color: #f1f3f5;
}

.icon-btn--edit:hover {
  border-color: #0d6efd;
  background-color: #e7f1ff;
  color: #0d6efd;
}

.icon-btn--delete {
  color: #dc3545;
}

.icon-btn--delete:hover {
  border-color: #dc3545;
  background-color: #fdecee;
}

.empty-message {
  color: #6c757d;
  text-align: center;
  margin: 0;
}
</style>
