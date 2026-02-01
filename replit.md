# HackerAI

## Overview

HackerAI is an AI-powered penetration testing assistant that helps security teams conduct comprehensive penetration tests. The application provides an AI chat interface with integrated tools for scanning, exploiting, and analyzing web applications, networks, and cloud environments. Users can interact in two modes: "Ask" mode for general security questions and "Agent" mode for autonomous task execution in a sandboxed environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS 4 with shadcn/ui components (New York style)
- **State Management**: React Context (GlobalState) for app-wide state, React Query for server state
- **UI Components**: Radix UI primitives with custom styling, Lucide icons
- **Build**: Turbopack for development, standard Next.js build for production

### Backend Architecture
- **Primary Backend**: Convex for real-time database, mutations, queries, and actions
- **API Routes**: Next.js API routes for Stripe webhooks, WorkOS auth callbacks, and AI streaming
- **AI Integration**: Vercel AI SDK with multiple providers (OpenAI, Google, XAI via OpenRouter)
- **Sandbox Execution**: E2B cloud sandboxes for agent mode code execution, with optional local sandbox fallback

### Authentication & Authorization
- **Provider**: WorkOS AuthKit for user management and SSO
- **Session Handling**: JWT-based authentication with Convex custom JWT provider
- **Subscription Tiers**: Free, Pro, Ultra, and Team tiers with feature gating
- **Rate Limiting**: Upstash Redis for per-user, per-tier rate limiting

### Data Storage
- **Primary Database**: Convex (NoSQL document database with real-time sync)
- **File Storage**: Dual support for Convex storage and Amazon S3 with presigned URLs
- **Schema**: Defined in `convex/schema.ts` - includes chats, messages, files, memories, feedback, and user customization tables
- **Aggregates**: Uses @convex-dev/aggregate for efficient O(log n) file counting per user

### Real-time Features
- **Chat Streaming**: AI responses stream to clients via Convex real-time subscriptions
- **Temp Streams**: Coordination layer for managing active AI streams
- **Background Processes**: Tracking for long-running sandbox commands

## External Dependencies

### Required Services
- **Convex**: Real-time database and backend functions (`convex/` directory)
- **WorkOS**: Authentication provider - handles login, signup, SSO, and user management
- **OpenRouter**: AI model routing for multiple LLM providers
- **OpenAI**: Direct API access for moderation and specific model features
- **Google AI Studio**: Gemini model access
- **XAI**: Grok model access for agent mode
- **E2B**: Cloud sandbox environment for secure code execution in agent mode

### Optional Services
- **Amazon S3**: Alternative file storage with presigned URL generation
- **Upstash Redis**: Rate limiting implementation
- **Stripe**: Payment processing for subscription management (Pro, Ultra, Team tiers)
- **Exa**: Web search functionality for AI tools
- **Jina AI**: Web URL content retrieval
- **Redis**: Stream resumption for interrupted AI responses
- **PostHog**: Analytics tracking (configurable for paid vs free users)

### Development & Testing
- **Playwright**: End-to-end testing framework with multi-tier test users
- **Jest**: Unit testing with extensive mocking for external services
- **Drizzle**: ORM configured for PostgreSQL (schema in `shared/schema.ts`, migrations in `migrations/`)