import React, { useState, useEffect } from 'react'
import { Building2, User, Mail, Lock, Phone, Globe, MapPin, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

// Mock UI components - replace with your actual UI components
const Input = ({ label, name, type = "text", value, onChange, placeholder, error, icon: Icon }) => (
  <div>
    <label className="mb-2 block text-[0.875rem] font-medium text-gray-700">
      {Icon && <Icon className="inline w-4 h-4 mr-2" />}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${
        error 
          ? 'border-red-300 bg-red-50 focus:border-red-500' 
          : 'border-gray-200 bg-white focus:border-blue-500'
      } focus:outline-none`}
    />
    {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
  </div>
)

const Spinner = ({ size = "md", color = "blue" }) => (
  <div className={`animate-spin rounded-full border-2 border-transparent border-t-${color}-600 ${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'}`}></div>
)

export default function CompanySignupForm({ onSubmit, submitting = false }) {
  const [form, setForm] = useState({
    sector: '',
    address: '',
    website: '',
    contactPersonName: '',
    contactPersonEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [token, setToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Extract token from URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setErrors({ general: 'Invalid registration link. Token is missing.' })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    
    if (!token) nextErrors.general = 'Registration token is missing'
    if (!form.sector) nextErrors.sector = 'Sector is required'
    if (!form.address) nextErrors.address = 'Address is required'
    if (!form.website) nextErrors.website = 'Website is required'
    if (!form.contactPersonName) nextErrors.contactPersonName = 'Contact person name is required'
    if (!form.contactPersonEmail) nextErrors.contactPersonEmail = 'Contact person email is required'
    if (!form.phone) nextErrors.phone = 'Phone number is required'
    if (!form.password) nextErrors.password = 'Password is required'
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirm password is required'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (form.contactPersonEmail && !emailRegex.test(form.contactPersonEmail)) {
      nextErrors.contactPersonEmail = 'Please enter a valid email address'
    }
    
    // Password validation
    if (form.password && form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const payload = {
        token: token,
        sector: form.sector,
        address: form.address,
        website: form.website,
        contact_person_name: form.contactPersonName,
        contact_person_email: form.contactPersonEmail,
        phone: form.phone,
        password: form.password
      }

      const response = await fetch('http://localhost:8888/university/company/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        // Success - call the onSubmit prop if provided
        onSubmit?.(data)
        alert('Company registration successful!')
      } else {
        // Handle API errors
        setErrors({ general: data.message || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show error if no token
  if (!token && errors.general) {
    return (
      <div className="min-h-auto w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Invalid Registration Link</h2>
            <p className="text-red-600">{errors.general}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-auto w-full flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-2xl)] bg-gradient-to-br from-primary to-secondary shadow-[var(--shadow-lg)] mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[var(--text-h1)] font-bold text-primary font-[var(--font-warm)] tracking-tight">
            UniNest
          </h1>
          <p className="text-muted mt-1 font-medium">
            Partner with universities and students
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-2xl)] border-2 border-white/50 p-8 shadow-[var(--shadow-lg)] space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-[var(--text-h3)] font-bold text-gray-900 font-[var(--font-warm)]">
              Register Your Company
            </h2>
            <p className="text-gray-600 mt-1">
              Join our network of leading employers
            </p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 font-medium">{errors.general}</p>
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Company Information
              </h3>
              
              <Input
                label="Sector/Industry"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                placeholder="e.g., Technology, Healthcare, Finance"
                error={errors.sector}
                icon={Briefcase}
              />

              <Input
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter company address"
                error={errors.address}
                icon={MapPin}
              />

              <Input
                label="Website"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://www.yourcompany.com"
                error={errors.website}
                icon={Globe}
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Contact Information
              </h3>
              
              <Input
                label="Contact Person Name"
                name="contactPersonName"
                value={form.contactPersonName}
                onChange={handleChange}
                placeholder="Enter contact person's full name"
                error={errors.contactPersonName}
                icon={User}
              />

              <Input
                label="Contact Person Email"
                name="contactPersonEmail"
                type="email"
                value={form.contactPersonEmail}
                onChange={handleChange}
                placeholder="contact.person@company.com"
                error={errors.contactPersonEmail}
                icon={Mail}
              />

              <Input
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                error={errors.phone}
                icon={Phone}
              />
            </div>

            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Security
              </h3>
              
              <Input
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
                error={errors.password}
                icon={Lock}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                icon={Lock}
              />
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full mt-8 relative overflow-hidden group"
              disabled={isSubmitting || submitting}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                {(isSubmitting || submitting) ? (
                  <>
                    <Spinner size="sm" color="white" />
                    <span className="ml-2">Creating account...</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5 mr-2" />
                    Register Company
                  </>
                )}
              </span>
            </Button>
          </form>

          {/* Additional Links */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              Already have an account? 
              <Link to='/login' className="text-blue-600 hover:underline font-semibold cursor-pointer ml-1">
                Sign in here
              </Link>
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