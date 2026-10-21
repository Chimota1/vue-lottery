import { setAuthHandler } from '@/shared/api'
import { ServiceProvider, serviceNames } from '@/shared/lib'
import { AuthService, useSessionStore } from '@/entities/session'
import { UserService } from '@/entities/user'

/**
 * App-level service registration. The shared ServiceProvider is a generic
 * registry; concrete services are bound here so higher layers never leak
 * implementation classes into shared.
 */
export function initServices(): void {
  ServiceProvider.register(serviceNames.auth, () => new AuthService())
  ServiceProvider.register(serviceNames.users, () => new UserService())

  const authStore = useSessionStore()
  setAuthHandler({
    getAccessToken: () => authStore.accessToken,
    refreshAccessToken: () => authStore.refreshAccessToken(),
  })
}
