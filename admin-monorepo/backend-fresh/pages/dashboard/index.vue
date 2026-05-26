<template>
  <div class="space-y-6">
    <!-- 페이지 타이틀 -->
    <div>
      <h2 class="text-2xl font-bold text-gray-800">대시보드</h2>
      <p class="text-gray-500 text-sm mt-1">서비스 현황을 한눈에 확인하세요.</p>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="card in statCards"
        :key="card.label"
        class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 font-medium">{{ card.label }}</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">
              {{ pending ? '...' : card.value }}
            </p>
          </div>
          <div class="text-3xl">{{ card.icon }}</div>
        </div>
      </div>
    </div>

    <!-- 최근 활동 (플레이스홀더) -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 class="font-semibold text-gray-800 mb-4">최근 가입 사용자</h3>
      <p class="text-sm text-gray-400">사용자 목록은 사용자 관리 메뉴에서 확인하세요.</p>
      <NuxtLink to="/users" class="inline-block mt-3 text-sm text-indigo-600 hover:underline">
        사용자 관리 바로가기 →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const config    = useRuntimeConfig()
const authStore = useAuthStore()

const { data: stats, pending } = await useFetch<{
  total_users: number
  active_users: number
  today_signups: number
}>(`${config.public.apiBase}/dashboard/stats`, {
  headers: { Authorization: `Bearer ${authStore.token}` },
})

const statCards = computed(() => [
  { label: '전체 사용자',    icon: '👥', value: stats.value?.total_users   ?? 0 },
  { label: '이번 달 가입',   icon: '📈', value: stats.value?.active_users  ?? 0 },
  { label: '오늘 신규 가입', icon: '🆕', value: stats.value?.today_signups ?? 0 },
])
</script>
