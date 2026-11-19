# Code phase handoff: Design System to Code

Paste the "Starter prompt" at the bottom into Claude Code to begin. Everything above it is context Claude Code can read.

## Who and what
- User is a complete beginner to code, React and Git. Explain every step in plain words, one step at a time.
- Product: fintech SaaS web app (Indian loans/collateral; values in ₹ with Indian grouping, Cr and L units).
- Goal: turn the Figma design system into a coded library: React + TypeScript + Tailwind + Storybook, then a GitHub repo with Storybook on GitHub Pages.
- Style reference: shadcn/ui. Brand primary #065B79. Font Inter (Regular, Medium, Semibold). Light and Dark mode. Icons: Google Material Symbols (outlined, filled; sizes 16/20/24/32).

## Figma source
- File: "Design System to Code", fileKey `Wkx269BTFQxRQCdkF1yYWD` (https://www.figma.com/design/Wkx269BTFQxRQCdkF1yYWD/Design-System-to-Code)
- Pages: Cover, Documentation, Colors, Typography, Spacing, Radius, Shadows, Icons, Buttons & Basics, Forms, Feedback, Navigation, Containers, Overlays, Data Table, Charts, Dashboard Test (reference screens Master Log and Credit Dashboard).
- Read the Documentation page first: it describes token architecture, naming, foundations and the component index.
- Use the Figma MCP (get_variable_defs, get_design_context, get_screenshot). Load the figma-design-to-code skill before get_design_context.

## Tokens (Figma Variables)
- Collections: Primitives (palette), Color (semantic, modes Light and Dark), Spacing, Radius, Typography.
- Semantic color groups: surface/*, text/*, border/*, interaction/*, disabled/*, primary/*, secondary/*, success/*, warning/*, error/*, info/*, accent/* (each state color has an on-* partner), chart/series-1..6, chart/grid, chart/axis.
- Spacing: 0,4,8,12,16,20,24,32,40,48,64. Radius: none 0, sm 4, md 6, lg 8, xl 12, 2xl 16, full 9999.
- Text styles: Heading H1-H5, Body Large/Base/Small/XSmall, Label Large/Base/Small. Effect styles: Shadow xs-xl, Focus ring.
- Variables carry WEB code syntax names like var(--palette-accent-N): use them for CSS variable names.
- Plan: export to tokens.json + variables.css (:root for Light, .dark for Dark) + Tailwind theme mapping. Never hard-code hex values in components.
- Known limits: effect styles have no modes (shadows are subtle in dark); use font-variant-numeric: tabular-nums for money.

## Components (same names and props in code)
Icon, Button (Variant, Size, State; leading/trailing icon), Icon button (+ bordered), Badge (Default, Secondary, Success, Warning, Error, Info, Outline, Accent, Info outline, Accent outline), Avatar (initials, tones), Skeleton, Tooltip, Separator, Spinner.
Forms: Input, Checkbox, Radio, Switch, Select, Slider, Calendar, Date picker, Search input, Filter chip, Textarea.
Feedback: Alert, Toast, Progress bar, Alert dialog, Empty state.
Navigation: Breadcrumbs (Levels 1-3), Tabs (Line/Pill, optional icon), Pagination and Pagination bar, Menu item, Dropdown menu, Dropdown, Menu bar, Sidebar (Collapsed, Hover expanded, Expanded, Pinned), Nav item (Item/Parent/Child), Top nav bar (Desktop/Compact), Notification bell.
Containers: Card, Stat card, KPI card (Status Excellent/Caution/Critical/None), Chart card, Accordion, Collapsible, Hover card, Attachment.
Overlays: Sheet, Drawer.
Data Table: Table header, Table row, Data table (Default/Empty/Loading), Table header cell, Table cell (Text, Two lines, Number, Badge, Checkbox, Actions, Text and badge, Avatar and text).
Charts: Legend item, Chart (illustrative in Figma; use a real chart library in code, colors from chart/* tokens).

## Suggested build order
1. Export tokens. 2. Scaffold Vite + React + TS + Tailwind + Storybook (Light/Dark toggle, Inter and Material fonts). 3. Components in batches (Foundations, Forms, Feedback, Navigation, Containers, Overlays, Data table, Charts); one story per component showing all variants and states; user reviews Storybook after each batch. 4. Master Log and Credit Dashboard stories as final check. 5. README, GitHub repo, Storybook on GitHub Pages.

## Working style
- Ask the user at most one question at a time, only when needed. They say "go" to advance.
- Show results (Storybook running) before moving on. Keep explanations short and beginner-friendly.
- GitHub account needed only at the publish step.

## Starter prompt (paste into Claude Code)
I'm a complete beginner. I have a finished Figma design system (file key Wkx269BTFQxRQCdkF1yYWD, read its Documentation page first). Please read the handoff doc "code-phase-handoff.md" from my project and start with step 1: export the Figma variables to tokens.json, variables.css and a Tailwind theme, then scaffold the React + TypeScript + Tailwind + Storybook project. Explain each step simply and wait for me to say "go" before each next batch.
