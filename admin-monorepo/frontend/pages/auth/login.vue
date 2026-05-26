<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- 로고 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">⚡ Admin</h1>
        <p class="text-gray-400 mt-2">관리자 대시보드에 로그인하세요</p>
      </div>

      <!-- 폼 -->
      <div class="bg-gray-800 rounded-2xl p-8 shadow-2xl">
        <div v-if="errorMsg" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {{ errorMsg }}
        </div>

        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">이메일</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="admin@example.com"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              @keyup.enter="handleLogin"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">비밀번호</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              @keyup.enter="handleLogin"
            />
          </div>

          <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {{ loading ? '로그인 중...' : '로그인' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const authStore = useAuthStore()
const router    = useRouter()

const form = reactive({ email: '', password: '' })
const loading  = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  if (!form.email || !form.password) {
    errorMsg.value = '이메일과 비밀번호를 입력해주세요.'
    return
  }

  loading.value  = true
  errorMsg.value = ''

  try {
    await authStore.login(form.email, form.password)
    router.push('/dashboard')
  } catch (e: any) {
    errorMsg.value = e?.data?.message || '로그인에 실패했습니다.'
  } finally {
    loading.value = false
  }
}
</script>
