# Finsire Design System

React components for the Finsire lending platform, built from the Figma file
[Design System to Code](https://www.figma.com/design/Wkx269BTFQxRQCdkF1yYWD/Design-System-to-Code).
Every colour, size and font comes from the Figma Variables, in Light and Dark mode.

**Live component library (Storybook):** https://chandru121996.github.io/Finsire-Design-System/

Built with React, TypeScript, Tailwind CSS, Radix UI and Storybook, in the style of shadcn/ui.

## What's inside

| Area | Components |
|---|---|
| Foundations | Colours, Typography, Spacing, Radius, Shadows, Icons (Material Symbols Rounded) |
| Basics | Icon, Button, Icon button, Notification bell, Badge, Avatar, Separator, Spinner, Skeleton, Tooltip |
| Forms | Input, Textarea, Checkbox, Radio group, Switch, Select, Slider, Calendar, Date picker, Search input, Filter chip |
| Feedback | Alert, Toast, Progress bar, Alert dialog, Empty state |
| Navigation | Breadcrumbs, Tabs, Pagination, Pagination bar, Dropdown menu, Menu bar, Sidebar, Nav item, Top nav bar |
| Containers | Card, Stat card, KPI card, Chart card, Legend item, Accordion, Collapsible, Hover card, Attachment |
| Overlays | Sheet, Drawer |
| Data | Data table and table building blocks, Chart (horizontal bar, bar and line, line) |
| Layout | App shell (Sidebar + Top nav + Main), Page header |
| Reference screens | Master Log, Credit Dashboard |

## Run it on your computer

You need [Node.js](https://nodejs.org) (the LTS version).

```bash
npm install          # first time only: downloads the libraries
npm run storybook    # opens the component library at http://localhost:6006
```

Use the paintbrush icon in Storybook's toolbar to switch between Light and Dark.

Other commands:

| Command | What it does |
|---|---|
| `npm run tokens` | Regenerates the CSS from `tokens/tokens.json` after a token changes |
| `npm run lint` | Checks the code, including that every spacing value is on the Figma scale |
| `npm run build` | Type-checks and builds the app |
| `npm run build-storybook` | Builds the static Storybook site into `storybook-static/` |

## Using the components

```tsx
import './index.css' // once, at the root of your app: fonts, tokens and Tailwind
import { Button, Badge, KpiCard, formatINR } from './index'

<Button leadingIcon="add">Add money</Button>
<Badge variant="success">Completed</Badge>
<KpiCard value="₹224 Cr" title="Total Pledged Amount" target="Target: ≥ 20% MoM" status="caution" />
<p className="tabular-nums">{formatINR(1211026)}</p> // ₹12,11,026.00
```

- Dark mode: add the `dark` class to `<html>`.
- Toasts: put `<Toaster />` once in the app, then call `toast({ variant: 'success', title: 'Transfer sent' })`.
- Money: `formatINR`, `formatINRCompact` (₹224 Cr, ₹3.4 L), `formatNumberIN` and `formatDateIN` use Indian grouping.
- Dense screens: `<Table density="compact">` / `<DataTable density="compact">` (40px rows, one line per cell, full text in a tooltip),
  `<FilterChip size="small">`, `<PaginationBar size="small">` and `<PageHeader compact>`. The Master Log screen uses all of them.
- Wide tables: `<Table stickyStart={2} stickyEnd={2}>` keeps the first and last columns fixed while the middle scrolls sideways
  (‹ › buttons on hover, Shift + mouse wheel, the scrollbar, a trackpad swipe, or the ← → keys).

## Design tokens

```
Figma Variables ──> tokens/tokens.json ──npm run tokens──> src/styles/variables.css  (CSS variables, :root = Light, .dark = Dark)
                                                     └──> src/styles/theme.css      (Tailwind classes: bg-surface-page, text-heading-h3 …)
```

- Variable names match the Figma WEB code syntax, e.g. `--color-primary-default`, `--spacing-4`.
- Components only use **semantic** tokens (`surface/*`, `text/*`, `primary/*` …), never raw hex values or primitives.
- Spacing is strict: only the Figma steps exist (`p-4` = 16px). Use an arbitrary value such as `h-[56px]` for anything else; `npm run lint` flags mistakes.

## Project layout

```
tokens/tokens.json        Design tokens exported from Figma (source of truth)
scripts/                  Token generator and spacing check
src/styles/               Generated CSS (do not edit by hand)
src/components/<Name>/    One folder per component: <Name>.tsx and <Name>.stories.tsx
src/foundations/          Storybook pages for colours, type, spacing, radius, shadows, icons
src/screens/              Reference screens built only from library components
src/lib/                  Helpers: cn() for class names, Indian number and date formatting
src/index.ts              Everything the library exports
```

## Publishing

Every push to the `main` branch builds Storybook and publishes it to GitHub Pages automatically
(see `.github/workflows/storybook.yml`).
