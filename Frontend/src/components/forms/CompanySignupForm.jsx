import React, { useState } from 'react'
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

// const Button = ({ children, type = "button", size = "md", className = "", disabled, onClick }) => (
//   <button
//     type={type}
//     onClick={onClick}
//     disabled={disabled}
//     className={`px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
//   >
//     {children}
//   </button>
// )

const Spinner = ({ size = "md", color = "blue" }) => (
  <div className={`animate-spin rounded-full border-2 border-transparent border-t-${color}-600 ${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'}`}></div>
)

export default function CompanySignupForm({ onSubmit, submitting = false }) {
  const [form, setForm] = useState({
    name: '',
    sector: '',
    address: '',
    website: '',
    contactPersonName: '',
    contactPersonEmail: '',
    companyEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    
    if (!form.name) nextErrors.name = 'Company name is required'
    if (!form.sector) nextErrors.sector = 'Sector is required'
    if (!form.address) nextErrors.address = 'Address is required'
    if (!form.website) nextErrors.website = 'Website is required'
    if (!form.contactPersonName) nextErrors.contactPersonName = 'Contact person name is required'
    if (!form.contactPersonEmail) nextErrors.contactPersonEmail = 'Contact person email is required'
    if (!form.companyEmail) nextErrors.companyEmail = 'Company email is required'
    if (!form.phone) nextErrors.phone = 'Phone number is required'
    if (!form.password) nextErrors.password = 'Password is required'
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirm password is required'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (form.contactPersonEmail && !emailRegex.test(form.contactPersonEmail)) {
      nextErrors.contactPersonEmail = 'Please enter a valid email address'
    }
    if (form.companyEmail && !emailRegex.test(form.companyEmail)) {
      nextErrors.companyEmail = 'Please enter a valid email address'
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

          {/* ✅ Wrap form properly */}
          <form onSubmit={submit} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Company Information
              </h3>
              
              <Input
                label="Company Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter company name"
                error={errors.name}
                icon={Building2}
              />

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
                label="Company Email"
                name="companyEmail"
                type="email"
                value={form.companyEmail}
                onChange={handleChange}
                placeholder="info@company.com"
                error={errors.companyEmail}
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
              disabled={submitting}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                {submitting ? (
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
