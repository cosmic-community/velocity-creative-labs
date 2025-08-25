import { Metadata } from 'next'
import { getAllServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Our Services - Velocity Creative Labs',
  description: 'Explore our comprehensive range of professional services including API development, payment processing, and data analytics.',
}

export const revalidate = 3600

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Our Professional Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            We provide comprehensive solutions to help your business scale and succeed. From API development to data analytics, our expert team delivers results that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}