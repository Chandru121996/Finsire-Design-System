import { useEffect, useId, useRef, useState, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon/Icon'

export const searchInputVariants = cva(
  [
    'flex h-10 w-full items-center gap-2 border px-3 transition-colors hover:border-border-strong',
    'focus-within:border-border-focus focus-within:inset-ring-1 focus-within:inset-ring-border-focus',
  ],
  {
    variants: {
      // Figma Type
      variant: {
        default: 'rounded-md border-border-default bg-surface-base',
        muted: 'rounded-md border-transparent bg-surface-muted',
        pill: 'rounded-full border-border-default bg-surface-base',
      },
      disabled: {
        true: 'pointer-events-none bg-disabled-background',
        false: '',
      },
    },
    compoundVariants: [
      { variant: ['default', 'pill'], disabled: true, className: 'border-border-default' },
      { variant: 'muted', disabled: true, className: 'border-transparent' },
    ],
    defaultVariants: { variant: 'default', disabled: false },
  },
)

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'size'>,
    Omit<VariantProps<typeof searchInputVariants>, 'disabled'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Keyboard key that focuses the field from anywhere on the page, shown as a hint. Default "/". Pass null to hide. */
  shortcut?: string | null
  /** Screen reader label. Default "Search". */
  label?: string
  className?: string
}

export function SearchInput({
  variant,
  value,
  defaultValue = '',
  onValueChange,
  shortcut = '/',
  label = 'Search',
  placeholder = 'Search…',
  disabled,
  className,
  id,
  ...props
}: SearchInputProps) {
  const autoId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [innerValue, setInnerValue] = useState(defaultValue)
  const text = value ?? innerValue
  const setText = (next: string) => {
    setInnerValue(next)
    onValueChange?.(next)
  }

  // Pressing the shortcut key focuses the search, unless the user is already typing somewhere.
  useEffect(() => {
    if (!shortcut || shortcut.length !== 1 || disabled) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key !== shortcut || target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      event.preventDefault()
      inputRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [shortcut, disabled])

  const muted = disabled ? 'text-disabled-foreground' : 'text-text-secondary'
  return (
    <div className={cn(searchInputVariants({ variant, disabled }), className)}>
      <Icon name="search" size={20} className={muted} />
      <input
        ref={inputRef}
        id={id ?? autoId}
        type="search"
        aria-label={label}
        value={text}
        onChange={event => setText(event.target.value)}
        onKeyDown={event => event.key === 'Escape' && text && setText('')}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-full min-w-0 flex-1 bg-transparent text-body-small text-text-primary outline-none [&::-webkit-search-cancel-button]:hidden',
          'placeholder:text-text-tertiary disabled:placeholder:text-disabled-foreground',
        )}
        {...props}
      />
      {text ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setText('')
            inputRef.current?.focus()
          }}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary hover:bg-interaction-hover outline-border-focus focus-visible:outline-2"
        >
          <Icon name="close" size={16} />
        </button>
      ) : (
        shortcut && (
          <kbd
            className={cn(
              'flex min-h-[22px] min-w-[22px] shrink-0 items-center justify-center rounded-sm border border-border-default px-2 font-sans text-body-xsmall',
              disabled ? 'bg-disabled-background text-disabled-foreground' : 'bg-surface-base text-text-secondary',
            )}
          >
            {shortcut}
          </kbd>
        )
      )}
    </div>
  )
}
