import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import AdminLayout from './layouts/AdminLayout'
import CompanyLayout from './layouts/CompanyLayout'
import StudentLayout from './layouts/StudentLayout'
import UniversityLayout from './layouts/UniversityLayout'
import AdminDashboard from './pages/adminPages/index'
import CompanyDashboard from './pages/companyPages/index'
import StudentDashboard from './pages/studentPages/index'
import UniversityDashboard from './pages/universityPages/index'

function RequireAuth() {
  const { token, loading } = useAuth()
  if (loading) return null
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

function RoleRoute({ role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return user.role === role ? <Outlet /> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route element={<RequireAuth />}>
            <Route element={<RoleRoute role="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>
            </Route>
            <Route element={<RoleRoute role="company" />}>
              <Route path="/company" element={<CompanyLayout />}>
                <Route index element={<CompanyDashboard />} />
              </Route>
            </Route>
            <Route element={<RoleRoute role="student" />}>
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />
              </Route>
            </Route>
            <Route element={<RoleRoute role="university" />}>
              <Route path="/university" element={<UniversityLayout />}>
                <Route index element={<UniversityDashboard />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

