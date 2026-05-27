<template>
  <div>
    <div v-if="pending" class="flex items-center justify-center h-64">
      <div class="text-gray-500">불러오는 중...</div>
    </div>

    <div v-else-if="error" class="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
      <p class="text-red-400">종목 정보를 불러올 수 없습니다.</p>
      <p class="text-gray-500 text-sm mt-1">{{ error.message }}</p>
    </div>

    <div v-else-if="stock">
      <!-- 헤더 -->
      <div class="mb-6">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-300 text-sm mb-3 inline-block">← 홈으로</NuxtLink>
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold text-white">{{ stock.name }}</h1>
            <span class="text-gray-500 text-sm">{{ stock.code }}</span>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold" :class="priceColor(stock.change)">
              {{ stock.price?.toLocaleString() }}원
            </div>
            <div class="text-sm mt-1" :class="priceColor(stock.change)">
              {{ stock.change > 0 ? '+' : '' }}{{ stock.changeAmount?.toLocaleString() }}원
              ({{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%)
            </div>
          </div>
        </div>
      </div>

      <!-- 차트 영역 (추후 구현) -->
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 h-64 flex items-center justify-center">
        <p class="text-gray-600">차트 준비 중</p>
      </div>

      <!-- 기본 정보 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="text-gray-500 text-xs mb-1">시가</div>
          <div class="text-white font-semibold">{{ stock.open?.toLocaleString() }}</div>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="text-gray-500 text-xs mb-1">고가</div>
          <div class="text-red-400 font-semibold">{{ stock.high?.toLocaleString() }}</div>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="text-gray-500 text-xs mb-1">저가</div>
          <div class="text-blue-400 font-semibold">{{ stock.low?.toLocaleString() }}</div>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div class="text-gray-500 text-xs mb-1">거래량</div>
          <div class="text-white font-semibold">{{ stock.volume?.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const code = route.params.code as string

const { data: stock, pending, error } = await useFetch(`${config.public.apiBase}/stock/${code}`)

const priceColor = (change: number) => {
  if (change > 0) return 'text-red-400'
  if (change < 0) return 'text-blue-400'
  return 'text-gray-400'
}

useHead({
  title: stock.value ? `${stock.value.name} (${code}) - 주식 시세` : `${code} - 주식 시세`,
})
</script>
