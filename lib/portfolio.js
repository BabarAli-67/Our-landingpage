import { Bot, Workflow, Database, Code2, Smartphone, Boxes } from 'lucide-react';

/**
 * Portfolio data model for the linked horizontal showcase.
 * ------------------------------------------------------------------
 * `categorySlug` intentionally matches the service slugs in lib/content.js
 * so a click on a "What We Do" card resolves to the first project in that
 * category. Projects are ordered grouped-by-category so "first project in a
 * category" is a contiguous index.
 */
export const projects = [
  {
    id: 'orbit-ai',
    categorySlug: 'agentic-ai',
    category: 'Agentic AI',
    icon: Bot,
    title: 'Orbit AI',
    description:
      'A tool-using support agent with RAG over 40k docs and human-in-the-loop escalation — resolving the majority of tickets before they reach a human.',
    metric: '71% auto-resolved',
    tags: ['LangChain', 'Vector DB', 'Next.js'],
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'sentinel',
    categorySlug: 'agentic-ai',
    category: 'Agentic AI',
    icon: Bot,
    title: 'Sentinel Agent',
    description:
      'Multi-agent monitoring that watches infra signals, reasons over anomalies, and files an actioned incident with a proposed fix.',
    metric: '9min → 40s triage',
    tags: ['Multi-agent', 'Python', 'OpenAI'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'atlas-ops',
    categorySlug: 'automation',
    category: 'Enterprise Automation',
    icon: Workflow,
    title: 'Atlas Ops',
    description:
      'End-to-end n8n + Python automation across finance, support and provisioning — removing thousands of hours of manual work every month.',
    metric: '1,200 hrs/mo saved',
    tags: ['n8n', 'Python', 'AWS'],
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'nova-crm',
    categorySlug: 'crm',
    category: 'Custom CRM',
    icon: Database,
    title: 'Nova CRM',
    description:
      'A ground-up revenue CRM replacing three disconnected tools, with agentic lead scoring and reporting baked into the pipeline.',
    metric: '+38% pipeline velocity',
    tags: ['Next.js', 'Django', 'Postgres'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'vertex',
    categorySlug: 'web',
    category: 'Full-Stack Web',
    icon: Code2,
    title: 'Vertex Platform',
    description:
      'A high-traffic SaaS platform on Next.js + edge rendering, with a design system and sub-second global loads.',
    metric: '0.4s median TTFB',
    tags: ['Next.js', 'Edge', 'MERN'],
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'pulse-health',
    categorySlug: 'mobile',
    category: 'Mobile',
    icon: Smartphone,
    title: 'Pulse Health App',
    description:
      'Offline-first React Native app with real-time sync and biometric onboarding — native-grade performance from one codebase.',
    metric: '4.9★ · 120k installs',
    tags: ['React Native', 'Firebase', 'Node'],
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'cadence',
    categorySlug: 'mobile',
    category: 'Mobile',
    icon: Smartphone,
    title: 'Cadence',
    description:
      'A cross-platform scheduling app with a shared, maintainable codebase and delightful, physics-driven motion.',
    metric: '60fps everywhere',
    tags: ['Flutter', 'Expo', 'GraphQL'],
    image:
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 'helix-cloud',
    categorySlug: 'scale',
    category: 'Scalable Solutions',
    icon: Boxes,
    title: 'Helix Cloud',
    description:
      'Cloud architecture, DevOps and observability that scaled a startup from thousands to millions of daily events without a rewrite.',
    metric: '40M+ events/day',
    tags: ['Kubernetes', 'Terraform', 'AWS'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=70',
  },
];

/** First panel index for each category slug — the click-linkage target. */
export const firstIndexByCategory = projects.reduce((acc, p, i) => {
  if (acc[p.categorySlug] === undefined) acc[p.categorySlug] = i;
  return acc;
}, {});

export const projectCount = projects.length;
