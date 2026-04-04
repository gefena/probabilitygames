## Context

The current UI uses `#F5F3FF` (violet-50) for the body background and pure `#FFFFFF` (white) for almost all containers and panels. This combination creates a high-brightness experience that can be taxing on the eyes.

## Goals / Non-Goals

**Goals:**
- Replace pure white backgrounds with softer off-white/gray/slate alternatives where appropriate.
- Reduce overall visual "harshness" while maintaining a clean, modern aesthetic.
- Ensure high readability and accessibility (contrast ratios).

**Non-Goals:**
- Implementing a full "Dark Mode".
- Changing the primary branding colors (violet, pink, etc.).

## Decisions

### 1. New Global Background
- **Choice**: Change body background from `violet-50` (#F5F3FF) to `slate-100` (#F1F5F9).
- **Rationale**: Slate-100 provides a more neutral and slightly darker base than violet-50, which reduces the overall "glow" of the screen.

### 2. Panel Containers
- **Choice**: Keep main panels as `bg-white` but soften them by adding a very subtle border (`border-slate-200/60`) and reducing shadow intensity.
- **Alternative**: Change panels to `slate-50`. 
- **Rationale**: Keeping panels white maintains the "clean sheet" look but making the background around them darker (`slate-100`) makes the white feel less aggressive.

### 3. Header and Sticky Elements
- **Choice**: Change header background from `bg-white` to `bg-white/80` with `backdrop-blur-md`.
- **Rationale**: Reduces the block of solid white at the top of the screen.

### 4. Background Gradients
- **Choice**: Simplify the `AppLayout` background from `bg-gradient-to-br from-violet-50 to-pink-50` to a solid `bg-slate-100` or a very subtle gradient.
- **Decision**: Use `bg-slate-100`.

## Risks / Trade-offs

- **[Risk]** → Low contrast between text and background if background is too dark.
  - **[Mitigation]** → Stick to level 50/100 for backgrounds and keep level 700/800 for text.
- **[Risk]** → Losing the "vibrant" feel of the educational app.
  - **[Mitigation]** → Maintain the vibrant accent colors (violet-600, emerald-500, etc.) for buttons and icons.
