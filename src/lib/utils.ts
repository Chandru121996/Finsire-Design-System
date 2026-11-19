import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge our Figma text styles and shadows, so that for example
// "text-label-base" (a text style) and "text-text-primary" (a colour) are not treated as duplicates.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'heading-h1', 'heading-h2', 'heading-h3', 'heading-h4', 'heading-h5',
        'body-large', 'body-base', 'body-small', 'body-xsmall',
        'label-large', 'label-base', 'label-small',
      ],
      shadow: ['focus'],
    },
  },
})

/** Combine class names. Later classes win over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
