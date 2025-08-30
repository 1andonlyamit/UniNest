import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { loadAuth } from './api/auth'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import AdminLayout from './layouts/AdminLayout'
import CompanyLayout from './layouts/CompanyLayout'
import StudentLayout from './layouts/StudentLayout'
import UniversityLayout from './layouts/UniversityLayout'
import AdminDashboard from './pages/adminPages/index'
import CompanyDashboard from './pages/companyPages/Dashboard'
import StudentDashboard from './pages/studentPages/index'
import UniversityDashboard from './pages/universityPages/Dashboard'
import Drives from './pages/universityPages/Drives'
import Companies from './pages/universityPages/Companies'
import Students from './pages/universityPages/Students'
import Profile from './pages/universityPages/Profile'
import Settings from './pages/universityPages/Settings'
import CompanySignupForm from './components/forms/CompanySignupForm'
import Departments from './pages/universityPages/Departments'

function RequireAuth() {
  const auth = loadAuth()
  console.log('RequireAuth - auth data:', auth)
  console.log('RequireAuth - auth.user:', auth?.user)
  return auth && auth.user ? <Outlet /> : <Navigate to="/login" replace />
}

function RoleRoute({ roleId }) {
  const auth = loadAuth()
  console.log('RoleRoute - auth data:', auth)
  console.log('RoleRoute - user role_id:', auth?.user?.role_id)
  console.log('RoleRoute - expected role_id:', roleId)
  if (!auth || !auth.user) return <Navigate to="/login" replace />
  return auth.user.role_id === roleId ? <Outlet /> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/university/company/signup" element={<CompanySignupForm/>} />

        <Route element={<RequireAuth />}>
          <Route element={<RoleRoute roleId={1} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route element={<RoleRoute roleId={3} />}>
            <Route path="/company" element={<CompanyLayout />}>
              <Route index element={<CompanyDashboard />} />
            </Route>
          </Route>
          <Route element={<RoleRoute roleId={4} />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
            </Route>
          </Route>
          <Route element={<RoleRoute roleId={2} />}>
            <Route path="/university" element={<UniversityLayout />}>
              <Route index element={<UniversityDashboard />} />
              <Route path="drives" element={<Drives/>} />
              <Route path="companies" element={<Companies/>} />
              <Route path="departments" element={<Departments/>} />
              <Route path="students" element={<Students/>} />
              <Route path="profile" element={<Profile/>} />
              <Route path="settings" element={<Settings/>} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

