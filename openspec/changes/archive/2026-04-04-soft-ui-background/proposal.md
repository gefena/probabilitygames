## Why

The current white and light-violet backgrounds are reported as "too bright" by users. This change introduces a softer, lower-contrast color palette (using slate and gray tones) to improve visual comfort and readability, especially during extended use.

## What Changes

- **Background Palette**: Transition from `violet-50` and `white` to a mix of `slate-50`, `slate-100`, and `gray-50`.
- **Global Background**: Update the body background to a softer slate tone.
- **Panel Containers**: Update `bg-white` panels to use softer backgrounds or more subtle shadows to reduce harsh contrast.
- **Header**: Soften the header background.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `site-shell`: Requirements for global background and common layout components (header, panels).

## Impact

- `src/index.css`: Global body background and base styles.
- `src/components/AppLayout.jsx`: Main site layout and header.
- `src/components/ExplainerPanel.jsx`: Shared panel component.
- Individual game pages: High-level containers that currently use `bg-white`.
