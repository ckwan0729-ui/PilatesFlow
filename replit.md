# Overview

This is a full-stack Pilates class management application built with React and Express. The application allows users to create and schedule Pilates classes, manage a library of Pilates movements, and build class sequences. It features a calendar interface for viewing and organizing classes, a comprehensive movement database with advanced filtering and search capabilities, and a template system for saving and reusing class configurations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Extensive use of Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming, including iOS-style color palette
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation using @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with proper HTTP status codes and error handling
- **Request Logging**: Custom middleware for API request/response logging with performance metrics
- **Error Handling**: Centralized error handling middleware with proper status codes

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation with sample data for development
- **Connection**: Neon Database serverless PostgreSQL for production

## Database Schema Design
- **Movements Table**: Stores Pilates exercises with categorization, difficulty levels, instructions, and safety precautions
- **Classes Table**: Stores scheduled classes with metadata and movement sequences stored as JSON arrays
- **Templates Table**: Stores reusable class templates with sequences, tags, and metadata for quick class creation
- **Validation**: Zod schemas for runtime type checking and API validation

## Development and Build Configuration
- **Development Server**: Vite dev server with HMR and custom middleware integration
- **Production Build**: Dual build process - Vite for frontend assets, esbuild for server bundle
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **TypeScript**: Strict configuration with path mapping for better developer experience

## External Dependencies

- **Database**: Neon Database serverless PostgreSQL
- **UI Components**: Radix UI primitives for accessible component foundation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel**: Embla Carousel for interactive image/content carousels
- **Development Tools**: Replit-specific plugins for error overlay and cartographer integration