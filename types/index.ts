import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  PRIMITIVES                                                         */
/* ------------------------------------------------------------------ */

/** Gold accent track a card/badge renders on. */
export type Accent = 'primary' | 'accent';

/** Shared size scale for buttons and controls. */
export type ControlSize = 'sm' | 'md' | 'lg';

/** Visual variant for `LiquidGlassButton`. */
export type ButtonVariant = 'primary' | 'accent' | 'ghost';

/** Portfolio taxonomy used by the landing-page filter tabs. */
export type PortfolioCategory = 'web' | 'mobile' | 'ai';

/** How a project screenshot is framed inside its 16/10 well. */
export type ImageFit = 'cover' | 'contain';
export type ImagePosition = 'top' | 'center';

/** Where a client review came from. */
export type ReviewSource = 'fiverr' | 'direct';

/* ------------------------------------------------------------------ */
/*  SITE CONFIG                                                        */
/* ------------------------------------------------------------------ */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly label: 'TikTok' | 'Instagram' | 'Facebook';
  readonly href: string;
}

export interface CallToAction {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

export interface SiteConfig {
  readonly name: string;
  readonly legalName: string;
  readonly tagline: string;
  readonly description: string;
  readonly url: string;
  readonly email: string;
  readonly phone: string;
  readonly fiverrUrl: string;
  readonly whatsappNumber: string;
  readonly whatsappUrl: string;
  readonly whatsappQuoteUrl: string;
  readonly nav: readonly NavItem[];
  readonly cta: CallToAction;
  readonly socials: readonly SocialLink[];
  readonly logo: string;
  readonly ogImage: string;
  readonly splineScene: string;
  readonly foundingDate: string;
  readonly areaServed: readonly string[];
}

/* ------------------------------------------------------------------ */
/*  CONTENT MODELS                                                     */
/* ------------------------------------------------------------------ */

export interface Service {
  readonly slug: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly excerpt: string;
  readonly points: readonly string[];
  readonly accent: Accent;
}

export interface TechGroup {
  readonly group: string;
  readonly icon: LucideIcon;
  readonly items: readonly string[];
}

export interface CaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly result: string;
  readonly summary: string;
  readonly image: string;
  readonly tags: readonly string[];
}

export interface ClientReview {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly country?: string;
  readonly source: ReviewSource;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly quote: string;
  readonly website?: string;
  readonly websiteLabel?: string;
}

export interface ProcessStep {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface Benefit {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
  readonly metric: string;
  readonly metricLabel: string;
}

export interface Differentiator {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

export interface PortfolioFilter {
  readonly id: PortfolioCategory;
  readonly label: string;
}

/** One role-scoped dashboard screenshot inside a multi-role project. */
export interface ProjectRole {
  readonly id: string;
  readonly label: string;
  readonly image: string;
}

export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly featured: boolean;
  readonly categoryLabel: string;
  readonly categories: readonly PortfolioCategory[];
  readonly badges: readonly string[];
  readonly result: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly image: string;
  readonly tags: readonly string[];
  readonly tagline?: string;
  readonly imagePosition?: ImagePosition;
  readonly imageFit?: ImageFit;
  readonly website?: string;
  readonly websiteLabel?: string;
  readonly caseStudy?: boolean;
  readonly roles?: readonly ProjectRole[];
  /** Used by `ServiceProjects` to frame the engagement problem-first. */
  readonly problem?: string;
}

export interface Faq {
  readonly q: string;
  readonly a: string;
}

/* ------------------------------------------------------------------ */
/*  HORIZONTAL SHOWCASE                                                */
/* ------------------------------------------------------------------ */

export interface ShowcaseProject {
  readonly id: string;
  readonly categorySlug: string;
  readonly category: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly tags: readonly string[];
  readonly image: string;
}

/* ------------------------------------------------------------------ */
/*  CONTACT FORM                                                       */
/* ------------------------------------------------------------------ */

export type ContactField = 'name' | 'email' | 'service' | 'budget' | 'message';

export type ContactValues = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export type SubmitStatus = 'idle' | 'submitting' | 'done' | 'error';

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly service: string;
  readonly budget: string;
  readonly message: string;
}
