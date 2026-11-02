import type {
  Benefit,
  CaseStudy,
  ClientReview,
  Differentiator,
  Faq,
  PortfolioFilter,
  PortfolioProject,
  ProcessStep,
  Service,
  Stat,
  TechGroup,
} from '@/types';
import {
  Workflow,
  Code2,
  Smartphone,
  Cpu,
  GitBranch,
  Rocket,
  ShieldCheck,
  BrainCircuit,
  MessagesSquare,
  Globe2,
  Gauge,
  TrendingUp,
  Layers,
  Clock,
  Users,
  Search,
  LayoutTemplate,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */
export const services: readonly Service[] = [
  {
    slug: 'web-app',
    icon: Code2,
    title: 'Web App Development',
    excerpt:
      'Full-stack modern web solutions — Next.js, React, Node.js, FastAPI, and robust architectures built to scale.',
    points: ['Next.js & React', 'Node.js / FastAPI', 'Robust architectures', 'Cloud-ready delivery'],
    accent: 'primary',
  },
  {
    slug: 'mobile-app',
    icon: Smartphone,
    title: 'Mobile App Development',
    excerpt:
      'Cross-platform and native-feel apps with Flutter / React Native — seamless performance and polished UX.',
    points: ['Flutter & RN', 'Native-feel UX', 'Store delivery', 'Realtime backends'],
    accent: 'accent',
  },
  {
    slug: 'ai-integration',
    icon: BrainCircuit,
    title: 'AI & Intelligent Integration',
    excerpt:
      'Integrating LLMs (Gemini, Claude), smart chatbots, OCR, and custom AI-powered workflows into real products.',
    points: ['Gemini & Claude', 'Smart chatbots', 'OCR pipelines', 'Custom AI workflows'],
    accent: 'primary',
  },
  {
    slug: 'automation-crm',
    icon: Workflow,
    title: 'Workflow Automation & CRM',
    excerpt:
      'Streamlining repetitive business processes, API automations, and custom management systems.',
    points: ['Process automation', 'API integrations', 'Custom CRMs', 'Ops dashboards'],
    accent: 'accent',
  },
  {
    slug: 'cms-wordpress',
    icon: LayoutTemplate,
    title: 'CMS & WordPress Solutions',
    excerpt:
      'Tailored WordPress development, custom theme architectures, ACF, and scalable headless setups.',
    points: ['Custom themes', 'ACF architectures', 'Headless CMS', 'Editor-friendly UX'],
    accent: 'primary',
  },
  {
    slug: 'seo-performance',
    icon: Search,
    title: 'SEO & Performance Optimization',
    excerpt:
      'Technical SEO, Core Web Vitals optimization, and high-ranking search visibility engineered into the stack.',
    points: ['Technical SEO', 'Core Web Vitals', 'Search visibility', 'Speed engineering'],
    accent: 'accent',
  },
];

/* ------------------------------------------------------------------ */
/*  SERVICE SUB-PAGES — extended content for /services/[slug]          */
/* ------------------------------------------------------------------ */

export interface ServicePageContent {
  readonly slug: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly keyword: string;
  readonly heroTitle: string;
  readonly heroLead: string;
  readonly sections: readonly ServiceSection[];
  readonly relatedProjectIds: readonly string[];
  readonly techStack: readonly string[];
  readonly deliverables: readonly string[];
}

export interface ServiceSection {
  readonly heading: string;
  readonly body: string;
}

export const servicePages: readonly ServicePageContent[] = [
  {
    slug: 'web-app',
    metaTitle: 'Web App Development Services',
    metaDescription:
      'Custom Next.js, React & Node.js web applications built for scale. From SaaS platforms to enterprise dashboards — production-ready in 6–8 weeks.',
    keyword: 'Next.js web app development',
    heroTitle: 'Web applications that scale with your business',
    heroLead:
      'Full-stack platforms, SaaS products, and enterprise dashboards — architected for performance, built for production, and shipped by senior engineers.',
    sections: [
      {
        heading: 'Modern architecture, production-ready from sprint one',
        body: 'Every web application we build starts with a clean architecture decision. We work primarily with Next.js and React on the front end, backed by Node.js, Express, Django, or FastAPI on the server — chosen to match your data model, scale requirements, and team familiarity. Our projects ship to real environments from the first sprint, with CI/CD pipelines, staging previews, and production monitoring configured from day one. Whether you need server-side rendering for SEO, edge functions for global speed, or a single-page app for a complex dashboard, the architecture is designed before the first component is written.',
      },
      {
        heading: 'Performance as a feature, not an afterthought',
        body: 'Speed is not something we optimise at the end — it is engineered into every layer. We target sub-second Time to First Byte, zero Cumulative Layout Shift, and interactive loads that keep users engaged. Lighthouse scores above 90 are the baseline, not the goal. Image pipelines, code splitting, edge caching, and tree-shaking are standard practice. For data-heavy dashboards, we implement virtualised lists, optimistic UI updates, and WebSocket-driven real-time feeds so the interface stays responsive under load. Our recent projects consistently achieve median TTFB under 0.4 seconds globally.',
      },
      {
        heading: 'Database design and API engineering',
        body: 'A fast front end is meaningless without a solid data layer. We design relational schemas in PostgreSQL for transactional integrity, document stores in MongoDB for flexible content, and hybrid architectures when the domain calls for both. Every API is typed, versioned, and documented — whether REST or GraphQL — with rate limiting, authentication, and input validation built in. For projects that need real-time capabilities, we integrate WebSockets or Server-Sent Events with proper connection management and fallback strategies.',
      },
      {
        heading: 'What you get at the end',
        body: 'A deployed, monitored web application with clean code in your repository, infrastructure in your cloud accounts, and documentation that lets your team or a future developer pick up where we left off. No vendor lock-in, no proprietary frameworks, no mystery code. Typical engagements reach a usable production release in six to eight weeks, with weekly demos throughout.',
      },
    ],
    relatedProjectIds: ['sales-crm', 'streamcraft', 'swiftdrop', 'alhadid'],
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'Django', 'PostgreSQL', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Vercel', 'AWS'],
    deliverables: [
      'Production-deployed web application',
      'CI/CD pipeline and staging environment',
      'API documentation and type definitions',
      'Performance audit report (Lighthouse 90+)',
      'Handover documentation and code walkthrough',
    ],
  },
  {
    slug: 'mobile-app',
    metaTitle: 'Flutter & React Native App Development',
    metaDescription:
      'Cross-platform mobile apps with Flutter & React Native — native-feel performance, store-ready delivery, and realtime backends. 4.9★ average rating.',
    keyword: 'Flutter app development services',
    heroTitle: 'Mobile apps that feel native on every device',
    heroLead:
      'Cross-platform development with Flutter and React Native — one codebase, native performance, and store-ready delivery backed by realtime backends.',
    sections: [
      {
        heading: 'One codebase, native-grade results',
        body: 'We build cross-platform mobile applications using Flutter and React Native — choosing the framework that best fits your product, timeline, and team. Flutter delivers pixel-perfect custom UI with 60fps animations and a single Dart codebase for iOS, Android, and web. React Native is our choice when deep native module integration or an existing JavaScript ecosystem matters. In both cases, the result is an app that feels indistinguishable from a native build — with smooth gestures, platform-appropriate navigation patterns, and responsive layouts that adapt from phone to tablet.',
      },
      {
        heading: 'Offline-first, realtime-ready',
        body: 'Modern mobile apps need to work without a connection and sync seamlessly when one returns. We architect offline-first data layers with local SQLite or Hive storage, conflict resolution strategies, and background sync queues. For apps that need live updates — chat, collaboration, dashboards — we integrate Firebase Realtime Database, Firestore, or custom WebSocket backends with proper reconnection handling and optimistic UI. Push notifications, deep linking, and biometric authentication are configured from the start, not bolted on after launch.',
      },
      {
        heading: 'Store delivery and beyond',
        body: 'Getting an app into the App Store and Google Play is not just a build step — it is a process. We handle app signing, store metadata, screenshot generation, privacy declarations, and the review submission itself. Our apps consistently pass review on the first submission. Post-launch, we set up crash reporting with Crashlytics, analytics pipelines, and OTA update channels so you can ship fixes without waiting for a store review cycle. Our recent Flutter apps maintain a 4.9-star average across 120,000+ combined installs.',
      },
      {
        heading: 'Audio, video, and media-rich experiences',
        body: 'Many of our mobile projects involve rich media — video calls, audio sessions, image processing, or camera integration. We have production experience with Zego Cloud for real-time audio/video, image pickers with crop and compression, barcode and QR scanning, and document capture with on-device OCR. These features are integrated with proper permission handling, graceful degradation on older devices, and battery-conscious background processing.',
      },
    ],
    relatedProjectIds: ['skillora', 'luxemart', 'edustream', 'hawalay'],
    techStack: ['Flutter', 'Dart', 'React Native', 'Firebase', 'Firestore', 'Zego Cloud', 'SQLite', 'REST APIs', 'Push Notifications'],
    deliverables: [
      'iOS and Android builds from a single codebase',
      'App Store and Play Store submission',
      'Crashlytics and analytics integration',
      'Backend API and database (if needed)',
      'Post-launch monitoring and OTA updates',
    ],
  },
  {
    slug: 'ai-integration',
    metaTitle: 'AI & LLM Integration Services',
    metaDescription:
      'Custom LLM integrations, AI chatbots, OCR pipelines, and agentic workflows built into your existing products — 71% ticket auto-resolution achieved.',
    keyword: 'custom LLM integration for business',
    heroTitle: 'AI that works inside your product, not beside it',
    heroLead:
      'Custom LLM integrations, intelligent chatbots, document processing pipelines, and agentic workflows — designed into your product core, not bolted on.',
    sections: [
      {
        heading: 'LLM integration with production guardrails',
        body: 'We integrate large language models — OpenAI, Gemini, Claude, and open-source alternatives — into real products with the engineering discipline they demand. That means structured output parsing, token budget management, retry strategies, cost tracking, and latency monitoring from day one. Our integrations are not wrappers around a chat API — they are purpose-built pipelines with prompt versioning, A/B testing infrastructure, and fallback chains so your product does not break when a provider has an outage. We have shipped LLM features that handle thousands of daily requests with sub-second response times and measurable business impact.',
      },
      {
        heading: 'RAG and knowledge retrieval at scale',
        body: 'Retrieval-Augmented Generation is the pattern that makes LLMs useful with your private data. We build RAG systems with vector databases (Pinecone, Weaviate, pgvector), chunking strategies tuned to your document types, and hybrid search that combines semantic similarity with keyword matching. Our systems handle document ingestion pipelines for PDFs, web pages, support tickets, and internal wikis — with automatic re-indexing, metadata filtering, and citation tracking so users can verify every AI-generated answer. One of our RAG deployments searches over 40,000 documents and resolves 71 percent of support tickets without human intervention.',
      },
      {
        heading: 'Agentic workflows and tool-using AI',
        body: 'Beyond simple question-answering, we build agentic systems that reason, plan, and take action. Using LangChain, LangGraph, and custom orchestration, our agents can query databases, call APIs, generate reports, escalate to humans, and execute multi-step workflows autonomously. Every agent is built with human-in-the-loop checkpoints, audit logging, and configurable autonomy levels — because the value of an AI agent comes from trust, and trust requires transparency. We design the escalation paths, approval gates, and monitoring dashboards that let you deploy AI agents with confidence.',
      },
      {
        heading: 'Computer vision and document intelligence',
        body: 'Not all AI is language. We build OCR pipelines that extract structured data from invoices, receipts, identity documents, and forms — with field-level confidence scores and human review queues for uncertain extractions. Our computer vision work includes object detection, image classification, and visual search systems built on proven architectures. These capabilities are deployed as microservices with REST APIs, batch processing queues, and webhook notifications — ready to plug into your existing systems.',
      },
    ],
    relatedProjectIds: ['hawalay', 'ppsc-prep', 'sales-crm'],
    techStack: ['Python', 'LangChain', 'LangGraph', 'OpenAI', 'Gemini', 'Claude', 'Pinecone', 'pgvector', 'FastAPI', 'OCR', 'Computer Vision'],
    deliverables: [
      'Production AI/LLM integration with monitoring',
      'RAG pipeline with vector search',
      'Agentic workflow with human-in-the-loop',
      'API endpoints and webhook integrations',
      'Cost tracking and performance dashboards',
    ],
  },
  {
    slug: 'automation-crm',
    metaTitle: 'Workflow Automation & Custom CRM Development',
    metaDescription:
      'Custom CRM systems and n8n workflow automation that save 1,200+ hours per month. API integrations, ops dashboards, and process automation for growing teams.',
    keyword: 'custom CRM development',
    heroTitle: 'Automate operations, own your CRM',
    heroLead:
      'Custom-built CRM systems and workflow automation that replace disconnected tools, eliminate manual processes, and give your team a single source of truth.',
    sections: [
      {
        heading: 'CRM built around your sales process',
        body: 'Off-the-shelf CRMs force you into someone else\'s workflow. We build custom CRM systems that mirror exactly how your team sells, manages, and retains clients — with role-based dashboards, pipeline stages that match your reality, and automation rules that enforce your process without slowing it down. Our CRM builds include lead scoring (with optional AI-powered prioritisation), automated escalation chains, callback scheduling with timezone awareness, and reporting that answers the questions your team actually asks. One of our CRM deployments increased pipeline velocity by 38 percent within the first quarter.',
      },
      {
        heading: 'n8n and API automation at enterprise scale',
        body: 'We use n8n as the backbone for complex workflow automation — connecting your CRM, accounting, support, and provisioning systems into a single automated pipeline. Unlike Zapier or Make, n8n can be self-hosted (your data stays in your infrastructure), handles complex branching logic, and scales to hundreds of thousands of executions per month without per-task pricing. We build n8n workflows that handle invoice generation, support ticket routing, onboarding sequences, data synchronisation between platforms, and alert pipelines — saving our clients an average of 1,200 hours of manual work per month.',
      },
      {
        heading: 'Dashboards that drive decisions',
        body: 'Every automation system needs visibility. We build operational dashboards that show real-time pipeline health, team performance, automation execution logs, and business KPIs in a single view. These are not generic analytics — they are custom-built interfaces with drill-down capability, date-range comparisons, and exportable reports. For teams that need mobile access, we build responsive dashboard views that work on any device. The dashboards connect directly to your data sources with live updates, so the numbers are always current.',
      },
      {
        heading: 'Integration architecture',
        body: 'Most businesses run on five to fifteen SaaS tools that do not talk to each other. We design integration architectures that connect your payment processor, email platform, project management tool, accounting software, and communication channels into a unified data flow. Every integration is built with error handling, retry logic, and dead-letter queues so nothing is silently lost. We document every connection, provide monitoring alerts for failures, and hand over the system so your team can manage it independently.',
      },
    ],
    relatedProjectIds: ['sales-crm', 'swiftdrop'],
    techStack: ['n8n', 'Python', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Webhooks', 'Express', 'React'],
    deliverables: [
      'Custom CRM with role-based access',
      'Automated workflow pipelines (n8n)',
      'Operational dashboards and reporting',
      'API integrations with existing tools',
      'Runbook and handover documentation',
    ],
  },
  {
    slug: 'cms-wordpress',
    metaTitle: 'WordPress Development & Headless CMS',
    metaDescription:
      'Custom WordPress themes, ACF architectures, and headless CMS setups — fast, editor-friendly, and built for performance. WordPress developers for hire.',
    keyword: 'WordPress developers for hire',
    heroTitle: 'WordPress that performs like a custom build',
    heroLead:
      'Custom themes, Advanced Custom Fields architectures, and headless CMS setups that give editors a beautiful experience and visitors a fast one.',
    sections: [
      {
        heading: 'Custom themes, not modified templates',
        body: 'We do not install a theme from ThemeForest and customise the colours. Every WordPress project we take on gets a purpose-built theme designed to match your brand, built to perform, and structured so your content team can manage it without calling a developer. Our themes use clean, semantic markup, responsive layouts tested across devices, and carefully scoped CSS that will not break when WordPress updates. We build the editor experience with the same care as the front end — using Gutenberg blocks, ACF Flexible Content layouts, or a combination of both, depending on what gives your editors the most productive workflow.',
      },
      {
        heading: 'Advanced Custom Fields at enterprise level',
        body: 'ACF is the backbone of most serious WordPress projects, and we push it further than most agencies. We build modular page-builder systems with ACF Flexible Content and repeater fields, custom post types with relationship fields and taxonomy filters, options pages for global settings, and JSON-synced field groups for version-controlled deployments. Our ACF architectures are designed so that adding a new page section means adding content in the admin — not writing code. The field groups are documented, the choices are labelled clearly, and the preview renders match the live output exactly.',
      },
      {
        heading: 'Headless WordPress with modern front ends',
        body: 'For projects that need the editorial power of WordPress with the performance and flexibility of a modern JavaScript front end, we build headless setups. WordPress serves as the content API (via WPGraphQL or the REST API), and the front end is built in Next.js or Nuxt — giving you static generation, incremental regeneration, edge caching, and all the performance benefits of a JAMstack architecture. The editorial workflow stays familiar: editors log into wp-admin, create and preview content, and publish — the front end rebuilds automatically. This architecture consistently delivers Lighthouse scores above 95 and sub-second page loads.',
      },
      {
        heading: 'Security, hosting, and maintenance',
        body: 'WordPress powers 40 percent of the web, which makes it a target. We harden every installation with security headers, limited login attempts, two-factor authentication, file permission lockdowns, and automatic update policies. For hosting, we recommend and configure managed WordPress platforms (Cloudways, Kinsta, or WP Engine) with staging environments, automated backups, and CDN integration. Every project includes a maintenance handover with documented update procedures and a recommended cadence for plugin and core updates.',
      },
    ],
    relatedProjectIds: ['alhadid'],
    techStack: ['WordPress', 'PHP', 'ACF Pro', 'Gutenberg', 'WPGraphQL', 'Next.js', 'MySQL', 'Cloudways', 'Tailwind CSS'],
    deliverables: [
      'Custom WordPress theme (or headless front end)',
      'ACF field architecture and documentation',
      'Editor training and content workflow guide',
      'Security hardening and hosting setup',
      'Performance audit (Lighthouse 90+)',
    ],
  },
  {
    slug: 'seo-performance',
    metaTitle: 'SEO & Web Performance Optimization',
    metaDescription:
      'Technical SEO, Core Web Vitals optimization, and search visibility engineered into your stack. Lighthouse 90+ scores and measurable ranking improvements.',
    keyword: 'technical SEO and web performance',
    heroTitle: 'Search visibility engineered into the stack',
    heroLead:
      'Technical SEO, Core Web Vitals optimization, and performance engineering that turns your website into a search asset — not just a digital brochure.',
    sections: [
      {
        heading: 'Technical SEO that search engines understand',
        body: 'Good content means nothing if search engines cannot crawl, index, and understand your site. We audit and fix the technical foundations: crawlability (robots.txt, XML sitemaps, internal linking), indexability (canonical URLs, meta robots, pagination), and structured data (JSON-LD for Organisation, Service, FAQ, BreadcrumbList, and Product schemas). Every page gets a unique, keyword-targeted title tag under 60 characters, a meta description under 155 characters written to drive clicks, and a clean heading hierarchy with a single H1. We set up Google Search Console, submit sitemaps, and monitor indexing status so you know exactly how Google sees your site.',
      },
      {
        heading: 'Core Web Vitals and performance engineering',
        body: 'Google uses Core Web Vitals — Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint — as ranking signals. We engineer all three. LCP is optimised through image format selection (WebP, responsive srcset, lazy loading below the fold, preloading the hero), font loading strategies (swap, preconnect, self-hosting), and server response time (edge caching, streaming SSR). CLS is eliminated by reserving space for images, ads, and dynamic content before they load. INP is reduced by minimising main-thread JavaScript, deferring non-critical scripts, and using CSS transitions instead of JavaScript animation. Our projects consistently score above 90 on Lighthouse across all categories.',
      },
      {
        heading: 'Content structure and keyword strategy',
        body: 'We help you move from a single-page site to a multi-page architecture where each page targets a specific keyword cluster. Service pages target commercial intent ("Flutter app development services"), case studies target proof-based queries ("AI chatbot case study"), and FAQ pages capture informational searches. We research keywords using search volume, competition, and intent data — prioritising long-tail phrases where you can realistically rank within three to six months. Every page gets internal links, breadcrumbs, and a content structure that signals topical authority to search engines.',
      },
      {
        heading: 'Monitoring, reporting, and continuous improvement',
        body: 'SEO is not a one-time project — it is an ongoing discipline. We set up Search Console monitoring, rank tracking for your target keywords, and automated Lighthouse CI checks that flag performance regressions before they reach production. Monthly reports show ranking changes, organic traffic trends, and Core Web Vitals field data. We identify new keyword opportunities, update existing content, and adapt the strategy as your business and the search landscape evolve. Trust signals — Clutch and GoodFirms listings, LinkedIn presence, portfolio backlinks — are part of the ongoing plan.',
      },
    ],
    relatedProjectIds: ['alhadid', 'sales-crm'],
    techStack: ['Google Search Console', 'Lighthouse CI', 'JSON-LD', 'Next.js', 'Vercel Edge', 'WebP/AVIF', 'Schema.org'],
    deliverables: [
      'Technical SEO audit and fix implementation',
      'Core Web Vitals optimization',
      'Structured data (JSON-LD) implementation',
      'Keyword strategy and content plan',
      'Ongoing monitoring and monthly reports',
    ],
  },
  {
    slug: 'ai-chatbot-development',
    metaTitle: 'AI Chatbot Development Services | Custom LLM Chatbots',
    metaDescription:
      'Custom AI chatbot development with GPT-4, Claude, and Gemini. Smart chatbots that integrate with your data, tools, and workflows. 71% ticket auto-resolution.',
    keyword: 'AI chatbot development',
    heroTitle: 'AI chatbots that understand your business',
    heroLead:
      'Custom AI chatbot development with LLM integration, RAG over your knowledge base, and tool-using capabilities that handle real customer queries — not just FAQs.',
    sections: [
      {
        heading: 'Custom LLM chatbot development for real business problems',
        body: 'AI chatbots can do far more than answer frequently asked questions. We build intelligent chatbots powered by GPT-4, Claude, and Gemini that integrate with your knowledge base, CRM, support tickets, and internal tools. These chatbots understand context, retrieve information from your private data using RAG (Retrieval-Augmented Generation), and take actions like creating tickets, updating records, or escalating to human agents when needed. Our chatbot deployments consistently resolve 60-75% of incoming queries without human intervention, while maintaining conversation quality that users trust.',
      },
      {
        heading: 'RAG integration with your knowledge base',
        body: 'Generic chatbots trained on public data cannot answer questions about your product, policies, or processes. We build RAG pipelines that index your documentation, support history, help articles, and internal wikis into vector databases (Pinecone, Weaviate, pgvector). When a user asks a question, the chatbot retrieves the most relevant context from your knowledge base and generates an answer grounded in your actual documentation — with citations so users can verify the source. The system handles document updates automatically, re-indexing changed content so the chatbot always has current information.',
      },
      {
        heading: 'Multi-channel deployment and handoff to human agents',
        body: 'AI chatbots are most effective when they meet users where they are. We deploy chatbots across web widgets, WhatsApp Business API, Slack, Microsoft Teams, and custom mobile apps — with a unified backend so conversation history follows the user across channels. Every chatbot includes intelligent escalation: when confidence is low, the query is complex, or the user explicitly requests human help, the conversation is handed off to your support team with full context. We integrate with Zendesk, Intercom, Freshdesk, and custom ticketing systems so the handoff is seamless.',
      },
      {
        heading: 'Cost tracking, performance monitoring, and continuous improvement',
        body: 'LLM API calls have real costs. We build cost-tracking dashboards that show per-conversation expenses, token usage trends, and ROI metrics (support hours saved vs. API spend). Performance monitoring tracks resolution rates, escalation reasons, average response times, and user satisfaction scores. Every conversation is logged with metadata for compliance and quality review. We use this data to tune prompts, improve retrieval accuracy, and expand the knowledge base — so chatbot performance improves over time instead of staying static.',
      },
    ],
    relatedProjectIds: ['hawalay', 'ppsc-prep', 'sales-crm'],
    techStack: ['OpenAI GPT-4', 'Claude', 'Gemini', 'LangChain', 'Pinecone', 'pgvector', 'FastAPI', 'Python', 'WebSockets', 'Slack API', 'WhatsApp Business API'],
    deliverables: [
      'Custom AI chatbot with LLM integration',
      'RAG pipeline with vector search over your data',
      'Multi-channel deployment (web, WhatsApp, Slack)',
      'Human escalation and CRM integration',
      'Cost tracking and performance dashboard',
    ],
  },
  {
    slug: 'nextjs-development',
    metaTitle: 'Next.js Development Services | React Web App Development',
    metaDescription:
      'Expert Next.js development for SaaS platforms, dashboards, and high-performance web apps. Server-side rendering, edge functions, and API routes. Lighthouse 90+ scores.',
    keyword: 'Next.js development agency',
    heroTitle: 'Next.js development for production-grade web apps',
    heroLead:
      'Full-stack Next.js development with server-side rendering, API routes, database integration, and edge deployment — built for performance, scalability, and SEO.',
    sections: [
      {
        heading: 'Why Next.js for modern web applications',
        body: 'Next.js is the leading React framework for building production-grade web applications. It combines the developer experience of React with server-side rendering for SEO, static site generation for speed, API routes for backend logic, and edge functions for global performance. We use Next.js 14 with the App Router, React Server Components, and streaming SSR to build web applications that load instantly, rank well in search engines, and scale to millions of users. Whether you need a SaaS dashboard, a content-heavy marketing site, or an e-commerce platform, Next.js delivers the performance and flexibility required for modern web products.',
      },
      {
        heading: 'Server-side rendering and static generation for SEO',
        body: 'Search engines need HTML to index your content. Single-page apps that render everything on the client are invisible to Google. Next.js solves this with server-side rendering (SSR) and static site generation (SSG). SSR generates HTML on every request, perfect for personalized dashboards and dynamic content. SSG pre-renders pages at build time for maximum speed, ideal for marketing pages and blogs. Incremental Static Regeneration (ISR) gives you the best of both: static speed with automatic background updates. We architect the rendering strategy page-by-page to optimize for both speed and SEO, consistently achieving Lighthouse scores above 90 and first-contentful paint under 1 second.',
      },
      {
        heading: 'API routes, database integration, and authentication',
        body: 'Next.js is a full-stack framework. API routes let you build backend endpoints alongside your front-end code — no separate server needed. We use API routes for authentication, database queries, third-party integrations, and webhook handlers. Our Next.js applications connect to PostgreSQL, MongoDB, or Supabase for data persistence, with Prisma or Drizzle ORM for type-safe database access. Authentication is handled with NextAuth.js (supporting OAuth, email/password, and magic links) or Clerk for a managed solution. Every API route includes input validation, error handling, rate limiting, and proper HTTP status codes.',
      },
      {
        heading: 'Edge deployment and global performance',
        body: 'Next.js applications deploy to Vercel Edge Network with automatic CDN distribution, giving your users sub-second load times regardless of location. Edge Middleware runs authentication, redirects, and A/B tests at the network edge before the request reaches your server. We configure edge caching, image optimization (WebP/AVIF with responsive srcsets), and font subsetting to minimize bundle size. For applications with high traffic, we implement Redis caching layers and database read replicas. The result is a web application that feels instant everywhere and scales effortlessly as your user base grows.',
      },
    ],
    relatedProjectIds: ['sales-crm', 'streamcraft', 'alhadid'],
    techStack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'NextAuth.js', 'Vercel', 'Redis', 'Zod'],
    deliverables: [
      'Production-deployed Next.js application',
      'Server-side rendering and SEO optimization',
      'API routes with authentication and database',
      'Edge deployment with global CDN',
      'Lighthouse 90+ performance score',
    ],
  },
  {
    slug: 'flutter-app-development',
    metaTitle: 'Flutter App Development Services | Cross-Platform Mobile Apps',
    metaDescription:
      'Professional Flutter app development for iOS and Android. One codebase, native performance, beautiful UI. 4.9★ average rating across 120k+ installs.',
    keyword: 'Flutter app development',
    heroTitle: 'Flutter app development with native performance',
    heroLead:
      'Cross-platform Flutter app development for iOS and Android — one Dart codebase, 60fps animations, pixel-perfect UI, and store-ready delivery backed by real-time backends.',
    sections: [
      {
        heading: 'Why Flutter for mobile app development',
        body: 'Flutter is Google\'s UI framework for building natively compiled applications for mobile, web, and desktop from a single codebase. We choose Flutter when you need beautiful, custom UI with smooth animations, fast development cycles, and native performance on both iOS and Android without maintaining two separate codebases. Flutter apps compile to native ARM code, giving you 60fps animations, instant startup times, and battery-efficient execution. The widget-based architecture makes it easy to build complex, responsive layouts that adapt from phone to tablet. Our Flutter apps consistently achieve 4.9-star average ratings and pass App Store review on first submission.',
      },
      {
        heading: 'Custom UI with Material Design and Cupertino widgets',
        body: 'Flutter gives you complete control over every pixel. We build custom UI designs that match your brand identity while following platform conventions — Material Design for Android, Cupertino (iOS-style) widgets for iPhone, or a completely custom design system. Animations are built with Flutter\'s powerful animation APIs: implicit animations for simple transitions, explicit animations for complex choreography, and Hero animations for seamless navigation. Every interaction feels responsive because Flutter renders at 60fps (120fps on ProMotion displays) without dropping frames. The result is an app that feels premium and polished, not like a web wrapper.',
      },
      {
        heading: 'Offline-first architecture with real-time sync',
        body: 'Mobile apps must work without internet. We build offline-first architectures using local databases (Hive, SQLite, Isar) that store user data on-device and sync with the backend when connectivity returns. For apps that need real-time updates — chat, collaboration, live dashboards — we integrate Firebase Firestore (for managed sync) or custom WebSocket backends (for full control). Conflict resolution strategies handle simultaneous edits from multiple devices. Push notifications, deep linking, and background tasks are configured from the start so your app stays connected to users even when closed.',
      },
      {
        heading: 'App Store and Google Play deployment',
        body: 'Launching an app is more than building and uploading. We handle code signing, provisioning profiles, app icons in every required size, App Store screenshots, privacy policy declarations, and store metadata optimization. We submit to both App Store Connect and Google Play Console, responding to reviewer feedback when needed (though our apps usually pass on first try). Post-launch, we configure Firebase Crashlytics for crash reporting, Google Analytics or Mixpanel for user behavior tracking, and Firebase App Distribution or CodePush for over-the-air updates. You ship features without waiting for store review.',
      },
    ],
    relatedProjectIds: ['skillora', 'luxemart', 'edustream', 'hawalay'],
    techStack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Hive', 'SQLite', 'Provider/Riverpod', 'REST APIs', 'Push Notifications', 'Crashlytics'],
    deliverables: [
      'iOS and Android apps from single codebase',
      'App Store and Google Play submission',
      'Offline-first data architecture',
      'Real-time sync and push notifications',
      'Crashlytics and analytics integration',
    ],
  },
  {
    slug: 'react-native-development',
    metaTitle: 'React Native Development Services | Cross-Platform Mobile Apps',
    metaDescription:
      'Expert React Native development for iOS and Android. JavaScript-based cross-platform apps with native modules, Expo, and store deployment.',
    keyword: 'React Native development',
    heroTitle: 'React Native development for JavaScript teams',
    heroLead:
      'Cross-platform React Native development for teams with JavaScript expertise — one codebase for iOS and Android, deep native module integration, and fast iteration with Expo.',
    sections: [
      {
        heading: 'Why React Native for cross-platform mobile development',
        body: 'React Native is Facebook\'s framework for building mobile apps using JavaScript and React. We recommend React Native when your team already has React or JavaScript expertise, when you need deep integration with native modules (Bluetooth, NFC, AR), or when you want to share code between web and mobile. React Native apps use real native UI components (not WebViews), giving you native look-and-feel with the development speed of JavaScript. The large ecosystem (npm packages, Expo SDK) means most features have ready-made solutions. Over-the-air updates with CodePush or Expo Updates let you ship bug fixes instantly without waiting for App Store approval.',
      },
      {
        heading: 'Expo for rapid development and managed workflow',
        body: 'Expo is a toolkit built on top of React Native that handles the complex parts of mobile development — app signing, push notifications, camera access, sensors, and more — through a unified API. We use Expo Managed Workflow for projects that want fast iteration and minimal native configuration. For projects that need custom native modules or specific SDK versions, we use Expo Bare Workflow or pure React Native CLI. Expo Application Services (EAS) handles cloud builds for iOS and Android, so you don\'t need a Mac to build iOS apps. EAS Update delivers over-the-air JavaScript updates to fix bugs and ship features between store releases.',
      },
      {
        heading: 'Native modules and platform-specific code',
        body: 'Some features require native code: Bluetooth LE, contactless payments, AR/VR, background location tracking, or deeply integrated platform APIs. React Native makes it straightforward to write native modules in Swift/Kotlin and call them from JavaScript. We build custom native modules when necessary and use proven community libraries when they exist (react-native-camera, react-native-maps, react-native-ble-plx). Platform-specific code is isolated with Platform.select() or separate .ios.js and .android.js files, so shared business logic stays clean while UI follows platform conventions.',
      },
      {
        heading: 'State management, navigation, and performance',
        body: 'React Native apps use the same state management patterns as web React: Redux, Zustand, or React Context depending on complexity. Navigation uses React Navigation (the standard library), with native stack navigators for iOS-style push transitions and tab navigators for bottom tabs. Performance optimization includes lazy loading screens, FlatList for long lists (with windowing), image caching, and moving heavy computation off the main thread with react-native-reanimated. We profile with Flipper, monitor with Sentry or Bugsnag, and test on real devices before submission.',
      },
    ],
    relatedProjectIds: ['skillora', 'edustream', 'hawalay'],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Redux/Zustand', 'React Navigation', 'Firebase', 'CodePush', 'Sentry', 'Native Modules'],
    deliverables: [
      'iOS and Android apps from shared codebase',
      'Expo or React Native CLI setup',
      'Native module integration (if needed)',
      'App Store and Play Store submission',
      'OTA updates with CodePush or EAS Update',
    ],
  },
  {
    slug: 'custom-software-development',
    metaTitle: 'Custom Software Development Services | Bespoke Solutions',
    metaDescription:
      'Custom software development for unique business requirements. Enterprise systems, internal tools, and specialized platforms built by senior engineers.',
    keyword: 'custom software development',
    heroTitle: 'Custom software development for complex business needs',
    heroLead:
      'Bespoke software development for businesses with unique requirements — enterprise systems, internal tools, workflow platforms, and specialized solutions that off-the-shelf software cannot solve.',
    sections: [
      {
        heading: 'When custom software is the right choice',
        body: 'Off-the-shelf software works for common problems. When your business has unique workflows, compliance requirements, or integration needs that SaaS products cannot meet, custom software is the answer. We build custom solutions for companies that have outgrown their tools, need to connect disparate systems, operate in regulated industries with specific data handling requirements, or have a competitive advantage tied to proprietary processes. Custom software means you own the code, control the roadmap, and pay for features you need — not a subscription for features you ignore. Typical use cases include multi-tenant B2B platforms, field service management systems, manufacturing execution software, healthcare portals, and government compliance tools.',
      },
      {
        heading: 'Discovery, architecture, and technology selection',
        body: 'Every custom software project starts with discovery. We interview stakeholders, observe workflows, audit existing systems, and document requirements with user stories, data models, and integration maps. Architecture decisions are made collaboratively: monolith vs. microservices, SQL vs. NoSQL, REST vs. GraphQL, cloud vs. on-premise. Technology choices are driven by your requirements, team skills, and long-term maintainability — not hype. We prototype risky assumptions early (performance, third-party API behavior, algorithm viability) so technical blockers surface before they delay the project. The output is a technical specification, wireframes, and a phased delivery plan with milestones you can track.',
      },
      {
        heading: 'Iterative development with weekly demos',
        body: 'Custom software projects are too complex to specify perfectly upfront. We work in two-week sprints with weekly demos of working software. You see progress continuously and give feedback before too much is built on wrong assumptions. Each sprint delivers a vertical slice — a complete feature you can test end-to-end. High-risk pieces (complex algorithms, critical integrations, new technology) are built first so unknowns become knowns early. CI/CD pipelines, automated testing, and staging environments are configured from sprint one. You do not wait until the end to see if it works — you are using it (in staging) within the first month.',
      },
      {
        heading: 'Security, compliance, and long-term support',
        body: 'Custom software often handles sensitive data or operates in regulated environments. We build with security from the start: encrypted data at rest and in transit, role-based access control, audit logging, input validation, and secure authentication (OAuth 2.0, SAML, MFA). For healthcare projects, we follow HIPAA guidelines. For financial systems, we implement PCI-DSS controls. For government contracts, we meet NIST and FedRAMP requirements. Post-launch, we provide support, monitoring, infrastructure management, and feature development. You get a runbook, architectural documentation, and training so your internal team can take over when ready — or we stay on as your technical partner indefinitely.',
      },
    ],
    relatedProjectIds: ['sales-crm', 'swiftdrop', 'streamcraft'],
    techStack: ['Next.js', 'React', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'FastAPI'],
    deliverables: [
      'Custom software built to your requirements',
      'Technical architecture and documentation',
      'Weekly demos and iterative delivery',
      'Security audit and compliance implementation',
      'Support, monitoring, and maintenance plan',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  TECH STACK & CAPABILITIES                                          */
/* ------------------------------------------------------------------ */
export const techStack: readonly TechGroup[] = [
  {
    group: 'Web & Full-Stack',
    icon: Code2,
    items: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Django', 'PostgreSQL', 'TypeScript'],
  },
  {
    group: 'Automation & AI',
    icon: Cpu,
    items: ['n8n', 'Agentic AI', 'LangChain', 'Python', 'OpenAI', 'Vector DBs', 'RAG', 'Webhooks'],
  },
  {
    group: 'Mobile & Cross-Platform',
    icon: Smartphone,
    items: ['React Native', 'Flutter', 'Firebase'],
  },
  {
    group: 'Cloud & DevOps',
    icon: GitBranch,
    items: ['AWS', 'Vercel', 'Docker', 'GitHub Actions'],
  },
];

/* ------------------------------------------------------------------ */
/*  CASE STUDIES / WORK                                                */
/* ------------------------------------------------------------------ */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'nova-crm',
    title: 'Nova — Revenue CRM',
    category: 'Custom CRM',
    result: '+38% pipeline velocity',
    summary:
      'A ground-up CRM replacing three disconnected tools, with agentic lead scoring baked in.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
    tags: ['Next.js', 'Django', 'Agentic AI'],
  },
  {
    slug: 'atlas-automation',
    title: 'Atlas — Ops Automation',
    category: 'Enterprise Automation',
    result: '1,200 hrs/mo saved',
    summary:
      'End-to-end n8n + Python automation across finance, support, and provisioning.',
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=70',
    tags: ['n8n', 'Python', 'AWS'],
  },
  {
    slug: 'orbit-agent',
    title: 'Orbit — Support Agent',
    category: 'Agentic AI',
    result: '71% tickets auto-resolved',
    summary:
      'A tool-using support agent with RAG over 40k docs and human-in-the-loop escalation.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=70',
    tags: ['LangChain', 'Vector DB', 'Next.js'],
  },
  {
    slug: 'pulse-mobile',
    title: 'Pulse — Health App',
    category: 'Mobile',
    result: '4.9★ / 120k installs',
    summary:
      'Offline-first React Native app with real-time sync and biometric onboarding.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=70',
    tags: ['React Native', 'Firebase', 'Node.js'],
  },
];

/* ------------------------------------------------------------------ */
/*  CLIENT REVIEWS — Fiverr + direct                                  */
/* ------------------------------------------------------------------ */
export const clientReviews: readonly ClientReview[] = [
  {
    id: 'r1',
    name: 'alambodlah',
    company: 'Fiverr Client',
    country: 'United Kingdom',
    source: 'fiverr',
    rating: 5,
    quote:
      'Great experience working with Hanzla, Flutter developer at Nexus Dev Studio! Fixed all Flutter bugs quickly and efficiently. Clean code, great communication, and fast delivery. Highly recommended!',
  },
  {
    id: 'r2',
    name: 'aboodvirk',
    company: 'Fiverr Client',
    country: 'Georgia',
    source: 'fiverr',
    rating: 5,
    quote:
      'Great experience working with Hanzla, Flutter developer at Nexus Dev Studio from start to finish. I only had a rough idea for my app, but he took the time to understand my requirements and turned it into a clean, professional design concept. The whole process was smooth — quick responses, regular updates on progress, and the final delivery matched exactly what I had in mind. The attention to detail in the UI was impressive for the price point too. Will definitely be working with him again on future projects!',
  },
  {
    id: 'r3',
    name: 'usamaahmed2022',
    company: 'Fiverr Client',
    country: 'Germany',
    source: 'fiverr',
    rating: 5,
    quote:
      'Great experience working with Hanzla, Flutter developer at Nexus Dev Studio from start to finish. I had a design ready for my app but needed someone to bring it to life, and he did exactly that. He understood my visuals quickly and converted them into a fully functional Flutter app with smooth navigation and proper working logic behind every screen — not just a UI copy, but the real thing. The whole process was smooth, with quick responses and regular updates on progress. He was also fair and open when discussing the scope and pricing. Really impressed with the quality for the price point, and I’ll definitely be coming back for future projects!',
  },
  {
    id: 'r4',
    name: 'Muhammad Shahbaz',
    company: 'AL HADID International',
    country: 'Malaysia',
    source: 'direct',
    rating: 5,
    website: 'https://alhadidtec.com',
    websiteLabel: 'alhadidtec.com',
    quote:
      'Working with Babar, web developer at Nexus Dev Studio has been an excellent experience. He is highly professional, knowledgeable, and committed to delivering high-quality work. He understands requirements well, communicates effectively, and always goes the extra mile to ensure the project is completed successfully. I highly recommend him for any software development project.',
  },
];

/* ------------------------------------------------------------------ */
/*  PROCESS                                                            */
/* ------------------------------------------------------------------ */
export const processSteps: readonly ProcessStep[] = [
  {
    icon: MessagesSquare,
    title: 'Discovery & Architecture',
    body: 'We map goals, data, and constraints — then design the AI surface, stack, and system boundaries before a line ships.',
  },
  {
    icon: Rocket,
    title: 'AI & Stack Implementation',
    body: 'Custom LLM / agentic workflows, APIs, and full-stack product surfaces — built in weekly demos you can actually use.',
  },
  {
    icon: Code2,
    title: 'Integration & Hardening',
    body: 'Auth, data pipelines, cloud infra, and observability wired in — so intelligence survives contact with production.',
  },
  {
    icon: ShieldCheck,
    title: 'Deploy & Optimize',
    body: 'Ship to production, measure outcomes, and iterate — with a team that stays after launch.',
  },
];

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */
export const stats: readonly Stat[] = [
  { value: '120+', label: 'Products shipped' },
  { value: '98%', label: 'Client retention' },
  { value: '40M+', label: 'Automated actions / mo' },
  { value: '6', label: 'Countries served' },
];

/* ------------------------------------------------------------------ */
/*  HOMEPAGE SERVICES — mirrors primary services catalogue            */
/* ------------------------------------------------------------------ */
export const homeServices: readonly Service[] = services;

/* ------------------------------------------------------------------ */
/*  RESULTS / BENEFITS — outcome-focused value props                  */
/* ------------------------------------------------------------------ */
export const benefits: readonly Benefit[] = [
  {
    icon: Rocket,
    title: 'Ship intelligent systems fast',
    body: 'Production from the first sprint. You see working AI surfaces and product flows early — and steer with real feedback.',
    metric: '6–8 wk',
    metricLabel: 'to first release',
  },
  {
    icon: TrendingUp,
    title: 'Built to move a metric',
    body: 'Every engagement targets a business outcome — conversion, resolution rate, hours automated. We instrument it and prove the lift.',
    metric: '+38%',
    metricLabel: 'avg. pipeline lift',
  },
  {
    icon: Layers,
    title: 'Architected to scale',
    body: 'Clean full-stack architecture, data pipelines, and cloud foundations from day one — so the system you launch is the system you grow.',
    metric: '40M+',
    metricLabel: 'events / day handled',
  },
  {
    icon: Gauge,
    title: 'Performance as a feature',
    body: 'Sub-second loads, tight interactions, and production hardening. Speed and reliability are engineered in, not bolted on.',
    metric: '0.4s',
    metricLabel: 'median TTFB',
  },
  {
    icon: ShieldCheck,
    title: 'Senior engineers, end to end',
    body: 'No junior hand-offs. The people who design your AI and architecture are the people who build and ship it.',
    metric: '98%',
    metricLabel: 'client retention',
  },
  {
    icon: Clock,
    title: 'Support that compounds',
    body: 'Monitoring, model/workflow iteration, and platform optimization after launch. We don’t disappear when you go live.',
    metric: '24/7',
    metricLabel: 'monitored uptime',
  },
];

/* ------------------------------------------------------------------ */
/*  WHY US — differentiators                                          */
/* ------------------------------------------------------------------ */
export const whyUs: readonly Differentiator[] = [
  {
    icon: BrainCircuit,
    title: 'AI engineering, not bolt-ons',
    body: 'Custom LLM & agentic integrations designed into the product core — workflow automation that compounds, not a chatbot slapped on after launch.',
  },
  {
    icon: Globe2,
    title: 'Full-stack, end to end',
    body: 'High-performance web platforms, mobile apps, APIs, and cloud infrastructure — one studio owning the architecture through production.',
  },
  {
    icon: GitBranch,
    title: 'Weekly, demoable progress',
    body: 'Every week ends with working software you can click — tight loops, senior builders, no status-update theatre.',
  },
  {
    icon: ShieldCheck,
    title: 'You own the system',
    body: 'Clean code, documented infra, and IP in your accounts. No lock-in, no black boxes, no mystery vendors.',
  },
];

/* ------------------------------------------------------------------ */
/*  LANDING — Unified portfolio (filterable)                          */
/*  Categories: web | mobile | ai                                     */
/*  Images: /public/assets/projects/                                  */
/* ------------------------------------------------------------------ */
export const portfolioFilters: readonly PortfolioFilter[] = [
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'ai', label: 'AI & Integrations' },
];

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    id: 'sales-crm',
    title: 'Bespoke Sales Operations & Automation CRM',
    featured: true,
    categoryLabel: 'Web App',
    categories: ['web'],
    badges: ['Full-Stack', 'Automation', 'CRM'],
    result: 'Role-governed sales execution',
    tagline:
      'High-performance, role-governed sales execution engine with automated 24h escalation, callback alerts, and strict CST handovers.',
    summary:
      'High-performance, role-governed sales execution engine with automated 24h escalation, callback alerts, and strict CST handovers.',
    highlights: [
      'Automated 24h Escalation — rule-based routing of stale agent leads to closers',
      'Dual-Alert Callback Engine — timezone-accurate 5-minute heads-up + exact due chime',
      'Validation-Gated CST Handovers — signature gating, pricing, items, structured notes',
      'Role-Isolated Dashboards — zero-noise UI per operational tier with quick-access drawers',
      'Lead Governance & Archival — disqualified queues with role-guarded purge workflows',
    ],
    image: '/assets/projects/admin.png',
    imagePosition: 'top',
    website: 'https://flash-tech-crm.vercel.app/login',
    websiteLabel: 'Live Demo',
    caseStudy: true,
    roles: [
      {
        id: 'admin',
        label: 'Admin',
        image: '/assets/projects/admin.png',
      },
      {
        id: 'agent',
        label: 'Sales Agent',
        image: '/assets/projects/agent.png',
      },
      {
        id: 'closer',
        label: 'Closer',
        image: '/assets/projects/closer.png',
      },
      {
        id: 'tech',
        label: 'Tech',
        image: '/assets/projects/tech.png',
      },
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'hawalay',
    title: 'Hawalay',
    featured: true,
    categoryLabel: 'AI & Web / Mobile',
    categories: ['web', 'mobile', 'ai'],
    badges: ['AI Integration', 'Computer Vision', 'Full-Stack'],
    result: 'Match in under 5 seconds',
    summary:
      'AI-powered lost-and-found solution featuring smart computer vision (object detection), text extraction (OCR), and intelligent matching.',
    highlights: [
      'Smart search',
      'Real-time AI assistance',
      'High-accuracy matching',
    ],
    image: '/assets/projects/hawalay.png',
    imagePosition: 'top',
    tags: ['React', 'FastAPI', 'Computer Vision', 'OCR', 'MongoDB'],
  },
  {
    id: 'ppsc-prep',
    title: 'PPSC Exam Prep AI',
    featured: true,
    categoryLabel: 'AI & Web Platform',
    categories: ['web', 'ai'],
    badges: ['AI Integration', 'Full-Stack', 'LLM'],
    result: 'Adaptive exam intelligence',
    summary:
      'Intelligent exam preparation and assessment platform with automated evaluation, smart query resolution, and tailored test practice.',
    highlights: [
      'AI query assistance',
      'Automated exam drills',
      'Personalized performance insights',
    ],
    image: '/assets/projects/ppsc-prep.png',
    imagePosition: 'top',
    tags: ['React', 'Node.js', 'LLM APIs', 'MongoDB', 'Analytics'],
  },
  {
    id: 'streamcraft',
    title: 'StreamCraft',
    featured: false,
    categoryLabel: 'Web App',
    categories: ['web'],
    badges: ['Full-Stack', 'Media'],
    result: 'Full-stack media platform',
    summary:
      'High-performance video and social platform with media pipelines, creator analytics, and secure production auth.',
    highlights: ['Media processing', 'Creator analytics', 'Secure auth'],
    image: '/assets/projects/streamcraft.png',
    imagePosition: 'top',
    tags: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Auth'],
  },
  {
    id: 'swiftdrop',
    title: 'SwiftDrop',
    featured: false,
    categoryLabel: 'Web App',
    categories: ['web'],
    badges: ['Full-Stack', 'Logistics'],
    result: 'End-to-end delivery ops',
    summary:
      'Enterprise-ready logistics platform with role-based dashboards, realtime parcel workflows, and scalable ops tooling.',
    highlights: ['Realtime dispatch', 'Role dashboards', 'Analytics'],
    image: '/assets/projects/swiftdrop.jpg',
    imagePosition: 'center',
    tags: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'alhadid',
    title: 'AlHadid International',
    featured: false,
    categoryLabel: 'Web App',
    categories: ['web'],
    badges: ['Full-Stack', 'Enterprise'],
    result: '100+ projects · zero layout shift',
    summary:
      'High-performance corporate platform with searchable project catalog, branded motion, and a compliance-document hub.',
    highlights: ['Project catalog', 'Performance', 'Brand systems'],
    image: '/assets/projects/alhadid.png',
    imagePosition: 'center',
    website: 'https://alhadidtec.com',
    websiteLabel: 'View live site',
    tags: ['React', 'Tailwind CSS', 'Performance'],
  },
  {
    id: 'skillora',
    title: 'Skillora',
    featured: false,
    categoryLabel: 'Mobile App',
    categories: ['mobile'],
    badges: ['Mobile', 'Realtime'],
    result: 'Knowledge-exchange mobile platform',
    summary:
      'Flutter skill-sharing app with swipe discovery, scheduling, realtime chat, and audio/video unlocked after booking.',
    highlights: ['Swipe discovery', 'Realtime chat', 'A/V sessions'],
    image: '/assets/projects/skillora.jpeg',
    imagePosition: 'top',
    imageFit: 'contain',
    tags: ['Flutter', 'Firebase', 'Realtime', 'Zego Cloud'],
  },
  {
    id: 'luxemart',
    title: 'LuxeMart',
    featured: false,
    categoryLabel: 'Mobile App',
    categories: ['mobile'],
    badges: ['Mobile', 'Commerce'],
    result: 'Full commerce + admin stack',
    summary:
      'Flutter e-commerce product with catalog search, wishlist, checkout, secure payments, and a Firebase admin panel.',
    highlights: ['Checkout flows', 'Payments', 'Admin ops'],
    image: '/assets/projects/luxemart.jpeg',
    imagePosition: 'top',
    imageFit: 'contain',
    tags: ['Flutter', 'Firebase', 'Payments', 'Admin'],
  },
  {
    id: 'edustream',
    title: 'EduStream',
    featured: false,
    categoryLabel: 'Mobile App',
    categories: ['mobile'],
    badges: ['Mobile', 'Ops Platform'],
    result: 'School operations system',
    summary:
      'Flutter school management system with student ops, automated fees, PDF invoices, analytics, and academic calendars.',
    highlights: ['Fee automation', 'PDF invoices', 'Analytics'],
    image: '/assets/projects/edustream.jpeg',
    imagePosition: 'top',
    imageFit: 'contain',
    tags: ['Flutter', 'REST API', 'PDF', 'Analytics'],
  },
];

/** @deprecated Prefer portfolioProjects — kept for any legacy imports */
export const webProjects: readonly PortfolioProject[] = portfolioProjects.filter(
  (p) => p.categories.includes('web')
);
export const appProjects: readonly PortfolioProject[] = portfolioProjects.filter(
  (p) => p.categories.includes('mobile')
);

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faqs: readonly Faq[] = [
  {
    q: 'What kind of projects do you take on?',
    a: 'AI engineering, workflow automation, custom LLM & agentic integrations, high-performance full-stack platforms, and production mobile apps — from MVP to enterprise-scale systems.',
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'Most builds reach a usable production release in six to eight weeks. We ship to real environments from the first sprint, with weekly demos and a clear architecture path.',
  },
  {
    q: 'How do you price work?',
    a: 'Fixed-scope for well-defined product builds, and a monthly retainer for ongoing platform, AI, and automation work. Outcomes and budget are agreed up front — no open-ended surprises.',
  },
  {
    q: 'Can you integrate AI into an existing product?',
    a: 'Yes. A large share of our work is adding LLM features, RAG over private data, agentic workflows, and intelligent APIs into products that already exist — without destabilising what already works.',
  },
  {
    q: 'Who owns the code and the IP?',
    a: 'You do — completely. We deliver clean, documented code and infrastructure in your accounts, with zero lock-in to us or any proprietary layer.',
  },
  {
    q: 'What happens after launch?',
    a: 'We stay. Monitoring, hardening, model/workflow iteration, and platform optimization are part of every engagement — and most clients keep us on past the first release.',
  },
];

/* ------------------------------------------------------------------ */
/*  TRUST — client / partner wordmarks (text-only, swap for logos)    */
/* ------------------------------------------------------------------ */
export const trustLogos: readonly string[] = [
  'Nova',
  'Atlas',
  'Orbit',
  'Pulse',
  'Vertex',
  'Helix',
  'Sentinel',
  'Cadence',
];
