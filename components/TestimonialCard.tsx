import { Star } from 'lucide-react'
import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = parseInt(testimonial.metadata.rating?.key || '5')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
        "{testimonial.metadata.testimonial_text}"
      </blockquote>

      <div className="flex items-center gap-4">
        {/* Customer Photo */}
        {testimonial.metadata.customer_photo && (
          <img
            src={`${testimonial.metadata.customer_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={testimonial.metadata.customer_name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}

        <div className="flex-grow">
          {/* Customer Info */}
          <div className="font-semibold text-gray-900">
            {testimonial.metadata.customer_name}
          </div>
          {testimonial.metadata.customer_title && (
            <div className="text-sm text-gray-600">
              {testimonial.metadata.customer_title}
            </div>
          )}
          <div className="text-sm font-medium text-primary-600">
            {testimonial.metadata.company_name}
          </div>
        </div>

        {/* Company Logo */}
        {testimonial.metadata.company_logo && (
          <img
            src={`${testimonial.metadata.company_logo.imgix_url}?w=120&h=60&fit=max&auto=format,compress`}
            alt={`${testimonial.metadata.company_name} logo`}
            width={60}
            height={30}
            className="w-12 h-6 object-contain opacity-60"
          />
        )}
      </div>
    </div>
  )
}