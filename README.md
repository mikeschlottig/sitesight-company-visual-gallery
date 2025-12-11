# SiteSight — Company Visual Gallery

[![Deploy to Cloudflare Workers]([cloudflarebutton])]([cloudflarebutton])

SiteSight is a high-end, agency-quality web application that transforms a simple educational Ruby app into a multi-view product showcase. It enables users to discover and explore companies visually through OpenGraph images or homepage screenshots, presented in intuitive Gallery, List, and Table views. Built on Cloudflare Workers for edge performance, it delivers a polished, responsive frontend with modern UI components and smooth interactions.

## Features

- **Multi-View Interface**: Switch between Gallery (visual grid with thumbnails), List (readable cards), and Table (sortable data with pagination and bulk actions).
- **Visual Company Discovery**: Displays company thumbnails using mock OpenGraph images or placeholders; fallback to domain-based screenshots for demo.
- **Edge API**: Lightweight Cloudflare Worker serving mock company data (name, domain, description, tags, last updated) with query support for search, pagination, and filtering.
- **Shared Components**: Reusable UI elements including Header (with navigation and search), FiltersBar, CompanyCard, CompanyTable, and Detail Sheet for in-depth views.
- **Visual Excellence**: Hero landing page with gradients, micro-interactions via Framer Motion, responsive design, and shadcn/ui primitives for professional polish.
- **Data Management**: Uses React Query for efficient fetching, caching, and error handling; Sonner for toast notifications.
- **Demo-Ready**: Immediately deployable with mock data; extensible for real OG scraping and caching in production.

## Technology Stack

- **Frontend**: React 18, React Router 6, TypeScript
- **UI Library**: shadcn/ui (with Radix UI primitives: Button, Card, Input, Sheet, Table, etc.)
- **Styling**: Tailwind CSS v3 (responsive, utility-first)
- **State & Data**: Zustand (UI store), @tanstack/react-query (data fetching/caching)
- **Animations**: Framer Motion (micro-interactions, transitions)
- **Icons & Utils**: Lucide React (icons), clsx/tailwind-merge (class utilities)
- **Notifications**: Sonner (toasts)
- **Backend/Edge**: Cloudflare Workers (Hono router), Wrangler for deployment
- **Build Tools**: Vite (fast dev server), Bun (package manager)
- **Other**: Date-fns (formatting), UUID (generation)

## Quick Start

### Prerequisites

- Node.js 18+ (or Bun for faster installs)
- Cloudflare account (for deployment)

### Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd sitesight
   ```

2. Install dependencies using Bun:
   ```
   bun install
   ```

3. Start the development server:
   ```
   bun dev
   ```

   The app will be available at `http://localhost:3000` (or the port specified in your environment).

## Usage

- **Home Page**: Landing hero with search and navigation to views.
- **Gallery View** (`/gallery`): Grid of company thumbnails with hover effects; click to open details.
- **List View** (`/list`): Vertical cards for scanning descriptions and tags.
- **Table View** (`/table`): Sortable table with pagination; supports bulk selection and mock CSV export.
- **Navigation**: Use the top header to switch views; search and filters update results in real-time.
- **Details**: Click any company to open a sliding Sheet with extended info.

Example API call (from Worker):  
`GET /api/companies?q=tech&page=1&pageSize=20&view=gallery`  
Returns JSON array of companies with mock data.

## Development

- **Type Generation**: Run `bun cf-typegen` to update Cloudflare Worker types.
- **Linting**: `bun lint` (uses ESLint with React hooks and import rules).
- **Building**: `bun build` for production assets.
- **Preview**: `bun preview` to test the built app locally.
- **Adding Routes**: Edit `worker/userRoutes.ts` for new API endpoints (e.g., extend `/api/companies`).
- **Custom Components**: Import shadcn/ui from `@/components/ui/*`; extend Tailwind in `tailwind.config.js`.
- **Theme Toggle**: Built-in light/dark mode via `useTheme` hook.
- **Error Handling**: Global ErrorBoundary and RouteErrorBoundary catch issues; reports to `/api/client-errors`.

For mobile testing, use responsive Tailwind classes (e.g., `md:grid-cols-2`). Avoid modifying forbidden files like `wrangler.jsonc` or `worker/index.ts` to prevent deployment issues.

## Deployment

SiteSight is optimized for Cloudflare Workers. The app serves static assets via Workers Sites and handles API routes at the edge.

1. Ensure Wrangler is installed: `bun add -D wrangler` (if not already).
2. Authenticate: `wrangler login`.
3. Deploy:
   ```
   bun deploy
   ```
   This builds the frontend and deploys the Worker.

4. For production enhancements:
   - Bind KV/Durable Objects in `wrangler.toml` for caching (e.g., OG images).
   - Extend the Worker for real scraping: Fetch `og:image` from company domains and cache with TTL.
   - Use environment variables for secrets (e.g., screenshot service API keys).

After deployment, your app will be live at `<project-name>.workers.dev`. Bind a custom domain via the Cloudflare dashboard.

[![Deploy to Cloudflare Workers]([cloudflarebutton])]([cloudflarebutton])

## Extending the Project

- **Real Data Integration**: Replace mock API in `worker/userRoutes.ts` with fetches to your Rails backend (e.g., via Kamal-deployed server).
- **Screenshot Service**: Integrate a third-party API (e.g., ScreenshotAPI) in the Worker for dynamic homepage captures.
- **Advanced Features**: Add authentication (e.g., Clerk), real-time updates (WebSockets via Durable Objects), or analytics.
- **Thumbnail Upgrades**: Implement edge-side OG extraction with libraries like `cheerio` in the Worker.

Refer to the [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/) for edge computing best practices.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

We welcome contributions that enhance visual polish, performance, or extensibility. Ensure code follows ESLint rules and maintains responsive design.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.