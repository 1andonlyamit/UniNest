import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/forms/AuthForm'
import { signupUniversityApi } from '../../api/auth'

const roleIdToLanding = {
  1: '/admin',
  2: '/university',
  3: '/company',
  4: '/student',
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignup = async ({ name, address, email, phone, password }) => {
    setLoading(true)
    try {
      const res = await signupUniversityApi({ name, address, email, phone, password })
      // After successful university registration, redirect to login
      navigate('/login')
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


