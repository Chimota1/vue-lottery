<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  buildUsersQuery,
  USERS_PAGE_SIZE,
  useUsersStore,
  type User,
} from '@/entities/user'
import { WinnersList } from '@/widgets/winners'
import { SearchBar, AppPagination, AppConfirmDialog, useOperationsNotifier } from '@/shared/ui'
import { UsersTable } from '@/widgets/users-table'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()
const { notifySuccess, notifyError } = useOperationsNotifier()

// Список, кількість, loading/error — через storeToRefs, щоб зберегти реактивність.
const { users, total, totalPages, isLoading, error, winners, canPickWinner } =
  storeToRefs(usersStore)

const currentPage = computed(() => {
  const page = Number(route.query.page)
  return Number.isInteger(page) && page > 0 ? page : 1
})

const searchQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))

const startIndex = computed(() => (currentPage.value - 1) * USERS_PAGE_SIZE)

function goToPage(page: number): void {
  router.push({ query: buildUsersQuery(page, searchQuery.value) })
}

function handleSearch(query: string): void {
  if (query === searchQuery.value) {
    return
  }

  router.replace({ query: buildUsersQuery(1, query) })
}

function retry(): void {
  usersStore.fetchUsers(currentPage.value, searchQuery.value, true)
}

const userToDelete = ref<User | null>(null)
const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const deleteError = ref<string | null>(null)

function openDeleteModal(user: User): void {
  userToDelete.value = user
  deleteError.value = null
  isDeleteModalOpen.value = true
}

async function confirmDelete(): Promise<void> {
  if (!userToDelete.value) {
    return
  }

  isDeleting.value = true
  deleteError.value = null

  try {
    await usersStore.removeUser(userToDelete.value.id)
    isDeleteModalOpen.value = false
    notifySuccess('Користувача видалено')
  } catch (e) {
    deleteError.value = e instanceof Error ? e.message : 'Не вдалося видалити користувача'
    notifyError(deleteError.value)
  } finally {
    isDeleting.value = false
  }
}

watch(
  [currentPage, searchQuery],
  ([page, query]) => {
    usersStore.fetchUsers(page, query)
  },
  { immediate: true },
)
</script>

<template>
  <WinnersList
    :winners="winners"
    :can-pick-winner="canPickWinner"
    @pick="usersStore.pickWinner"
    @remove="usersStore.removeWinner"
  />

  <div class="card">
    <div class="card-body">
      <div class="users-toolbar">
        <h2 class="users-title">
          Учасники
          <span class="users-count">{{ total }}</span>
        </h2>
        <div class="users-toolbar__actions">
          <SearchBar
            :value="searchQuery"
            placeholder="Пошук за іменем..."
            @filter-by-name="handleSearch"
          />
          <RouterLink :to="{ name: 'user-create' }" class="btn btn-primary add-btn">
            <i class="pi pi-plus"></i>
            Новий учасник
          </RouterLink>
        </div>
      </div>

      <div v-if="isLoading" class="state">
        <i class="pi pi-refresh pi-spin state__spinner"></i>
        Завантаження...
      </div>

      <div v-else-if="error" class="state state--error">
        <p class="state__text">
          <i class="pi pi-exclamation-triangle"></i>
          {{ error }}
        </p>
        <button type="button" class="btn btn-primary" @click="retry">Спробувати ще раз</button>
      </div>

      <template v-else>
        <UsersTable
          :users="users"
          :start-index="startIndex"
          @delete="openDeleteModal"
        />
        <AppPagination
          :page="currentPage"
          :total-pages="totalPages"
          @change="goToPage"
        />
      </template>
    </div>
  </div>

  <AppConfirmDialog
    v-model="isDeleteModalOpen"
    title="Видалення учасника"
    :message="
      userToDelete
        ? `Видалити учасника ${userToDelete.firstName} ${userToDelete.lastName}?`
        : undefined
    "
    :error-message="deleteError"
    :is-loading="isDeleting"
    confirm-label="Видалити"
    danger
    @confirm="confirmDelete"
  />
</template>

<style scoped>
.users-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.users-toolbar__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.users-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.users-count {
  padding: 2px 10px;
  border-radius: 999px;
  background-color: #e7f1ff;
  color: #0d6efd;
  font-size: 0.9rem;
  font-weight: 500;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 16px;
  color: #6c757d;
  text-align: center;
}

.state--error {
  color: #dc3545;
}

.state__text {
  margin: 0;
}

.state__spinner {
  font-size: 1.75rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
