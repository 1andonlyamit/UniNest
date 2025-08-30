function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseStyles = 'inline-flex items-center justify-center rounded-[var(--radius-lg)] font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/30 shadow-[var(--shadow-md)]',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/30 shadow-[var(--shadow-md)]',
  ghost: 'bg-transparent hover:bg-muted/10 text-black border-2 border-gray-200 hover:border-gray-300',
}

const sizes = {
  sm: 'h-9 px-4 text-[0.875rem]',
  md: 'h-11 px-5 text-[1rem]',
  lg: 'h-12 px-6 text-[1.125rem]',
}

export default function Button({
  as: Component = 'button', 
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={classNames(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
