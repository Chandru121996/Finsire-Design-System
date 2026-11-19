import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// Name and brand colour of the Storybook interface itself (sidebar logo and highlights).
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Finsire Design System',
    brandUrl: 'https://github.com/Chandru121996/Finsire-Design-System',
    colorPrimary: '#065b79',
    colorSecondary: '#065b79',
    fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
  }),
})
