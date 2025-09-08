# Buildings Time Series Feature

A React demo application for exporting time series data, created as a technical assessment for a job application.

## Project Overview

This project was built in response to a UI design & implementation task that required creating a high-fidelity mockup and implementing a feature that allows users to download time series data from electricity meters and rooms within buildings.

### Task Requirements

The feature needed to:
- Allow users to select a time series (associated with either an electricity meter or a room)
- Include a date range picker
- Enable users to choose file format for download (CSV or JSON)
- Provide appropriate feedback after initiating download
- Simulate API calls with both successful and failed responses
- Display mock data in a modal upon successful download

### Implementation Approach

I implemented two different approaches to solve this problem:

**1. Contextual Export (First Approach)**
- Export functionality tied to specific rooms and meters
- Users navigate through building hierarchy to access building pages
- Each room/meter has its own 'Export' button that opens a modal
- Maintains context and is intuitive when viewing specific asset data

**2. Centralized Export Page (Second Approach)**
- Dedicated data export interface with hierarchy selectors
- Building dropdown with search functionality (accounting for hundreds of buildings)
- Asset type selection (Room/Meter)
- Single, dedicated interface for all data exports

**Technical Note**: The export button simulates failed API requests on first click, returning success on the second click to demonstrate error handling.

### Deliverables

1. **High-fidelity mockup**: [Figma Design](https://www.figma.com/design/XXdvRqfE2dDUrtEbEvTvZG/Export-Data-Feature?node-id=0-1&p=f)
2. **Hosted demo**: 
   - [Approach 1: Contextual Export](https://timeseries-export.netlify.app/buildings) (export from room/meter cards)
   - [Approach 2: Centralized Export](https://timeseries-export.netlify.app/export) (dedicated export page)
3. **Complete React implementation**: This repository with source code

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
