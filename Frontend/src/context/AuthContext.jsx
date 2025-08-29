import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginApi, signupApi } from '../api/auth'
import { saveAuth, loadAuth, clearAuth } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const existing = loadAuth()
    if (existing) {
      setToken(existing.token)
      setUser(existing.user)
    }
    setLoading(false)
  }, [])

  const login = async ({ email, password }) => {
    const result = await loginApi({ email, password })
    setToken(result.token)
    setUser(result.user)
    saveAuth(result)
    return result
  }

  const signup = async ({ name, email, password, role }) => {
    const result = await signupApi({ name, email, password, role })
    setToken(result.token)
    setUser(result.user)
    saveAuth(result)
    return result
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    clearAuth()
  }

  const value = useMemo(() => ({ token, user, loading, login, signup, logout }), [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


