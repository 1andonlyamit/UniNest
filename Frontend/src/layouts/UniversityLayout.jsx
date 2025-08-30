import React, { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { loadAuth, clearAuth } from '../api/auth'
import { 
  Home,
  Target, 
  User, 
  Settings, 
  Bell, 
  LogOut,
  GraduationCap,
  Building2,
  Building
} from 'lucide-react'


// Custom Link component that works with React Router
const NavigationLink = ({ to, children, className }) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(to)
  }

  return (
    <div className={className} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  )
}

export default function UniversityLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [notificationCount] = useState(3)
  
  const user = loadAuth()?.user
  // console.log('UniversityLayout - loadAuth():', loadAuth())
  // console.log('UniversityLayout - user:', user)
  // console.log('UniversityLayout - location.pathname:', location.pathname)

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/university' },
    { icon: Target, label: 'Drives', path: '/university/drives' },
    { icon: Building2, label: 'Companies', path: '/university/companies' },
    { icon: Building, label: 'Departments', path: '/university/departments' },
    { icon: GraduationCap, label: 'Students', path: '/university/students' },
    { icon: User, label: 'Profile', path: '/university/profile' },
    { icon: Settings, label: 'Settings', path: '/university/settings' },
  ]

  const isActiveLink = (path) => {
    if (path === '/university') {
      return location.pathname === '/university'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr] grid-rows-[72px_1fr] bg-gray-50" style={{ gridTemplateAreas: '"sidebar topbar" "sidebar content"' }}>
      {/* Enhanced Sidebar */}
      <aside 
        className="row-span-2 bg-white border-r border-gray-200 shadow-lg" 
        style={{ gridArea: 'sidebar' }}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontSize: 'var(--text-h3)' }}>
              UniNest
            </h2>
            <p className="text-blue-200 text-sm font-medium">
              University Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveLink(item.path)
              
              return (
                <NavigationLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive}
                  className={`
                    group flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:transform hover:scale-102'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/30 rounded-l-full" />
                  )}
                </NavigationLink>
              )
            })}
          </div>
        </nav>

        {/* Bottom User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {user?.name?.charAt(0) || 'J'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {user?.name || 'John Doe'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  ID: {user?.studentId || 'ST2024001'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Enhanced Top Bar */}
      <header 
        className="bg-white border-b border-gray-200 shadow-sm" 
        style={{ gridArea: 'topbar' }}
      >
        <div className="flex items-center justify-between h-full px-8">
          {/* Left - Logo and Company */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                UniNest
              </h1>
              <p className="text-sm text-gray-500 font-medium -mt-1">
                Placement Management System
              </p>
            </div>
          </div>

          {/* Right - User and Notifications */}
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 relative">
                <Bell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      {notificationCount}
                    </span>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full animate-ping opacity-75" />
                  </>
                )}
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  {user?.name || 'John Doe'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || 'john.doe@uninest.edu'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0) || 'J'}
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-gray-200 hover:border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with Outlet */}
      <main 
        className="overflow-auto bg-gray-50" 
        style={{ gridArea: 'content' }}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}