import React, { useState } from 'react'
import { Link } from 'react-router-dom'   // ✅ Added import
import Input from '../ui/Input'
import Button from '../ui/Button'
import { GraduationCap, User, Mail, Lock, Users } from 'lucide-react'

export default function AuthForm({ mode = 'login', onSubmit, submitting = false }) {
  const isLogin = mode === 'login'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.email) nextErrors.email = 'Email is required'
    if (!form.password) nextErrors.password = 'Password is required'
    if (!isLogin && !form.name) nextErrors.name = 'Name is required'
    if (!isLogin && !form.role) nextErrors.role = 'Role is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit?.(form)
  }

  return (
    <div className="min-h-auto w-full flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-2xl)] bg-gradient-to-br from-primary to-secondary shadow-[var(--shadow-lg)] mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[var(--text-h1)] font-bold text-primary font-[var(--font-warm)] tracking-tight">
            UniNest
          </h1>
          <p className="text-muted mt-1 font-medium">
            {isLogin ? 'Welcome back' : 'Start your journey with UniNest'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-2xl)] border-2 border-white/50 p-8 shadow-[var(--shadow-lg)] space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-[var(--text-h3)] font-bold text-gray-900 font-[var(--font-warm)]">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isLogin ? 'Continue your educational journey' : 'Start your learning adventure today'}
            </p>
          </div>

          {!isLogin && (
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.name}
              icon={User}
            />
          )}

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            error={errors.email}
            icon={Mail}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            icon={Lock}
          />

          {!isLogin && (
            <div>
              <label className="mb-2 block text-[0.875rem] font-medium text-gray-700">
                <Users className="inline w-4 h-4 mr-2" />
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'student', label: 'Student', emoji: '🎓' },
                  { value: 'company', label: 'Company', emoji: '🏢' },
                  { value: 'university', label: 'University', emoji: '🏛️' },
                  { value: 'admin', label: 'Admin', emoji: '⚙️' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center p-3 rounded-[var(--radius-lg)] border-2 cursor-pointer transition-all duration-200 ${
                      form.role === option.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={form.role === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-lg mr-2">{option.emoji}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.role && <p className="mt-2 text-[0.875rem] text-red-500 font-medium">{errors.role}</p>}
            </div>
          )}

          <Button 
            type="submit" 
            size="lg"
            className="w-full mt-8 relative overflow-hidden group"
            disabled={submitting}
            onClick={submit}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center">
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  <GraduationCap className="w-5 h-5 mr-2" />
                  {isLogin ? 'Sign in' : 'Create Account'}
                </>
              )}
            </span>
          </Button>

          {/* Additional Links */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              {isLogin ? (
                <Link
                  to="/signup"
                  className="text-primary hover:underline font-semibold transition-colors duration-200"
                >
                  Sign up here
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-primary hover:underline font-semibold transition-colors duration-200"
                >
                  Sign in here
                </Link>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By continuing, you agree to UniNest's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
