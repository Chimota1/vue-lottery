import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { HttpError } from '@/shared/api'
import { ServiceProvider, serviceNames } from '@/shared/lib'
import type { AuthService } from '../api/auth.service'
import type { AuthTokens, AuthUser, LoginCredentials } from './types'

const ACCESS_TOKEN_KEY = 'lottery-access-token'
const REFRESH_TOKEN_KEY = 'lottery-refresh-token'
const USER_KEY = 'lottery-user'

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/**
 * LocalStorage persistence for tokens/user is kept MANUAL here (three dedicated
 * keys) instead of pinia-plugin-persistedstate, because:
 * - session state mixes volatile data (tokens) and it must stay re-serializable
 *   on partial updates (setSession writes only what changed);
 * - per-field keys avoid putting refresh token + user object into one JSON blob
 *   and let each piece be read/cleared independently;
 * - pinia-plugin-persistedstate hydrates the whole state at store creation and
 *   persists it on every mutation — that matches the settings store
 *   (features/settings, single `lottery-theme` key) where it IS used.
 */
export const useSessionStore = defineStore('session', () => {
  // state: tokens + authorized user, persisted to localStorage (DummyJSON tokens expire)
  const accessToken = ref<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY))
  const refreshToken = ref<string | null>(localStorage.getItem(REFRESH_TOKEN_KEY))
  const user = ref<AuthUser | null>(readStoredUser())

  // authorization flag
  const isAuthenticated = computed(() => Boolean(accessToken.value))

  /** Canonical way to put authorization state into the store. */
  function setSession(tokens: AuthTokens, sessionUser?: AuthUser): void {
    accessToken.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)

    if (sessionUser) {
      user.value = sessionUser
      localStorage.setItem(USER_KEY, JSON.stringify(sessionUser))
    }
  }

  /** Canonical way to drop authorization state. */
  function clearSession(): void {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await ServiceProvider.get<AuthService>(serviceNames.auth).login(credentials)
    const { accessToken: newAccessToken, refreshToken: newRefreshToken, ...authUser } = response

    setSession({ accessToken: newAccessToken, refreshToken: newRefreshToken }, authUser)
  }

  let refreshPromise: Promise<string | null> | null = null

  async function requestNewTokens(currentRefreshToken: string): Promise<string | null> {
    try {
      const tokens = await ServiceProvider.get<AuthService>(
        serviceNames.auth,
      ).refresh(currentRefreshToken)
      setSession(tokens)
      return tokens.accessToken
    } catch {
      clearSession()
      return null
    } finally {
      refreshPromise = null
    }
  }

  function refreshAccessToken(): Promise<string | null> {
    if (!refreshToken.value) {
      clearSession()
      return Promise.resolve(null)
    }

    refreshPromise ??= requestNewTokens(refreshToken.value)
    return refreshPromise
  }

  /** Persists the current user while tokens already exist (keep tokens untouched). */
  function updateStoredUser(sessionUser: AuthUser): void {
    user.value = sessionUser
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser))
  }

  async function fetchCurrentUser(): Promise<void> {
    const currentToken = accessToken.value
    if (!currentToken) {
      return
    }

    try {
      const currentUser = await ServiceProvider.get<AuthService>(serviceNames.auth).getCurrentUser()
      updateStoredUser(currentUser)
    } catch (e) {
      if (e instanceof HttpError && e.status === 401) {
        clearSession()
      }
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    setSession,
    clearSession,
    refreshAccessToken,
    login,
    fetchCurrentUser,
  }
})
