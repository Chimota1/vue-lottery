<script setup lang="ts">
import type { User } from '@/entities/user'
import { AppTable, AppTableColumn } from '@/shared/ui'

defineProps<{
  users: User[]
  startIndex: number
}>()

const emit = defineEmits<{
  delete: [user: User]
}>()

function fullName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
</script>

<template>
  <AppTable :value="users">
    <AppTableColumn header="#">
      <template #body="slotProps">
        {{ startIndex + (slotProps.index as number) + 1 }}
      </template>
    </AppTableColumn>

    <AppTableColumn header="Name">
      <template #body="slotProps">
        <RouterLink
          :to="{ name: 'user-details', params: { id: slotProps.data.id } }"
          class="user-cell"
        >
          <img
            v-if="slotProps.data.image"
            :src="slotProps.data.image"
            :alt="fullName(slotProps.data)"
            class="user-cell__avatar"
          />
          <span v-else class="user-cell__avatar user-cell__avatar--empty">
            <i class="pi pi-user"></i>
          </span>
          <span class="text-cell" :title="fullName(slotProps.data)">
            {{ fullName(slotProps.data) }}
          </span>
        </RouterLink>
      </template>
    </AppTableColumn>

    <AppTableColumn field="age" header="Age" />
    <AppTableColumn field="gender" header="Gender" />

    <AppTableColumn field="email" header="Email">
      <template #body="slotProps">
        <span class="text-cell" :title="slotProps.data.email">{{ slotProps.data.email }}</span>
      </template>
    </AppTableColumn>

    <AppTableColumn field="phone" header="Phone number" />

    <AppTableColumn header="Actions" body-class="actions-cell">
      <template #body="slotProps">
        <div class="actions">
          <RouterLink
            :to="{ name: 'user-details', params: { id: slotProps.data.id } }"
            class="icon-btn"
            title="Переглянути"
            aria-label="Переглянути"
          >
            <i class="pi pi-eye"></i>
          </RouterLink>
          <RouterLink
            :to="{ name: 'user-edit', params: { id: slotProps.data.id } }"
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
            @click="emit('delete', slotProps.data)"
          >
            <i class="pi pi-trash"></i>
          </button>
        </div>
      </template>
    </AppTableColumn>

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
