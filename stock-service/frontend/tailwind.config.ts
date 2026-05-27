import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        rise: '#ef4444',
        fall: '#3b82f6',
        neutral: '#6b7280',
      },
    },
  },
  plugins: [],
} satisfies Config
