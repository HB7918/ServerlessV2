# AWS OpenSearch Serverless Collections UI

A modern React application for managing AWS OpenSearch Serverless Collections, built with Cloudscape Design System.

## Features

### Collection Management
- **Collection List** - View and manage all collections with advanced features:
  - Search and filter collections
  - Multi-select with bulk actions
  - Pagination (10, 20, or 50 items per page)
  - Resizable columns
  - Collection preferences (compact mode, striped rows, wrap lines)
  - 25 sample collections for testing

### Create Collection Workflows
- **Create Collection v2** - Latest generation serverless collections:
  - 2-step wizard (Configure settings, Review and create)
  - Collection details (name, type, group)
  - Encryption settings with AWS KMS key customization
  - Network access (Public/Private with VPC options)
  - Tags management
  - Form validation and error handling

- **Create Collection v1** - Previous generation serverless collections:
  - 3-step wizard with automatic semantic enrichment
  - Legacy collection configuration
  - Easy navigation between v1 and v2 flows

### Collection Details
- View comprehensive collection information
- Tabbed interface (Overview, Indexes, Monitoring)
- Endpoints and configuration details
- Encryption, network access, and data lifecycle settings

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Cloudscape Design System** - AWS UI component library
- **React Router** - Client-side routing (state-based)

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173/`

## Project Structure

```
src/
├── components/
│   └── AWSLayout.jsx          # Main layout with header, nav, breadcrumbs
├── App.jsx                     # Main app with routing logic
├── CollectionList.jsx          # Collections table with search/filter
├── CreateCollection.jsx        # Create Collection v2 wizard
├── CreateCollectionV1.jsx      # Create Collection v1 wizard
├── CollectionDetails.jsx       # Collection details view
├── main.jsx                    # App entry point
└── index.css                   # Global styles with orange button theme
```

## Key Features

### AWS Console Experience
- Full AWS console layout with top navigation
- Collapsible side navigation
- Breadcrumb navigation
- Info icons and help links throughout

### Responsive Design
- Full-width table layout
- Resizable columns
- Mobile-friendly components

### Custom Styling
- Orange primary buttons (AWS branding)
- Black text on orange buttons
- Cloudscape design tokens

## Navigation Flow

1. **Collection List** → Click collection name → **Collection Details**
2. **Collection List** → Click "Create collection" → **Create Collection v2**
3. **Create Collection v2** → Click "Create Serverless v1 collection" → **Create Collection v1**
4. **Create Collection v1** → Click "Create Serverless v2 collection" → **Create Collection v2**
5. **Review Step** → Click "Edit" → Navigate back to Step 1

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

To modify the primary button color, edit `src/index.css`:

```css
:root {
  --color-background-button-primary-default: #ff9900;
  --color-text-button-primary-default: #000000;
}
```

## License

MIT

## Author

Built with Kiro AI Assistant
