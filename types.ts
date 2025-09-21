import React, { createContext } from 'react';

export const RouterContext = createContext<{ navigate: (path: string) => void; route: string }>({ 
  navigate: () => console.error('Navigate function called outside of RouterProvider'),
  route: window.location.pathname + window.location.hash,
});

export type AdminView = 'dashboard' | 'blog' | 'projects' | 'services' | 'team' | 'testimonials' | 'analytics' | 'pricing' | 'invoicing' | 'quotations' | 'documentHistory';

export type AIToolName =
  | 'strategyGenerator'
  | 'websiteAnalyzer'
  | 'adCopyGenerator'
  | 'socialPostGenerator'
  | 'blogIdeaGenerator'
  | 'keywordClusterGenerator'
  | 'roiCalculator'
  | 'auraSynthesizer'
  | 'brandSonifier';

export type AIToolUsage = Record<AIToolName, number>;

export interface ContactSubmission {
  id: string;
  name: string;
  organization: string;
  email: string;
  contactNumber: string;
  message: string;
  submittedAt: Date;
}


export interface Service {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export type NewService = Omit<Service, 'id' | 'icon'>;

export interface Project {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  techStack: string[];
}
export type NewProject = Omit<Project, 'id'>;


export interface TeamMember {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  title: string;
  bio: string;
}
export type NewTeamMember = Omit<TeamMember, 'id' | 'icon'>;


export interface BlogPost {
  slug?: string;
  title: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
  content: string;
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
}

export type NewBlogPost = Omit<BlogPost, 'slug' | 'date'>;


export interface HoloscanCategory {
  score: number;
  feedback: string;
  recommendations: string;
}

export interface HoloscanResult {
  overallScore: number;
  executiveSummary: string;
  seo: HoloscanCategory;
  ux: HoloscanCategory;
  performance: HoloscanCategory;
  security: HoloscanCategory;
}

export interface AdCopyResult {
  headlines: string[];
  descriptions: string[];
}

export interface BlogIdea {
  title: string;
  hook: string;
  keywords: string[];
}

export interface KeywordCluster {
  clusterTitle: string;
  keywords: string[];
}

export interface SocialPostResult {
  post: string;
  hashtags: string[];
  visualSuggestion: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceDetail?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}
export type NewPricingPlan = Omit<PricingPlan, 'id'>;

export interface ServicePricing {
  id: string;
  serviceTitle: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  plans: PricingPlan[];
}

export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    title: string;
    company: string;
}
export type NewTestimonial = Omit<Testimonial, 'id'>;