<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white mb-1">한국 주식 시세</h1>
      <p class="text-gray-400 text-sm">네이버 금융 기반 실시간 주식 정보</p>
    </div>

    <!-- 검색 -->
    <div class="mb-8">
      <div class="flex gap-2 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="종목명 또는 코드 입력 (예: 삼성전자, 005930)"
          class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
          @keyup.enter="goSearch"
        />
        <button
          class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          @click="goSearch"
        >
          검색
        </button>
      </div>
    </div>

    <!-- 인기 종목 -->
    <section>
      <h2 class="text-lg font-semibold text-gray-200 mb-4">인기 종목</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <NuxtLink
          v-for="stock in popularStocks"
          :key="stock.code"
          :to="`/stock/${stock.code}`"
          class="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors"
        >
          <div class="text-xs text-gray-500 mb-1">{{ stock.code }}</div>
          <div class="font-semibold text-white text-sm truncate mb-3">{{ stock.name }}</div>
          <div class="text-lg font-bold" :class="priceColor(stock.change)">
            {{ stock.price?.toLocaleString() }}
          </div>
          <div class="text-xs mt-1" :class="priceColor(stock.change)">
            {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const searchQuery = ref('')

const popularStocks = [
  { code: '005930', name: '삼성전자', price: 0, change: 0 },
  { code: '000660', name: 'SK하이닉스', price: 0, change: 0 },
  { code: '035420', name: 'NAVER', price: 0, change: 0 },
  { code: '005380', name: '현대차', price: 0, change: 0 },
  { code: '051910', name: 'LG화학', price: 0, change: 0 },
  { code: '035720', name: '카카오', price: 0, change: 0 },
  { code: '006400', name: '삼성SDI', price: 0, change: 0 },
  { code: '068270', name: '셀트리온', price: 0, change: 0 },
  { code: '207940', name: '삼성바이오로직스', price: 0, change: 0 },
  { code: '005490', name: 'POSCO홀딩스', price: 0, change: 0 },
]

const priceColor = (change: number) => {
  if (change > 0) return 'text-red-400'
  if (change < 0) return 'text-blue-400'
  return 'text-gray-400'
}

const goSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>
