<template>
  <div class="min-h-screen bg-gray-950">
    <header class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <NuxtLink to="/" class="flex items-center gap-2 text-white font-bold text-lg">
            <span class="text-green-400">📈</span>
            <span>주식 시세</span>
          </NuxtLink>
          <nav class="flex items-center gap-6 text-sm">
            <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors" active-class="text-white">
              홈
            </NuxtLink>
            <NuxtLink to="/search" class="text-gray-400 hover:text-white transition-colors" active-class="text-white">
              종목검색
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </main>

    <footer class="border-t border-gray-800 mt-12 py-6 text-center text-gray-600 text-xs">
      데이터 출처: 네이버 금융 | 투자 판단의 책임은 본인에게 있습니다
    </footer>
  </div>
</template>
