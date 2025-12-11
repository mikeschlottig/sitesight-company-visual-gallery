import { Hono } from "hono";
import { Env } from './core-utils';
const mockCompanies = [
  { id: '1', name: 'Shopify', domain: 'shopify.com', description: 'The global commerce platform for starting, running, and growing a business.', ogImage: 'https://cdn.shopify.com/static/share-image-common.jpg', tags: ['E-commerce', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-21', techStack: ['Ruby', 'React', 'GraphQL'] },
  { id: '2', name: 'GitHub', domain: 'github.com', description: 'The complete developer platform to build, scale, and deliver secure software.', ogImage: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', tags: ['Developer Tools', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-20', techStack: ['Ruby', 'Go', 'React'] },
  { id: '3', name: '37signals', domain: '37signals.com', description: 'The calm company. Makers of Basecamp and HEY.', ogImage: 'https://37signals.com/images/37signals.png', tags: ['Productivity', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-19', techStack: ['Ruby', 'Hotwire', 'SQLite'] },
  { id: '4', name: 'Stripe', domain: 'stripe.com', description: 'Financial infrastructure for the internet.', ogImage: 'https://images.ctfassets.net/fzn2n1nzq965/3sL9bOaJ9VawE0Y2yU8Ema/164569961b38748d35606f89e095f49a/share-image.jpg', tags: ['Fintech', 'API', 'Payments'], lastUpdated: '2024-07-22', techStack: ['Ruby', 'Scala', 'React'] },
  { id: '5', name: 'Vercel', domain: 'vercel.com', description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.', ogImage: 'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png', tags: ['PaaS', 'Developer Tools', 'Next.js'], lastUpdated: '2024-07-21', techStack: ['Next.js', 'Go', 'Rust'] },
  { id: '6', name: 'Cloudflare', domain: 'cloudflare.com', description: 'The web performance & security company.', ogImage: 'https://www.cloudflare.com/img/cf-logo-social-share.png', tags: ['CDN', 'Security', 'Serverless'], lastUpdated: '2024-07-22', techStack: ['Go', 'Rust', 'Lua'] },
  { id: '7', name: 'Figma', domain: 'figma.com', description: 'The collaborative interface design tool.', ogImage: 'https://s.figma.com/v2/static/og_page_v2.png', tags: ['Design', 'SaaS', 'Collaboration'], lastUpdated: '2024-07-18', techStack: ['React', 'TypeScript', 'WebAssembly'] },
  { id: '8', name: 'Notion', domain: 'notion.so', description: 'The all-in-one workspace for your notes, tasks, wikis, and databases.', ogImage: 'https://www.notion.so/images/meta/default.png', tags: ['Productivity', 'SaaS', 'Collaboration'], lastUpdated: '2024-07-20', techStack: ['React', 'TypeScript', 'PostgreSQL'] },
  { id: '9', name: 'Linear', domain: 'linear.app', description: 'The issue tracking tool you\'ll enjoy using.', ogImage: 'https://linear.app/static/og-image.png', tags: ['Project Management', 'SaaS', 'Developer Tools'], lastUpdated: '2024-07-22', techStack: ['React', 'TypeScript', 'GraphQL'] },
  { id: '10', name: 'Airtable', domain: 'airtable.com', description: 'Airtable is a low-code platform for building collaborative apps.', ogImage: 'https://static.airtable.com/images/airtable_social_share.png', tags: ['Database', 'SaaS', 'Low-code'], lastUpdated: '2024-07-17', techStack: ['React', 'Node.js', 'MySQL'] },
  { id: '11', name: 'Retool', domain: 'retool.com', description: 'The fast way to build internal tools.', ogImage: 'https://retool.com/cdn-cgi/image/width=1200,height=630,fit=cover,quality=85/https/retool.com/og-image.png', tags: ['Internal Tools', 'SaaS', 'Low-code'], lastUpdated: '2024-07-19', techStack: ['React', 'Node.js', 'PostgreSQL'] },
  { id: '12', name: 'Supabase', domain: 'supabase.com', description: 'The open source Firebase alternative.', ogImage: 'https://supabase.com/images/og/og-image.png', tags: ['BaaS', 'Open Source', 'PostgreSQL'], lastUpdated: '2024-07-21', techStack: ['Elixir', 'Go', 'React'] },
  { id: '13', name: 'PlanetScale', domain: 'planetscale.com', description: 'The database for developers.', ogImage: 'https://assets.planetscale.com/og-v2.png', tags: ['Database', 'SaaS', 'MySQL'], lastUpdated: '2024-07-20', techStack: ['Go', 'Vitess', 'React'] },
  { id: '14', name: 'Render', domain: 'render.com', description: 'The fastest way to host all your apps.', ogImage: 'https://render.com/images/og-image.png', tags: ['PaaS', 'Hosting', 'Cloud'], lastUpdated: '2024-07-18', techStack: ['Go', 'Kubernetes', 'React'] },
  { id: '15', name: 'Fly.io', domain: 'fly.io', description: 'Run your full stack apps (and databases!) all over the world.', ogImage: 'https://fly.io/og-images/docs-social.png', tags: ['PaaS', 'Hosting', 'Edge'], lastUpdated: '2024-07-22', techStack: ['Go', 'Rust', 'Elixir'] },
  { id: '16', name: 'HashiCorp', domain: 'hashicorp.com', description: 'Infrastructure automation for any cloud.', ogImage: 'https://www.hashicorp.com/img/og-image.png', tags: ['DevOps', 'Infrastructure', 'Open Source'], lastUpdated: '2024-07-19', techStack: ['Go', 'Ember.js'] },
  { id: '17', name: 'Datadog', domain: 'datadoghq.com', description: 'Monitoring and security platform for cloud applications.', ogImage: 'https://www.datadoghq.com/img/datadog-og-image.png', tags: ['Monitoring', 'SaaS', 'APM'], lastUpdated: '2024-07-21', techStack: ['Go', 'Python', 'React'] },
  { id: '18', name: 'Sentry', domain: 'sentry.io', description: 'Application monitoring and error tracking software.', ogImage: 'https://sentry.io/img/og-sentry.png', tags: ['Monitoring', 'SaaS', 'Developer Tools'], lastUpdated: '2024-07-20', techStack: ['Python', 'Rust', 'React'] },
  { id: '19', name: 'PostHog', domain: 'posthog.com', description: 'The open source product analytics suite.', ogImage: 'https://posthog.com/images/og/posthog.png', tags: ['Analytics', 'Open Source', 'SaaS'], lastUpdated: '2024-07-18', techStack: ['Python', 'ClickHouse', 'React'] },
  { id: '20', name: 'GitLab', domain: 'gitlab.com', description: 'The most comprehensive AI-powered DevSecOps platform.', ogImage: 'https://about.gitlab.com/images/press/logo/png/gitlab-logo-500.png', tags: ['DevOps', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-22', techStack: ['Ruby', 'Go', 'Vue.js'] },
];
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/companies', (c) => {
        const { q, page = '1', pageSize = '10', sort = 'name:asc' } = c.req.query();
        const pageNum = parseInt(page, 10);
        const pageSizeNum = parseInt(pageSize, 10);
        let filteredCompanies = [...mockCompanies];
        if (q) {
            filteredCompanies = filteredCompanies.filter(company =>
                company.name.toLowerCase().includes(q.toLowerCase()) ||
                company.domain.toLowerCase().includes(q.toLowerCase()) ||
                company.description.toLowerCase().includes(q.toLowerCase())
            );
        }
        const [sortCol, sortDir] = sort.split(':');
        filteredCompanies.sort((a, b) => {
            const valA = a[sortCol as keyof typeof a];
            const valB = b[sortCol as keyof typeof b];
            if (valA < valB) return sortDir === 'asc' ? -1 : 1;
            if (valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        const totalPages = Math.ceil(filteredCompanies.length / pageSizeNum);
        const paginatedCompanies = filteredCompanies.slice((pageNum - 1) * pageSizeNum, pageNum * pageSizeNum);
        return c.json({
            success: true,
            data: {
                data: paginatedCompanies,
                totalPages,
                currentPage: pageNum,
            }
        });
    });
}