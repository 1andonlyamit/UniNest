const BASE_URL = 'http://localhost:8888'

const AUTH_STORAGE_KEY = 'uninest_auth'

export function saveAuth(authPayload) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload))
  } catch (error) {
    // Fallback: log and continue without crashing the app
    console.error('Failed to save auth to localStorage:', error)
  }
}

export function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error('Failed to load auth from localStorage:', error)
    return null
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear auth from localStorage:', error)
  }
}

// Login: expects { role_id, email, password }
// Returns: { id, email, name, status, role_id }
export async function loginApi({ role_id, email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role_id, email, password })
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Login failed')
  }
  const data = await res.json()
  return data
}

// University signup: expects { name, address, email, phone, password }
// Returns: { message, data: { id, name, email, status } }
export async function signupUniversityApi({ name, address, email, phone, password }) {
  const res = await fetch(`${BASE_URL}/registerUniversity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, address, email, phone, password })
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Signup failed')
  }
  const data = await res.json()
  return data
}
