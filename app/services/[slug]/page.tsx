// app/services/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, ExternalLink } from 'lucide-react'
import { getServiceBySlug, getAllServices } from '@/lib/cosmic'
import ReactMarkdown from 'react-markdown'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.metadata.service_name} - Velocity Creative Labs`,
    description: service.metadata.description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto container-padding py-16">
        <Link 
          href="/services"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        <div className="mb-12">
          {service.metadata.service_icon && (
            <img
              src={`${service.metadata.service_icon.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={service.metadata.service_name}
              width={60}
              height={60}
              className="rounded-lg mb-6"
            />
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            {service.metadata.service_name}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 text-balance">
            {service.metadata.description}
          </p>

          {service.metadata.starting_price && (
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Starting at</span>
              <span className="text-lg font-bold">{service.metadata.starting_price}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {service.metadata.detailed_overview && (
              <div className="prose prose-lg max-w-none mb-12">
                <ReactMarkdown>{service.metadata.detailed_overview}</ReactMarkdown>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {service.metadata.key_features && service.metadata.key_features.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {service.metadata.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how {service.metadata.service_name.toLowerCase()} can help your business grow and succeed.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get Started
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}