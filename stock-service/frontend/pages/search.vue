<template>
  <div>
    <div class="mb-6">
      <NuxtLink to="/" class="text-gray-500 hover:text-gray-300 text-sm mb-3 inline-block">← 홈으로</NuxtLink>
      <h1 class="text-2xl font-bold text-white">종목 검색</h1>
    </div>

    <div class="flex gap-2 max-w-md mb-8">
      <input
        v-model="query"
        type="text"
        placeholder="종목명 또는 코드 입력"
        class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        @keyup.enter="search"
      />
      <button
        class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        @click="search"
      >
        검색
      </button>
    </div>

    <div v-if="pending" class="text-gray-500 text-sm">검색 중...</div>

    <div v-else-if="results && results.length > 0">
      <div class="space-y-2">
        <NuxtLink
          v-for="item in results"
          :key="item.code"
          :to="`/stock/${item.code}`"
          class="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 hover:border-gray-600 transition-colors"
        >
          <div>
            <span class="text-white font-medium">{{ item.name }}</span>
            <span class="text-gray-500 text-sm ml-2">{{ item.code }}</span>
          </div>
          <div class="text-right">
            <div class="text-white font-semibold">{{ item.price?.toLocaleString() }}원</div>
            <div class="text-xs" :class="item.change > 0 ? 'text-red-400' : 'text-blue-400'">
              {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="searched" class="text-gray-500 text-sm">
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const query = ref((route.query.q as string) || '')
const searched = ref(false)
const results = ref<any[]>([])
const pending = ref(false)

const search = async () => {
  if (!query.value.trim()) return
  router.replace({ query: { q: query.value.trim() } })
  pending.value = true
  searched.value = true
  try {
    const data = await $fetch(`${config.public.apiBase}/stock/search?q=${encodeURIComponent(query.value.trim())}`)
    results.value = (data as any[]) || []
  } catch {
    results.value = []
  } finally {
    pending.value = false
  }
}

if (query.value) {
  await search()
}

useHead({ title: `${query.value ? `"${query.value}" 검색 결과 - ` : ''}종목 검색 - 주식 시세` })
</script>
