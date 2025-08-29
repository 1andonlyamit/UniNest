import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthForm from '../../components/forms/AuthForm'
import { useAuth } from '../../context/AuthContext'

const roleToLanding = {
  admin: '/admin',
  company: '/company',
  student: '/student',
  university: '/university',
}

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignup = async ({ name, email, password, role }) => {
    setLoading(true)
    try {
      const { user } = await signup({ name, email, password, role })
      navigate(roleToLanding[user.role] || '/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--color-background)] p-6">
      <div className="w-full max-w-2xl space-y-6">
        <AuthForm mode="signup" onSubmit={handleSignup} submitting={loading} />
        {/* <p className="text-center text-[0.875rem] text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p> */}
      </div>
    </div>
  )
}


