import { createBucketClient } from '@cosmicjs/sdk'
import { Service, CaseStudy, TeamMember, Testimonial, CosmicResponse, DepartmentType } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Services API functions
export async function getAllServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Service[]).sort((a, b) => {
      // Featured services first, then alphabetical
      if (a.metadata.featured && !b.metadata.featured) return -1;
      if (!a.metadata.featured && b.metadata.featured) return 1;
      return a.metadata.service_name.localeCompare(b.metadata.service_name);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch services');
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Service;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch service');
  }
}

// Case studies API functions
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as CaseStudy[]).sort((a, b) => {
      // Sort by modified date (newest first)
      const dateA = new Date(a.modified_at).getTime();
      const dateB = new Date(b.modified_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch case studies');
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as CaseStudy;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch case study');
  }
}

// Team members API functions
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as TeamMember[]).sort((a, b) => {
      // Sort by full name alphabetically
      return a.metadata.full_name.localeCompare(b.metadata.full_name);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

export async function getTeamMembersByDepartment(department: DepartmentType): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'team-members',
        'metadata.department.key': department
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as TeamMember[]).sort((a, b) => {
      return a.metadata.full_name.localeCompare(b.metadata.full_name);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members by department');
  }
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'team-members', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as TeamMember;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch team member');
  }
}

// Testimonials API functions
export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Testimonial[]).sort((a, b) => {
      // Featured testimonials first, then by rating (highest first)
      if (a.metadata.featured && !b.metadata.featured) return -1;
      if (!a.metadata.featured && b.metadata.featured) return 1;
      
      const ratingA = parseInt(a.metadata.rating?.key || '0');
      const ratingB = parseInt(b.metadata.rating?.key || '0');
      return ratingB - ratingA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const allTestimonials = await getAllTestimonials();
    return allTestimonials.filter(testimonial => testimonial.metadata.featured);
  } catch (error) {
    throw new Error('Failed to fetch featured testimonials');
  }
}