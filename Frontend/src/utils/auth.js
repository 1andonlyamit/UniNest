const STORAGE_KEY = 'uninest_auth'

export function saveAuth({ token, user }) {
  const payload = { token, user }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function loadAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY)
}


