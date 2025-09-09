# TheCueRoom v2 - Project Documentation

## Overview
TheCueRoom v2 is a social playground for cues, built as a monorepo with web and mobile applications. The project uses Next.js for the web frontend, Expo for mobile, and integrates with Supabase for the backend.

## Current State
- **Status**: Successfully imported and configured for Replit environment
- **Web App**: Running on port 5000 with Next.js 15.5.2
- **Dependencies**: All installed and working
- **Environment**: Configured for development in Replit

## Recent Changes (September 9, 2025)
- Successfully implemented comprehensive security and accessibility solution
- Created pixel-perfect authentication modal system matching provided screenshots
- Implemented locked BrandLogo component with unit tests to prevent mutations
- Added comprehensive Zod validation schemas for all forms and environment variables
- Integrated security middleware with CSP headers, XSS protection, and frame protection
- Created error boundary system for graceful error handling
- Built accessibility testing with axe-playwright and WCAG AA compliance
- Added Playwright visual regression tests for landing page consistency
- Implemented 6-digit code verification modal with countdown timer
- Enhanced middleware with auth protection for sensitive routes
- All components tested and working in Replit environment

## Project Architecture
### Frontend (Web)
- **Framework**: Next.js 15.5.2 with React 18.2.0
- **Styling**: Tailwind CSS
- **State Management**: React hooks with Supabase client
- **Testing**: Vitest for unit tests, Playwright for E2E

### Backend Integration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase subscriptions

### Packages Structure
- `packages/schemas`: Shared TypeScript schemas
- `packages/ui`: Shared UI components and agents
- `packages/db`: Database configuration and migrations

## Development Setup
The project is configured to run in Replit with:
- Web server on port 5000 (0.0.0.0 hostname)
- Hot reloading enabled
- Proper cross-origin request handling for Replit proxy
- Environment variables configured in apps/web/.env.local

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build Command**: `npm run build:web`
- **Start Command**: `npm start --prefix apps/web`

## Key Features
Based on the codebase structure, the application includes:
- User authentication and profiles
- Social feed with posts and reactions
- Gig radar with map integration
- Playlists and music integration (Spotify)
- Meme studio functionality
- Admin moderation tools
- Mobile-responsive design

## User Preferences
- Language: English
- Framework: Next.js preferred for web development
- Styling: Tailwind CSS for consistent design system
- Testing: Comprehensive test coverage with unit and E2E tests