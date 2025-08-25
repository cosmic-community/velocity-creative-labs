import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import TeamSection from '@/components/TeamSection'
import CTASection from '@/components/CTASection'
import { getAllServices, getAllCaseStudies, getAllTestimonials, getAllTeamMembers } from '@/lib/cosmic'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const [services, caseStudies, testimonials, teamMembers] = await Promise.all([
    getAllServices(),
    getAllCaseStudies(),
    getAllTestimonials(),
    getAllTeamMembers()
  ])

  const featuredServices = services.filter(service => service.metadata.featured).slice(0, 3)
  const latestCaseStudies = caseStudies.slice(0, 3)
  const featuredTestimonials = testimonials.filter(testimonial => testimonial.metadata.featured).slice(0, 3)
  const featuredTeamMembers = teamMembers.slice(0, 3)

  return (
    <>
      <Hero />
      <ServicesSection services={featuredServices} />
      <CaseStudiesSection caseStudies={latestCaseStudies} />
      <TestimonialsSection testimonials={featuredTestimonials} />
      <TeamSection teamMembers={featuredTeamMembers} />
      <CTASection />
    </>
  )
}