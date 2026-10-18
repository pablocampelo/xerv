# Design system

Use the semantic tokens and shared styles in [app/globals.css](../app/globals.css). Typography is configured in [app/layout.tsx](../app/layout.tsx); product identity lives in [config/product.ts](../config/product.ts).

## Shared components

| Component | Purpose |
| --- | --- |
| [Button](../components/ui/button.tsx) | Primary, outline, ghost and destructive actions |
| [Patterns](../components/shared/patterns.tsx) | Panels, notices, badges, headings and empty states |
| [Dialog](../components/ui/dialog.tsx) | Dialogs and mobile drawers |
| [Brand](../components/shared/brand.tsx) | Product name and icon |

## Guidelines

- Reuse tokens and components before introducing new styles.
- Keep primary actions clear and secondary actions neutral.
- Use surface contrast rather than heavy shadows.
- Preserve readable contrast, visible keyboard focus and reduced-motion support.
- Keep layout and theme changes independent of authentication, ownership and billing behavior.

For share images, see [Social preview](SOCIAL-PREVIEW.md).
