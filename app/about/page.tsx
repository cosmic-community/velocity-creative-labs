import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Users, Lightbulb, Award } from 'lucide-react'
import { getAllTeamMembers, getFeaturedTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'

export const metadata: Metadata = {
  title: 'About Us - Velocity Creative Labs',
  description: 'Learn about Velocity Creative Labs\' mission, values, and the team behind our innovative digital solutions.',
}

export const revalidate = 3600

export default async function AboutPage() {
  const [teamMembers, testimonials] = await Promise.all([
    getAllTeamMembers(),
    getFeaturedTestimonials()
  ])

  const stats = [
    { label: 'Team Members', value: teamMembers.length.toString() },
    { label: 'Years of Experience', value: '10+' },
    { label: 'Projects Delivered', value: '200+' },
    { label: 'Client Satisfaction', value: '98%' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable outcomes that drive real business value for our clients.'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our success. We work closely with clients to understand their unique needs and goals.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We stay at the forefront of technology trends to deliver cutting-edge solutions.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to client service.'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Building the Future of Digital Innovation
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance">
              At Velocity Creative Labs, we combine technical expertise with creative thinking 
              to deliver solutions that transform businesses and drive growth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Founded with a vision to bridge the gap between cutting-edge technology and business success, 
                Velocity Creative Labs has grown from a small team of passionate developers into a full-service 
                digital agency trusted by businesses worldwide.
              </p>
              
              <p className="text-gray-600 mb-6">
                We believe that great software isn't just about clean code—it's about understanding our clients' 
                challenges, crafting solutions that exceed expectations, and building lasting partnerships that 
                drive mutual success.
              </p>
              
              <p className="text-gray-600">
                Today, our diverse team of engineers, designers, strategists, and project managers work together 
                to deliver innovative solutions across web development, API integration, data analytics, and more. 
                Every project we take on is an opportunity to push boundaries and create something exceptional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              These core principles guide everything we do and shape the way we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-balance">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {testimonials.slice(0, 2).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8 text-balance">
            Let's discuss how we can help bring your vision to life and drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}