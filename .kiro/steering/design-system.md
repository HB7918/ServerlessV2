---
inclusion: always
---

# Design System Rules for Figma Integration

This document defines the design system patterns and conventions for integrating Figma designs into this codebase.

## Frameworks & Libraries

- **UI Framework**: React 19 with JSX
- **Component Library**: AWS Cloudscape Design System (`@cloudscape-design/components`)
- **Build System**: Vite 7
- **Backend**: AWS Amplify with GraphQL (AppSync)

## Component Architecture

### Location
- Reusable components: `src/components/`
- Page-level components: `src/` (root level)

### Patterns
- Functional components with React hooks
- Props-based configuration
- Cloudscape components as building blocks

### Key Components
- `AWSLayout.jsx` - Main layout wrapper with TopNavigation, SideNavigation, AppLayout
- `CommentsPanel.jsx` - Floating comments/annotation system

## Styling Approach

### CSS Methodology
- Global CSS files (`index.css`, `App.css`)
- Cloudscape CSS custom properties for theming
- No CSS modules or styled-components

### Color System (AWS Brand)
```css
--color-background-button-primary-default: #ff9900  /* AWS Orange */
--color-background-button-primary-hover: #ec7211
--color-background-button-primary-active: #eb5f07
--color-text-button-primary-default: #000000
```

### Typography
- System font stack: `system-ui, Avenir, Helvetica, Arial, sans-serif`
- Line height: 1.5
- Font weight: 400 (normal)

## Cloudscape Component Usage

When generating UI from Figma, map designs to these Cloudscape components:

| Design Element | Cloudscape Component |
|---------------|---------------------|
| Page layout | `AppLayout` |
| Navigation | `TopNavigation`, `SideNavigation` |
| Data tables | `Table` with `Header`, `Pagination` |
| Forms | `Form`, `FormField`, `Input`, `Select` |
| Buttons | `Button` (variants: primary, normal, link) |
| Alerts/Banners | `Flashbar`, `Alert` |
| Cards | `Container`, `Box` |
| Modals | `Modal` |
| Status | `StatusIndicator` |
| Links | `Link` |
| Spacing | `SpaceBetween` |
| Help content | `HelpPanel` |

## Asset Management

- Static assets: `public/` directory
- SVG icons: Use Cloudscape's built-in `iconName` prop
- Images referenced via relative paths from public folder

## Code Generation Guidelines

When converting Figma designs to code:

1. **DO NOT use Tailwind CSS** - This project uses Cloudscape and plain CSS
2. **Use Cloudscape components** instead of raw HTML elements
3. **Follow existing patterns** in `CollectionList.jsx` for table pages
4. **Use `AWSLayout`** wrapper for all page-level components
5. **Apply AWS orange theme** for primary actions
6. **Use `SpaceBetween`** for consistent spacing between elements

## Example Component Structure

```jsx
import {
  Table,
  Button,
  Header,
  SpaceBetween,
  Box
} from '@cloudscape-design/components';
import AWSLayout from './components/AWSLayout';

function MyComponent({ onNavigate }) {
  const breadcrumbs = [
    { text: 'Amazon OpenSearch Service', href: '#' },
    { text: 'My Page', href: '#/my-page' }
  ];

  return (
    <AWSLayout 
      breadcrumbs={breadcrumbs}
      activeHref="#/my-page"
      onNavigate={onNavigate}
    >
      <SpaceBetween size="l">
        {/* Content here using Cloudscape components */}
      </SpaceBetween>
    </AWSLayout>
  );
}

export default MyComponent;
```

## Responsive Design

- Cloudscape handles responsive behavior automatically
- Use `maxContentWidth={Number.MAX_VALUE}` for full-width layouts
- Mobile breakpoints managed by Cloudscape's AppLayout
