<script setup lang="ts">
const REPOSITORY_URL = 'https://github.com/Chimota1/vue-lottery'

const features: string[] = [
  'Реєстрація учасників лотереї з валідацією форми',
  'Випадковий вибір до трьох переможців',
  'Список користувачів з DummyJSON API: пошук, пагінація, перегляд, редагування та видалення',
  'Авторизація за JWT-токеном і захищені сторінки',
]

const technologies: string[] = [
  'Vue 3',
  'Composition API',
  'TypeScript',
  'Vue Router',
  'Pinia',
  'Bootstrap 5',
  'SCSS',
  'Vite',
  'ESLint',
  'DummyJSON REST API',
]
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h1 class="page-title">Vue Lottery App</h1>
      <p class="lead-text">
        Односторінковий застосунок для проведення лотереї та керування її учасниками.
      </p>

      <h2 class="section-title">Можливості</h2>
      <ul class="feature-list">
        <li v-for="feature in features" :key="feature">{{ feature }}</li>
      </ul>

      <h2 class="section-title">Технології</h2>
      <div class="tag-list">
        <span v-for="technology in technologies" :key="technology" class="tag">
          {{ technology }}
        </span>
      </div>

      <a
        :href="REPOSITORY_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        <i class="bi bi-github"></i>
        Репозиторій проєкту
      </a>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.lead-text {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.feature-list {
  margin-bottom: 32px;
  padding-left: 20px;
}

.feature-list li {
  margin-bottom: 6px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid transparent;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.tag:nth-child(6n + 1) {
  background-color: #e6f4ff;
  color: #0958d9;
  border-color: #bae0ff;
}

.tag:nth-child(6n + 2) {
  background-color: #f6ffed;
  color: #389e0d;
  border-color: #b7eb8f;
}

.tag:nth-child(6n + 3) {
  background-color: #fff7e6;
  color: #d46b08;
  border-color: #ffd591;
}

.tag:nth-child(6n + 4) {
  background-color: #f9f0ff;
  color: #531dab;
  border-color: #d3adf7;
}

.tag:nth-child(6n + 5) {
  background-color: #fff0f6;
  color: #c41d7f;
  border-color: #ffadd2;
}

.tag:nth-child(6n + 6) {
  background-color: #e6fffb;
  color: #08979c;
  border-color: #87e8de;
}

.btn .bi {
  margin-right: 6px;
}
</style>
