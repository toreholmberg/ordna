# Debug Panel

A floating developer utility for seeding and resetting app data without touching localStorage manually.

## Location

Fixed bottom-right corner of the app (`bottom-24 right-4`), sitting above the bottom navigation bar. Rendered on every page via the `(app)` layout.

## Usage

Click the wrench icon to open a small card with three actions:

| Action           | What it does                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Seed**         | Adds mock recipes, a meal plan for the current week, and recurring item templates. Additive — existing data is kept. |
| **Clear**        | Resets all stores to empty (categories reset to defaults).                                                           |
| **Reset & Seed** | Clears all stores first, then seeds fresh mock data. Most useful for getting back to a known good state.             |

After any action the panel closes automatically.

## Implementation

- `src/components/app/DebugPanel.tsx` — the component
- `src/lib/seed.ts` — the pure `seedMockData()` function (unchanged)
- Each store exposes a `reset()` action; `useCategoryStore.reset()` restores `DEFAULT_CATEGORIES` rather than clearing to empty

## Notes

- The panel is always rendered (including production builds), making it easy for demos and manual QA without needing a dev-only build flag.
- The icon is semi-transparent (`opacity-60`) so it doesn't distract during normal use.
