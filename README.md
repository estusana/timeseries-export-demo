# Buildings Time Series Feature

A React demo application for exporting time series data.

## Tech Stack

- **React** v18.3.1
- **TypeScript** v5.6.2
- **Node.js** v18+ recommended
- **Vite** v6.0.1 as build tool

## Key Features

- Export functionality for time series data
- Dashboard layout with responsive design (though mobile browsers not tested)
- Building cards and display components

## UI Components

- [Mantine UI](https://mantine.dev/) v7.14.3 - Modern React component library
- [@tabler/icons-react](https://tabler-icons.io/) v3.24.0 - SVG icons collection

## Project Architecture

The project follows [Feature-Sliced Design](https://feature-sliced.design/) methodology for structuring the codebase:

```
src/
├── entities/       # Business entities (building-card, display-card)
├── features/       # User interactions, features (export-modal)
├── pages/          # Application pages
├── shared/         # Shared code, UI kit, libs, API
└── widgets/        # Composite components (dashboard-layout)
```

### Key Architectural Decisions

- Feature-based modular architecture
- Shared UI components for consistency
- Type-safe development with TypeScript
- Modern React practices with hooks
- Efficient build system with Vite

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Additional Tools

- dayjs for date manipulation
- React Router v7 for routing
- PostCSS with Mantine preset for styling
- ESLint for code quality
