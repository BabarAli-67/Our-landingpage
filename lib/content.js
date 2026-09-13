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
    slug: 'ai-engineering',
    icon: BrainCircuit,
    title: 'AI Engineering',
    excerpt:
      'Custom LLM pipelines, agentic systems, and intelligent APIs that automate workflows and turn proprietary data into product advantage.',
    points: ['LLM & RAG systems', 'Agentic workflows', 'AI API integrations', 'Human-in-the-loop'],
    accent: 'primary',
  },
  {
    slug: 'automation',
    icon: Workflow,
    title: 'Workflow Automation',
    excerpt:
      'Intelligent business automation that removes manual ops — from lead routing and support triage to document and data pipelines.',
    points: ['Ops automation', 'Data pipelines', 'Multi-system sync', 'Event-driven flows'],
    accent: 'accent',
  },
  {
    slug: 'full-stack',
    icon: Globe2,
    title: 'Full-Stack Platforms',
    excerpt:
      'High-performance web architectures on modern stacks — engineered for scale, security, and long-term maintainability.',
    points: ['Next.js / MERN', 'Cloud & edge', 'Design systems', 'Dashboards & portals'],
    accent: 'primary',
  },
  {
    slug: 'mobile',
    icon: Smartphone,
    title: 'Mobile Product Apps',
    excerpt:
      'Cross-platform Flutter apps with native-grade UX, realtime backends, payments, and production ops tooling.',
    points: ['iOS & Android', 'Flutter', 'Realtime sync', 'Store delivery'],
    accent: 'accent',
  },
];

/* ------------------------------------------------------------------ */
/*  RESULTS / BENEFITS — outcome-focused value props                  */
/* ------------------------------------------------------------------ */
export const benefits = [
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
export const whyUs = [
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
/*  LANDING — Website problems (real projects)                        */
/*  Images: drop screenshots in /public/assets/projects/              */
/* ------------------------------------------------------------------ */
export const webProjects = [
  {
    id: 'hawalay',
    title: 'Hawalay',
    problem:
      'Manual lost-and-found workflows were slow, error-prone, and exposed sensitive ID photos — with no intelligent matching layer.',
    result: 'Match in under 5 seconds',
    summary:
      'AI-powered lost & found platform with vision + OCR matching, geospatial search within 10 km, automatic privacy masking, and verified chat — React, Node/Express, and a FastAPI intelligence engine.',
    image: '/assets/projects/hawalay.png',
    imagePosition: 'top',
    tags: ['React', 'FastAPI', 'Computer Vision', 'OCR', 'MongoDB'],
  },
  {
    id: 'streamcraft',
    title: 'StreamCraft',
    problem:
      'A video + social product needed production-grade media pipelines, analytics aggregation, and secure auth at scale.',
    result: 'Full-stack media platform',
    summary:
      'High-performance MERN architecture with MongoDB aggregation for creator analytics, Cloudinary media processing, and JWT rotation with httpOnly cookies — deployed across Vercel.',
    image: '/assets/projects/streamcraft.png',
    imagePosition: 'top',
    tags: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Auth'],
  },
  {
    id: 'swiftdrop',
    title: 'SwiftDrop',
    problem:
      'Merchants and riders had no unified system for orders, dispatch, and live tracking — logistics lived in fragmented tools.',
    result: 'End-to-end delivery ops platform',
    summary:
      'Enterprise-ready logistics platform with role-based dashboards, realtime parcel workflows, analytics, and secure auth — Next.js + Node on a scalable MongoDB backbone.',
    image: '/assets/projects/swiftdrop.jpg',
    imagePosition: 'center',
    tags: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Dashboards'],
  },
  {
    id: 'ppsc-prep',
    title: 'PPSC Prep',
    problem:
      'Static study material couldn’t adapt — students needed intelligent mocks, document-to-quiz generation, and personalized learning paths.',
    result: 'Adaptive exam intelligence',
    summary:
      'AI exam-prep platform with LLM-generated syllabus questions, document-to-quiz conversion, video-to-notes pipelines, and performance analytics that target weak topics.',
    image: '/assets/projects/ppsc-prep.png',
    imagePosition: 'top',
    tags: ['React', 'Node.js', 'LLM APIs', 'MongoDB', 'Analytics'],
  },
  {
    id: 'alhadid',
    title: 'AlHadid International',
    problem:
      'A Class G5 engineering firm needed an enterprise web presence that could showcase credentials and 100+ projects without sacrificing performance.',
    result: '100+ projects · zero layout shift',
    summary:
      'High-performance corporate platform with searchable project catalog, branded motion systems, and a compliance-document hub — engineered for trust with enterprise buyers.',
    image: '/assets/projects/alhadid.png',
    imagePosition: 'center',
    website: 'https://alhadidtec.com',
    websiteLabel: 'alhadidtec.com',
    tags: ['React', 'Tailwind CSS', 'Performance'],
  },
];

/* ------------------------------------------------------------------ */
/*  LANDING — App problems (real Flutter projects)                    */
/*  Images: drop screenshots in /public/assets/projects/              */
/* ------------------------------------------------------------------ */
export const appProjects = [
  {
    id: 'skillora',
    title: 'Skillora',
    problem:
      'Skill exchange had no production-grade product surface — discovery, scheduling, chat, and gated A/V needed to live in one mobile system.',
    result: 'Knowledge-exchange mobile platform',
    summary:
      'Flutter skill-sharing app with swipe discovery, in-app scheduling, realtime chat, and audio/video that unlocks after booking — Firebase, FCM, Cloudinary, and Zego Cloud.',
    image: '/assets/projects/skillora.jpeg',
    imagePosition: 'top',
    imageFit: 'contain',
    tags: ['Flutter', 'Firebase', 'Realtime', 'Zego Cloud'],
  },
  {
    id: 'luxemart',
    title: 'LuxeMart',
    problem:
      'A classroom e-commerce demo couldn’t support real commerce — wishlist, checkout, payments, and admin ops had to become production software.',
    result: 'Full commerce + admin stack',
    summary:
      'Flutter e-commerce product with catalog search, wishlist, cart, checkout, secure payments, and a Firebase admin panel for realtime product and order control.',
    image: '/assets/projects/luxemart.jpeg',
    imagePosition: 'top',
    imageFit: 'contain',
    tags: ['Flutter', 'Firebase', 'Payments', 'Admin'],
  },
  {
    id: 'edustream',
    title: 'EduStream',
    problem:
      'Schools ran enrollment, fees, invoices, and events across fragmented tools — with no unified operational platform.',
    result: 'School operations system',
    summary:
      'Flutter school management system with student ops, automated fee collection, PDF invoices with QR/FBR flows, analytics dashboards, and academic calendar management — web and mobile.',
    image: '/assets/projects/edustream.jpeg',
    imagePosition: 'top',
    imageFit: 'contain',
    tags: ['Flutter', 'REST API', 'PDF', 'Analytics'],
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faqs = [
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
