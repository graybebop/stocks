export const useApi = () => {
  const config    = useRuntimeConfig()
  const authStore = useAuthStore()

  const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (authStore.token) {
      headers['Authorization'] = `Bearer ${authStore.token}`
    }

    const response = await fetch(`${config.public.apiBase}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string>) },
    })

    if (!response.ok) {
      if (response.status === 401) {
        authStore.logout()
      }
      const error = await response.json()
      throw new Error(error.message || '요청 처리 중 오류가 발생했습니다.')
    }

    return response.json()
  }

  return { apiFetch }
}
