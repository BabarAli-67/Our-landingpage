import {
  Bot,
  Workflow,
  Database,
  Code2,
  Smartphone,
  Boxes,
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
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */
export const services = [
  {
    slug: 'agentic-ai',
    icon: Bot,
    title: 'Agentic AI & AI Agents',
    excerpt:
      'Autonomous agents that reason, plan, and act across your tools — from RAG assistants to multi-agent orchestration.',
    points: ['LLM orchestration', 'RAG & knowledge bases', 'Tool-using agents', 'Human-in-the-loop'],
    accent: 'primary',
  },
  {
    slug: 'automation',
    icon: Workflow,
    title: 'Enterprise Automation',
    excerpt:
      'n8n, Python and event-driven pipelines that remove manual work and connect every system you run.',
    points: ['n8n workflows', 'Python automation', 'API integrations', 'Data pipelines'],
    accent: 'accent',
  },
  {
    slug: 'crm',
    icon: Database,
    title: 'Custom CRM Systems',
    excerpt:
      'Bespoke CRMs tailored to your pipeline — not another rigid SaaS you bend your process around.',
    points: ['Sales pipelines', 'Role-based access', 'Reporting dashboards', 'Third-party sync'],
    accent: 'primary',
  },
  {
    slug: 'web',
    icon: Code2,
    title: 'Full-Stack Web Development',
    excerpt:
      'Next.js, MERN and Django products engineered for speed, scale, and airtight DX.',
    points: ['Next.js / MERN', 'Django backends', 'Design systems', 'Edge & SSR'],
    accent: 'accent',
  },
  {
    slug: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    excerpt:
      'Cross-platform apps with native-grade performance and a shared, maintainable codebase.',
    points: ['React Native', 'Flutter', 'Offline-first', 'App store delivery'],
    accent: 'primary',
  },
  {
    slug: 'scale',
    icon: Boxes,
    title: 'Scalable Digital Solutions',
    excerpt:
      'Cloud architecture, DevOps and platform engineering that grows without breaking.',
    points: ['Cloud & DevOps', 'Microservices', 'Observability', 'Cost optimization'],
    accent: 'accent',
  },
];

/* ------------------------------------------------------------------ */
/*  TECH STACK & CAPABILITIES                                          */
/* ------------------------------------------------------------------ */
export const techStack = [
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
    items: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    group: 'Cloud & DevOps',
    icon: GitBranch,
    items: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
  },
];

/* ------------------------------------------------------------------ */
/*  CASE STUDIES / WORK                                                */
/* ------------------------------------------------------------------ */
export const caseStudies = [
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
export const clientReviews = [
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
export const processSteps = [
  {
    icon: MessagesSquare,
    title: "Tell us what's broken",
    body: "Message us on WhatsApp with the problem, not the solution. We'll ask the right questions.",
  },
  {
    icon: Rocket,
    title: 'We diagnose and scope',
    body: "We map out what's actually causing it and the fastest path to fixing it.",
  },
  {
    icon: Code2,
    title: 'Build & demo, weekly',
    body: 'You see working progress every week — no surprises at the end.',
  },
  {
    icon: ShieldCheck,
    title: 'Launch, and we stay',
    body: 'We ship it, harden it, and stick around after go-live.',
  },
];

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */
export const stats = [
  { value: '120+', label: 'Products shipped' },
  { value: '98%', label: 'Client retention' },
  { value: '40M+', label: 'Automated actions / mo' },
  { value: '6', label: 'Countries served' },
];

/* ------------------------------------------------------------------ */
/*  HOMEPAGE SERVICES — the four core offerings                       */
/* ------------------------------------------------------------------ */
export const homeServices = [
  {
    slug: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    excerpt:
      'Cross-platform mobile apps with native-grade performance, offline-first data, and a single maintainable codebase.',
    points: ['iOS & Android', 'React Native / Flutter', 'Offline-first sync', 'App-store delivery'],
    accent: 'primary',
  },
  {
    slug: 'ai-integration',
    icon: BrainCircuit,
    title: 'AI Integration',
    excerpt:
      'Bring LLMs, RAG, and autonomous agents into your product — reasoning over your data and acting across your tools.',
    points: ['LLM & RAG pipelines', 'Agentic workflows', 'Private knowledge bases', 'Human-in-the-loop'],
    accent: 'accent',
  },
  {
    slug: 'chatbots',
    icon: MessagesSquare,
    title: 'Chatbots',
    excerpt:
      'Conversational assistants that resolve support, qualify leads, and guide users — on the web, WhatsApp, or in-app.',
    points: ['Support automation', 'Lead qualification', 'Multi-channel', 'CRM-connected'],
    accent: 'primary',
  },
  {
    slug: 'web-applications',
    icon: Globe2,
    title: 'Web Applications',
    excerpt:
      'Fast, scalable web products on Next.js and modern stacks — engineered for speed, SEO, and airtight developer experience.',
    points: ['Next.js / MERN', 'Edge & SSR', 'Design systems', 'Dashboards & portals'],
    accent: 'accent',
  },
];

/* ------------------------------------------------------------------ */
/*  RESULTS / BENEFITS — outcome-focused value props                  */
/* ------------------------------------------------------------------ */
export const benefits = [
  {
    icon: Rocket,
    title: 'Ship in weeks, not quarters',
    body: 'Production from the first sprint. You see working software early and steer with real feedback — no six-month black boxes.',
    metric: '6–8 wk',
    metricLabel: 'to first release',
  },
  {
    icon: TrendingUp,
    title: 'Built to move a metric',
    body: 'Every engagement targets a number — conversion, resolution rate, hours saved. We instrument it and prove the lift.',
    metric: '+38%',
    metricLabel: 'avg. pipeline lift',
  },
  {
    icon: Layers,
    title: 'Scales without a rewrite',
    body: 'Clean architecture and observability from day one, so the thing you launch is the thing you grow — from thousands to millions.',
    metric: '40M+',
    metricLabel: 'events / day handled',
  },
  {
    icon: Gauge,
    title: 'Fast where it counts',
    body: 'Sub-second loads, tight interactions, and 60fps motion. Performance is a feature, not an afterthought.',
    metric: '0.4s',
    metricLabel: 'median TTFB',
  },
  {
    icon: ShieldCheck,
    title: 'Senior team, end to end',
    body: 'No hand-offs to juniors. The people who scope your project are the people who build and ship it.',
    metric: '98%',
    metricLabel: 'client retention',
  },
  {
    icon: Clock,
    title: 'Support that stays',
    body: 'Hardening, monitoring, and a team on call after launch. We don’t disappear the moment you go live.',
    metric: '24/7',
    metricLabel: 'monitored uptime',
  },
];

/* ------------------------------------------------------------------ */
/*  WHY US — differentiators                                          */
/* ------------------------------------------------------------------ */
export const whyUs = [
  {
    icon: Globe2,
    title: 'One team, whatever the fix requires',
    body: "Whether the answer is a website, an app, or both, you're working with the same two people the whole way through.",
  },
  {
    icon: Users,
    title: 'Small by design',
    body: 'You talk directly to the people building it. No relay through a middleman.',
  },
  {
    icon: GitBranch,
    title: 'You see it every week',
    body: 'Every week ends with something you can click, not a status update.',
  },
  {
    icon: ShieldCheck,
    title: "Nothing you don't own",
    body: "Clean, documented code and infrastructure that's yours. No lock-in, no black boxes.",
  },
];

/* ------------------------------------------------------------------ */
/*  LANDING — Website problems (best 3)                               */
/* ------------------------------------------------------------------ */
export const webProjects = [
  {
    id: 'vertex',
    title: 'Vertex Platform',
    problem: 'A SaaS product was losing users to lag.',
    result: '0.4s median load time',
    summary: 'Rebuilt on modern edge infrastructure.',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=70',
    tags: ['Next.js', 'Edge', 'MERN'],
  },
  {
    id: 'nova-crm',
    title: 'Nova — Revenue CRM',
    problem: 'Sales was juggling three disconnected tools.',
    result: '+38% pipeline velocity',
    summary: 'One system with lead scoring and reporting built in.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
    tags: ['Next.js', 'Django', 'Postgres'],
  },
  {
    id: 'orbit-agent',
    title: 'Orbit — Support Portal',
    problem: 'Support was drowning in repeat tickets.',
    result: '71% of tickets resolved without a human',
    summary: 'A self-serve portal that actually understands 40k docs.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=70',
    tags: ['Next.js', 'LangChain', 'Vector DB'],
  },
];

/* ------------------------------------------------------------------ */
/*  LANDING — App problems (best 3)                                   */
/* ------------------------------------------------------------------ */
export const appProjects = [
  {
    id: 'pulse-health',
    title: 'Pulse — Health App',
    problem: 'No offline-first health app existed for their users.',
    result: '4.9★ · 120k installs',
    summary: 'Built one, with real-time sync and biometric onboarding.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=70',
    tags: ['React Native', 'Firebase', 'Node'],
  },
  {
    id: 'cadence',
    title: 'Cadence',
    problem: 'Scheduling was clunky across devices.',
    result: '60fps everywhere',
    summary: 'One codebase, smooth on every platform.',
    image:
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=1200&q=70',
    tags: ['Flutter', 'Expo', 'GraphQL'],
  },
  {
    id: 'atlas-mobile',
    title: 'Atlas Field Ops',
    problem: 'Field teams were tracking work on paper.',
    result: '1,200 hours/month saved',
    summary: 'An offline-ready companion app with photo capture and live sync.',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=70',
    tags: ['React Native', 'AWS', 'Offline-first'],
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faqs = [
  {
    q: 'What kind of projects do you take on?',
    a: 'App development, AI integration, chatbots, and web applications — from a focused MVP to a full platform. If it involves building intelligent, scalable software, it’s in our wheelhouse.',
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'Most projects reach a usable first release in six to eight weeks. We ship to a real environment from the first sprint, so you’re never waiting months to see progress.',
  },
  {
    q: 'How do you price work?',
    a: 'Fixed-scope for well-defined builds, and a monthly rate for ongoing product and platform work. We agree on outcomes and a budget up front — no open-ended surprises.',
  },
  {
    q: 'Can you integrate AI into an existing product?',
    a: 'Yes. A large share of our work is adding LLM features, RAG over private data, agents, and chatbots into products that already exist — carefully, and without destabilising what already works.',
  },
  {
    q: 'Who owns the code and the IP?',
    a: 'You do — completely. We deliver clean, documented code and infrastructure in your accounts, with zero lock-in to us or any proprietary layer.',
  },
  {
    q: 'What happens after launch?',
    a: 'We stay. Monitoring, hardening, and iteration are part of every engagement, and most clients keep us on for continued product work well past the first release.',
  },
];

/* ------------------------------------------------------------------ */
/*  TRUST — client / partner wordmarks (text-only, swap for logos)    */
/* ------------------------------------------------------------------ */
export const trustLogos = [
  'Nova',
  'Atlas',
  'Orbit',
  'Pulse',
  'Vertex',
  'Helix',
  'Sentinel',
  'Cadence',
];
