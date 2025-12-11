import { Hono } from "hono";
import { Env } from './core-utils';
type Company = {
  id: string;
  name: string;
  domain: string;
  description: string;
  ogImage?: string;
  tags: string[];
  lastUpdated: string;
  techStack?: string[];
};
const mockCompanies: Company[] = [
  { id: '1', name: 'Shopify', domain: 'shopify.com', description: 'The global commerce platform for starting, running, and growing a business.', ogImage: 'https://cdn.shopify.com/static/share-image-common.jpg', tags: ['E-commerce', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-21T10:00:00Z', techStack: ['Ruby', 'React', 'GraphQL'] },
  { id: '2', name: 'GitHub', domain: 'github.com', description: 'The complete developer platform to build, scale, and deliver secure software.', ogImage: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', tags: ['Developer Tools', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-20T11:00:00Z', techStack: ['Ruby', 'Go', 'React'] },
  { id: '3', name: '37signals', domain: '37signals.com', description: 'The calm company. Makers of Basecamp and HEY.', ogImage: 'https://37signals.com/images/37signals.png', tags: ['Productivity', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-19T12:00:00Z', techStack: ['Ruby', 'Hotwire', 'SQLite'] },
  { id: '4', name: 'Stripe', domain: 'stripe.com', description: 'Financial infrastructure for the internet.', ogImage: 'https://images.ctfassets.net/fzn2n1nzq965/3sL9bOaJ9VawE0Y2yU8Ema/164569961b38748d35606f89e095f49a/share-image.jpg', tags: ['Fintech', 'API', 'Payments'], lastUpdated: '2024-07-22T13:00:00Z', techStack: ['Ruby', 'Scala', 'React'] },
  { id: '5', name: 'Vercel', domain: 'vercel.com', description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.', tags: ['PaaS', 'Developer Tools', 'Next.js'], lastUpdated: '2024-07-21T14:00:00Z', techStack: ['Next.js', 'Go', 'Rust'] },
  { id: '6', name: 'Cloudflare', domain: 'cloudflare.com', description: 'The web performance & security company.', ogImage: 'https://www.cloudflare.com/img/cf-logo-social-share.png', tags: ['CDN', 'Security', 'Serverless'], lastUpdated: '2024-07-22T15:00:00Z', techStack: ['Go', 'Rust', 'Lua'] },
  { id: '7', name: 'Figma', domain: 'figma.com', description: 'The collaborative interface design tool.', tags: ['Design', 'SaaS', 'Collaboration'], lastUpdated: '2024-07-18T16:00:00Z', techStack: ['React', 'TypeScript', 'WebAssembly'] },
  { id: '8', name: 'Notion', domain: 'notion.so', description: 'The all-in-one workspace for your notes, tasks, wikis, and databases.', ogImage: 'https://www.notion.so/images/meta/default.png', tags: ['Productivity', 'SaaS', 'Collaboration'], lastUpdated: '2024-07-20T17:00:00Z', techStack: ['React', 'TypeScript', 'PostgreSQL'] },
  { id: '9', name: 'Linear', domain: 'linear.app', description: 'The issue tracking tool you\'ll enjoy using.', tags: ['Project Management', 'SaaS', 'Developer Tools'], lastUpdated: '2024-07-22T18:00:00Z', techStack: ['React', 'TypeScript', 'GraphQL'] },
  { id: '10', name: 'Airtable', domain: 'airtable.com', description: 'Airtable is a low-code platform for building collaborative apps.', ogImage: 'https://static.airtable.com/images/airtable_social_share.png', tags: ['Database', 'SaaS', 'Low-code'], lastUpdated: '2024-07-17T19:00:00Z', techStack: ['React', 'Node.js', 'MySQL'] },
  { id: '11', name: 'Retool', domain: 'retool.com', description: 'The fast way to build internal tools.', tags: ['Internal Tools', 'SaaS', 'Low-code'], lastUpdated: '2024-07-19T20:00:00Z', techStack: ['React', 'Node.js', 'PostgreSQL'] },
  { id: '12', name: 'Supabase', domain: 'supabase.com', description: 'The open source Firebase alternative.', ogImage: 'https://supabase.com/images/og/og-image.png', tags: ['BaaS', 'Open Source', 'PostgreSQL'], lastUpdated: '2024-07-21T21:00:00Z', techStack: ['Elixir', 'Go', 'React'] },
  { id: '13', name: 'PlanetScale', domain: 'planetscale.com', description: 'The database for developers.', tags: ['Database', 'SaaS', 'MySQL'], lastUpdated: '2024-07-20T22:00:00Z', techStack: ['Go', 'Vitess', 'React'] },
  { id: '14', name: 'Render', domain: 'render.com', description: 'The fastest way to host all your apps.', ogImage: 'https://render.com/images/og-image.png', tags: ['PaaS', 'Hosting', 'Cloud'], lastUpdated: '2024-07-18T23:00:00Z', techStack: ['Go', 'Kubernetes', 'React'] },
  { id: '15', name: 'Fly.io', domain: 'fly.io', description: 'Run your full stack apps (and databases!) all over the world.', tags: ['PaaS', 'Hosting', 'Edge'], lastUpdated: '2024-07-22T09:00:00Z', techStack: ['Go', 'Rust', 'Elixir'] },
  { id: '16', name: 'HashiCorp', domain: 'hashicorp.com', description: 'Infrastructure automation for any cloud.', ogImage: 'https://www.hashicorp.com/img/og-image.png', tags: ['DevOps', 'Infrastructure', 'Open Source'], lastUpdated: '2024-07-19T08:00:00Z', techStack: ['Go', 'Ember.js'] },
  { id: '17', name: 'Datadog', domain: 'datadoghq.com', description: 'Monitoring and security platform for cloud applications.', ogImage: 'https://www.datadoghq.com/img/datadog-og-image.png', tags: ['Monitoring', 'SaaS', 'APM'], lastUpdated: '2024-07-21T07:00:00Z', techStack: ['Go', 'Python', 'React'] },
  { id: '18', name: 'Sentry', domain: 'sentry.io', description: 'Application monitoring and error tracking software.', ogImage: 'https://sentry.io/img/og-sentry.png', tags: ['Monitoring', 'SaaS', 'Developer Tools'], lastUpdated: '2024-07-20T06:00:00Z', techStack: ['Python', 'Rust', 'React'] },
  { id: '19', name: 'PostHog', domain: 'posthog.com', description: 'The open source product analytics suite.', tags: ['Analytics', 'Open Source', 'SaaS'], lastUpdated: '2024-07-18T05:00:00Z', techStack: ['Python', 'ClickHouse', 'React'] },
  { id: '20', name: 'GitLab', domain: 'gitlab.com', description: 'The most comprehensive AI-powered DevSecOps platform.', ogImage: 'https://about.gitlab.com/images/press/logo/png/gitlab-logo-500.png', tags: ['DevOps', 'SaaS', 'Ruby on Rails'], lastUpdated: '2024-07-22T04:00:00Z', techStack: ['Ruby', 'Go', 'Vue.js'] },
];
const ogImageCache = new Map<string, { imageUrl: string | null; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour
async function getOgImage(domain: string): Promise<string | null> {
  const cached = ogImageCache.get(domain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.imageUrl;
  }
  try {
    const response = await fetch(`https://${domain}`, {
      signal: AbortSignal.timeout(5000), // 5s timeout
      headers: { 'User-Agent': 'SiteSightBot/1.0 (+https://sitesight.app/bot)' }
    });
    if (!response.ok) return null;
    const html = await response.text();
    const match = html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/);
    const imageUrl = match ? match[1] : null;
    ogImageCache.set(domain, { imageUrl, timestamp: Date.now() });
    return imageUrl;
  } catch (error) {
    console.error(`Failed to fetch OG image for ${domain}:`, error);
    ogImageCache.set(domain, { imageUrl: null, timestamp: Date.now() });
    return null;
  }
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/companies', async (c) => {
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
            const valA = a[sortCol as keyof Company];
            const valB = b[sortCol as keyof Company];
            // Type guard to fix TypeScript errors for possibly undefined values
            if (valA == null || valB == null) {
                console.warn(`Sorting by ${sortCol}: encountered null or undefined values.`);
                return 0;
            }
            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            // Fallback for non-string types (though all sortable fields are strings)
            if (valA < valB) return sortDir === 'asc' ? -1 : 1;
            if (valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        const totalPages = Math.ceil(filteredCompanies.length / pageSizeNum);
        const paginatedCompanies = filteredCompanies.slice((pageNum - 1) * pageSizeNum, pageNum * pageSizeNum);
        const enrichedCompanies = await Promise.all(
            paginatedCompanies.map(async (company) => {
                if (company.ogImage) {
                    return company;
                }
                const ogImage = await getOgImage(company.domain);
                return { ...company, ogImage: ogImage || undefined };
            })
        );
        return c.json({
            success: true,
            data: {
                data: enrichedCompanies,
                totalPages,
                currentPage: pageNum,
            }
        });
    });
}