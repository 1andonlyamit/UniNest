import React from 'react'

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <div className={"w-full " + className}>
      {label && (
        <label htmlFor={name} className="mb-2 block text-[0.875rem] font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-[var(--radius-lg)] border-2 border-gray-200 bg-white px-3 py-3 text-[1rem] text-black transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 ${Icon ? 'pl-11' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-[0.875rem] text-red-500 font-medium">{error}</p>}
    </div>
  )
}

export default Input;
