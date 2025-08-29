import React, { useState } from 'react'
import { 
  Home,
  Target, 
  User, 
  Settings, 
  Bell, 
  LogOut,
  GraduationCap,
  Building2
} from 'lucide-react'

// Mock components for demonstration
const MockLink = ({ to, children, className, onClick }) => (
  <div className={className} onClick={() => onClick && onClick(to)} style={{ cursor: 'pointer' }}>
    {children}
  </div>
)

const MockOutlet = ({ activeRoute }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      {activeRoute === '/company' ? 'Dashboard' : 
       activeRoute === '/company/drives' ? 'Placement Drives' :
       activeRoute === '/company/applicants' ? 'Applicants' :
       activeRoute === '/company/profile' ? 'Profile' :
       activeRoute === '/company/settings' ? 'Settings' : 'Dashboard'}
    </h2>
    <div className="text-gray-600">
      <p className="mb-4">Welcome to your {activeRoute === '/company' ? 'dashboard' : activeRoute.split('/').pop()}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">Quick Stats</h3>
          <p className="text-blue-600 text-sm">Content for {activeRoute.split('/').pop() || 'dashboard'}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <h3 className="font-semibold text-green-800 mb-2">Recent Activity</h3>
          <p className="text-green-600 text-sm">Latest updates and progress</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-100">
          <h3 className="font-semibold text-yellow-800 mb-2">Upcoming</h3>
          <p className="text-yellow-600 text-sm">Tasks and deadlines</p>
        </div>
      </div>
    </div>
  </div>
)

export default function CompanyLayout() {
  const [activeRoute, setActiveRoute] = useState('/company')
  const [notificationCount] = useState(3)
  
  // Mock user data
  const user = {
    name: 'HealthArk Solutions',
    email: 'john.doe@uninest.edu',
    studentId: 'ST2024001'
  }

  const handleLogout = () => {
    alert('Logout functionality would be implemented here!')
  }

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/company' },
    { icon: Target, label: 'Drives', path: '/company/drives' },
    { icon: GraduationCap, label: 'Applicants', path: '/company/applicants' },
    { icon: User, label: 'Profile', path: '/company/profile' },
    { icon: Settings, label: 'Settings', path: '/company/settings' },
  ]

  const isActiveLink = (path) => {
    if (path === '/company') {
      return activeRoute === '/company'
    }
    return activeRoute.startsWith(path)
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
              Company Portal
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
                <MockLink
                  key={item.path}
                  to={item.path}
                  onClick={setActiveRoute}
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
                </MockLink>
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
            {/* Search Bar */}
            {/* <div className="hidden md:block">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="w-64 pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div> */}

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

      {/* Main Content Area */}
      <main 
        className="overflow-auto bg-gray-50" 
        style={{ gridArea: 'content' }}
      >
        <div className="p-8">
          <MockOutlet activeRoute={activeRoute} />
        </div>
      </main>
    </div>
  )
}