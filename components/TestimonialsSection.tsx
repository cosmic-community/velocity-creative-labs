import { Star } from 'lucide-react'
import { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const renderStars = (rating?: { key: string; value: string }) => {
    const numStars = parseInt(rating?.key || '0')
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < numStars
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Don't just take our word for it. Here's what our clients have to say 
            about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 card-hover"
            >
              {/* Rating */}
              {testimonial.metadata.rating && (
                <div className="mb-4">
                  {renderStars(testimonial.metadata.rating)}
                </div>
              )}

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 text-balance">
                "{testimonial.metadata.testimonial_text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                {testimonial.metadata.customer_photo && (
                  <img
                    src={`${testimonial.metadata.customer_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={testimonial.metadata.customer_name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.metadata.customer_name}
                  </div>
                  {testimonial.metadata.customer_title && (
                    <div className="text-sm text-gray-600">
                      {testimonial.metadata.customer_title}
                    </div>
                  )}
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonial.metadata.company_name}
                  </div>
                </div>
              </div>

              {/* Company Logo */}
              {testimonial.metadata.company_logo && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <img
                    src={`${testimonial.metadata.company_logo.imgix_url}?w=240&h=60&fit=crop&auto=format,compress`}
                    alt={`${testimonial.metadata.company_name} logo`}
                    width={120}
                    height={30}
                    className="h-8 object-contain opacity-60"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}