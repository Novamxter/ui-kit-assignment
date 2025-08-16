import React from 'react'
import { cn } from '../lib/cn'

export type InputVariant = 'filled' | 'outlined' | 'ghost'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: InputVariant
  size?: InputSize
  type?: React.HTMLInputTypeAttribute
  loading?: boolean
  clearable?: boolean
  togglePassword?: boolean
  id?: string
}

const sizeMap: Record<InputSize, string> = {
  sm: 'h-9 text-sm px-3',
  md: 'h-10 text-base px-3.5',
  lg: 'h-11 text-base px-4',
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  loading = false,
  clearable = true,
  togglePassword = true,
  id,
}) => {
  const [internalType, setInternalType] = React.useState(type)
  const inputId = id || React.useId()
  const helpId = helperText ? `${inputId}-help` : undefined
  const errId = errorMessage ? `${inputId}-err` : undefined

  const base = 'w-full rounded-xl transition disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-200 '
  const ring = invalid
    ? 'ring-1 ring-red-500 focus:ring-2 focus:ring-red-500'
    : 'ring-1 ring-neutral-300 focus:ring-2 focus:ring-indigo-500 dark:ring-neutral-700'

  const byVariant: Record<InputVariant, string> = {
    filled: 'bg-neutral-100 dark:bg-neutral-800 border border-transparent',
    outlined: 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700',
    ghost: 'bg-transparent border border-transparent',
  }

  const cls = cn(
    base,
    ring,
    byVariant[variant],
    sizeMap[size],
    'pr-10', // room for icons/buttons
    invalid && 'text-red-700 dark:text-red-300 placeholder-red-400',
  )

  const showClear = clearable && !!value && !disabled && !loading
  const isPassword = (type === 'password' || internalType === 'password') && togglePassword

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-neutral-700 dark:text-white"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          className={cls}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={internalType}
          disabled={disabled || loading}
          aria-invalid={invalid || undefined}
          aria-describedby={[helpId, errId].filter(Boolean).join(' ') || undefined}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center dark:text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 animate-spin"
              aria-hidden
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                opacity="0.25"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Clear button */}
        {showClear && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: '' } } as any)
            }
            className="w-14 absolute inset-y-0 right-0 flex items-center justify-center rounded-r-xl text-[26px] bg-gray-100 dark:bg-gray-800 text-neutral-500 hover:text-neutral-700 dark:text-gray-400 dark:hover:text-gray-600"
            aria-label="Clear input"
          >
            ×
          </button>
        )}

        {/* Toggle password visibility */}
        {isPassword && !loading && (
          <button
            type="button"
            onClick={() =>
              setInternalType((t) => (t === 'password' ? 'text' : 'password'))
            }
            className="absolute inset-y-0 right-2 flex items-center pr-7 text-neutral-500 hover:text-neutral-700"
            aria-label="Toggle password visibility"
          >
            👁️
          </button>
        )}
      </div>

      {/* Helper / error text */}
      {helperText && !errorMessage && (
        <p
          id={helpId}
          className="mt-1 text-xs text-neutral-500 dark:text-neutral-400"
        >
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p
          id={errId}
          className="mt-1 text-xs text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default InputField
