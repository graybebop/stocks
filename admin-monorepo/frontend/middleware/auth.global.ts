export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  authStore.initFromCookie()

  const publicPages = ['/auth/login']
  const isPublicPage = publicPages.includes(to.path)

  if (!authStore.isLoggedIn && !isPublicPage) {
    return navigateTo('/auth/login')
  }

  if (authStore.isLoggedIn && isPublicPage) {
    return navigateTo('/dashboard')
  }
})
