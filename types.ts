// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service object type
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name: string;
    description: string;
    detailed_overview?: string;
    starting_price?: string;
    key_features?: string[];
    service_icon?: {
      url: string;
      imgix_url: string;
    };
    featured?: boolean;
  };
}

// Case study object type
export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_title: string;
    client_name: string;
    industry?: {
      key: string;
      value: string;
    };
    challenge: string;
    solution: string;
    results?: string;
    key_metrics?: Record<string, any>;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    services_used?: Service[];
    project_duration?: string;
  };
}

// Team member object type
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name: string;
    job_title: string;
    department?: {
      key: string;
      value: string;
    };
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    linkedin_url?: string;
    twitter_handle?: string;
  };
}

// Testimonial object type
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    customer_name: string;
    customer_title?: string;
    company_name: string;
    testimonial_text: string;
    rating?: {
      key: string;
      value: string;
    };
    customer_photo?: {
      url: string;
      imgix_url: string;
    };
    company_logo?: {
      url: string;
      imgix_url: string;
    };
    featured?: boolean;
  };
}

// Type literals for select-dropdown values
export type IndustryType = 'fintech' | 'ecommerce' | 'healthcare' | 'education' | 'saas' | 'marketplace';
export type DepartmentType = 'engineering' | 'design' | 'product' | 'marketing' | 'sales' | 'leadership';
export type RatingValue = '5' | '4' | '3' | '2' | '1';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

export function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type === 'case-studies';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Utility types for common patterns
export type CreateServiceData = Omit<Service, 'id' | 'created_at' | 'modified_at'>;
export type CreateCaseStudyData = Omit<CaseStudy, 'id' | 'created_at' | 'modified_at'>;
export type CreateTeamMemberData = Omit<TeamMember, 'id' | 'created_at' | 'modified_at'>;
export type CreateTestimonialData = Omit<Testimonial, 'id' | 'created_at' | 'modified_at'>;