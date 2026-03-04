# Styling Conventions

## Stack

- **Tailwind CSS v4** — utility-first, configured via CSS (`@theme` in globals.css)
- **shadcn/ui** — pre-built accessible components. Files in `src/components/ui/` are READ ONLY
- **Mobile-first** — design for 390px width first, scale up with `sm:` / `md:` prefixes

## Key Patterns

### Touch Targets

All interactive elements must be at minimum 44×44px (Apple HIG). Shopping list items are 56px min height.

### Component Structure

```tsx
// Named export, co-located with usage
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return <div className="bg-card rounded-lg border p-4">...</div>
}
```

### Conditional Classes

Use `cn()` from `@/lib/utils` for conditional Tailwind classes:

```tsx
import { cn } from '@/lib/utils'
;<div className={cn('base-class', condition && 'conditional-class')} />
```

### Color System

Use shadcn CSS variables for theming:

- `bg-background` / `text-foreground` — main background/text
- `bg-card` / `text-card-foreground` — card surfaces
- `bg-muted` / `text-muted-foreground` — subtle backgrounds/labels
- `bg-primary` / `text-primary-foreground` — accent/interactive
- `border` — default border

### Typography

- Page titles: `text-lg font-semibold`
- Section labels: `text-sm font-medium text-muted-foreground`
- Body: `text-sm`
- Large tap targets get `text-base`

## Layout Patterns

### Page Layout

```tsx
// All pages use this structure via (app)/layout.tsx
<main className="flex-1 overflow-y-auto pb-20">
  {' '}
  {/* pb-20 for bottom nav */}
  <div className="container mx-auto max-w-2xl px-4 py-4">{children}</div>
</main>
```

### Bottom Sheet (AddItemSheet)

Uses shadcn `Sheet` component with `side="bottom"`.

### Dialog (RecipePicker)

Uses shadcn `Dialog` component.

## Component Rules

- No inline `style` attributes — use Tailwind only
- No custom CSS files beyond `globals.css`
- `globals.css` only contains CSS variables and base styles — no component styles
