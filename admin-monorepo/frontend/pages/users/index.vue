<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">사용자 관리</h2>
        <p class="text-gray-500 text-sm mt-1">전체 사용자 목록을 관리하세요.</p>
      </div>
    </div>

    <!-- 테이블 -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="pending" class="p-8 text-center text-gray-400">불러오는 중...</div>

      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left px-6 py-4 text-gray-500 font-medium">ID</th>
            <th class="text-left px-6 py-4 text-gray-500 font-medium">이름</th>
            <th class="text-left px-6 py-4 text-gray-500 font-medium">이메일</th>
            <th class="text-left px-6 py-4 text-gray-500 font-medium">가입일</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 text-gray-400">#{{ user.id }}</td>
            <td class="px-6 py-4 font-medium text-gray-800">{{ user.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
            <td class="px-6 py-4 text-gray-400">{{ formatDate(user.created_at) }}</td>
          </tr>
          <tr v-if="!users.length">
            <td colspan="4" class="px-6 py-8 text-center text-gray-400">사용자가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  created_at: string
}

const config    = useRuntimeConfig()
const authStore = useAuthStore()

const { data, pending } = await useFetch<{ data: User[] }>(
  `${config.public.apiBase}/users`,
  { headers: { Authorization: `Bearer ${authStore.token}` } }
)

const users = computed(() => data.value?.data ?? [])

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR')
}
</script>
