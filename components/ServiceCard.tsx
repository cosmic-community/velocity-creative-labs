import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
      {/* Service Icon */}
      {service.metadata.service_icon && (
        <img
          src={`${service.metadata.service_icon.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
          alt={service.metadata.service_name}
          width={60}
          height={60}
          className="rounded-lg mb-4"
        />
      )}

      {/* Featured Badge */}
      {service.metadata.featured && (
        <div className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Service Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {service.metadata.service_name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 line-clamp-3">
        {service.metadata.description}
      </p>

      {/* Features Preview */}
      {service.metadata.key_features && service.metadata.key_features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {service.metadata.key_features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Price and CTA */}
      <div className="flex items-center justify-between">
        {service.metadata.starting_price && (
          <div className="text-sm text-gray-500">
            Starting at{' '}
            <span className="font-bold text-gray-900">
              {service.metadata.starting_price}
            </span>
          </div>
        )}
        
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}