// Mock auth API. Replace with real fetch/axios calls to your backend.

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export async function loginApi({ email, password }) {
  await delay(500)
  // Simple mock: derive role from email prefix for demo
  // admin@, student@, company@, university@
  const role = (() => {
    if (email.startsWith('admin')) return 'admin'
    if (email.startsWith('student')) return 'student'
    if (email.startsWith('company')) return 'company'
    if (email.startsWith('university')) return 'university'
    return 'student'
  })()
  return {
    token: 'mock-token-' + Math.random().toString(36).slice(2),
    user: { id: Date.now().toString(), name: email.split('@')[0], email, role },
  }
}

export async function signupApi({ name, email, password, role }) {
  await delay(600)
  return {
    token: 'mock-token-' + Math.random().toString(36).slice(2),
    user: { id: Date.now().toString(), name, email, role },
  }
}


