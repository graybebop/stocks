import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      const config = useRuntimeConfig()
      const { data, error } = await useFetch<{ token: string; user: User }>(
        `${config.public.apiBase}/auth/login`,
        {
          method: 'POST',
          body: { email, password },
        }
      )

      if (error.value) throw error.value

      this.token = data.value!.token
      this.user  = data.value!.user

      // 토큰 쿠키에 저장
      const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 })
      tokenCookie.value  = this.token
    },

    async logout() {
      const config = useRuntimeConfig()
      await useFetch(`${config.public.apiBase}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.token}` },
      })

      this.token = null
      this.user  = null

      const tokenCookie = useCookie('auth_token')
      tokenCookie.value  = null

      navigateTo('/auth/login')
    },

    async fetchMe() {
      const config = useRuntimeConfig()
      const { data } = await useFetch<User>(`${config.public.apiBase}/me`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      if (data.value) this.user = data.value
    },

    initFromCookie() {
      const tokenCookie = useCookie('auth_token')
      if (tokenCookie.value) {
        this.token = tokenCookie.value
      }
    },
  },
})
