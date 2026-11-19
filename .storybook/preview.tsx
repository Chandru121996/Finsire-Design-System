import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The page background comes from the surface/page token, so it follows Light and Dark.
    backgrounds: { disable: true },
    options: {
      storySort: { order: ['Foundations', ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Icons'], 'Components', 'Reference screens'] },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { Light: '', Dark: 'dark' },
      defaultTheme: 'Light',
      parentSelector: 'html',
    }),
  ],
}

export default preview
