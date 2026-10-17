<script setup lang="ts">

const FULL_NAME = 'Кіндрат Анатолій Володимирович'
const GITHUB_URL = 'https://github.com/Chimota1'

const skills: string[] = [
  'HTML',
  'CSS / SCSS',
  'JavaScript',
  'TypeScript',
  'Vue 3',
  'Pinia',
  'Bootstrap',
  'Git / GitHub',
]
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="author">
        <div>
          <h1 class="author__name">{{ FULL_NAME }}</h1>
          <p class="author__role">Автор проєкту</p>
        </div>
      </div>

      <h2 class="section-title">Technical skills</h2>
      <div class="tag-list">
        <span v-for="skill in skills" :key="skill" class="tag">{{ skill }}</span>
      </div>

      <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i class="bi bi-github"></i>
        GitHub профіль
      </a>
    </div>
  </div>
</template>

<style scoped>
.author {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.author__avatar {
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border: 3px solid #e7f1ff;
  border-radius: 50%;
  object-fit: cover;
}

.author__name {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.author__role {
  color: #6c757d;
  margin: 0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
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
