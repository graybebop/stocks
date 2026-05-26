<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 사이드바 -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-50">
      <!-- 로고 -->
      <div class="h-16 flex items-center px-6 border-b border-gray-700">
        <span class="text-xl font-bold text-white">⚡ Admin</span>
      </div>

      <!-- 네비게이션 -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span class="text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- 하단 유저 정보 -->
      <div class="p-4 border-t border-gray-700">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
            {{ userInitial }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-400 truncate">{{ authStore.user?.email }}</p>
          </div>
          <button @click="authStore.logout()" class="text-gray-400 hover:text-white transition-colors" title="로그아웃">
            🚪
          </button>
        </div>
      </div>
    </aside>

    <!-- 메인 콘텐츠 -->
    <div class="flex-1 ml-64">
      <!-- 헤더 -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
        <h1 class="text-lg font-semibold text-gray-800">{{ pageTitle }}</h1>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">{{ currentDate }}</span>
        </div>
      </header>

      <!-- 페이지 콘텐츠 -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const route     = useRoute()

const navItems = [
  { to: '/dashboard', icon: '📊', label: '대시보드' },
  { to: '/users',     icon: '👥', label: '사용자 관리' },
  { to: '/settings',  icon: '⚙️', label: '설정' },
]

const userInitial = computed(() =>
  authStore.user?.name?.charAt(0).toUpperCase() ?? 'A'
)

const pageTitle = computed(() => {
  const matched = navItems.find((i) => route.path.startsWith(i.to))
  return matched?.label ?? 'Admin'
})

const currentDate = computed(() =>
  new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
)
</script>
