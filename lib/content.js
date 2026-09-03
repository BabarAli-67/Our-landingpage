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
/*  VIDEO TESTIMONIALS  (real client reviews)                         */
/* ------------------------------------------------------------------ */
export const testimonials = [
  {
    id: 't1',
    name: 'Sarah Lin',
    role: 'VP Engineering, Nova',
    quote: 'They shipped in eight weeks what our last vendor missed in a year.',
    poster:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=70',
    // Public sample clips — replace with real client review MP4s.
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 't2',
    name: 'Marcus Reed',
    role: 'COO, Atlas Logistics',
    quote: 'The automation paid for itself in the first quarter. Genuinely.',
    poster:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=70',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Founder, Orbit',
    quote: 'Our support agent feels like magic to customers — and to my team.',
    poster:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=70',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 't4',
    name: 'David Okafor',
    role: 'CTO, Pulse Health',
    quote: 'Native-grade performance from one codebase. Our roadmap doubled.',
    poster:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=70',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
];

/* ------------------------------------------------------------------ */
/*  PROCESS                                                            */
/* ------------------------------------------------------------------ */
export const processSteps = [
  { icon: Rocket, title: 'Discovery', body: 'We map goals, constraints, and the fastest path to value.' },
  { icon: Code2, title: 'Architecture', body: 'Systems designed to scale — reviewed before a line ships.' },
  { icon: GitBranch, title: 'Build & iterate', body: 'Weekly demos, tight loops, production from day one.' },
  { icon: ShieldCheck, title: 'Launch & scale', body: 'Observability, hardening, and a team that stays.' },
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
    icon: Cpu,
    title: 'AI-native, not AI-bolted-on',
    body: 'We design agents and automation into the core of a product — not sprinkled on top after the fact.',
  },
  {
    icon: Users,
    title: 'Small senior team',
    body: 'A tight group of specialists who’ve shipped at scale, working directly with you — no account-manager telephone game.',
  },
  {
    icon: GitBranch,
    title: 'Weekly, demoable progress',
    body: 'Every week ends with something you can click. Tight loops keep the work honest and the roadmap flexible.',
  },
  {
    icon: ShieldCheck,
    title: 'Own everything',
    body: 'Clean, documented code and infrastructure that’s yours. No lock-in, no black boxes, no surprises.',
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
