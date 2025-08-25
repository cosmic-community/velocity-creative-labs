import Link from 'next/link'
import { ArrowRight, Building2, Clock } from 'lucide-react'
import { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover">
      {/* Hero Image */}
      {caseStudy.metadata.hero_image && (
        <img
          src={`${caseStudy.metadata.hero_image.imgix_url}?w=800&h=300&fit=crop&auto=format,compress`}
          alt={caseStudy.metadata.project_title}
          width={400}
          height={150}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        {/* Industry Badge */}
        {caseStudy.metadata.industry && (
          <div className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {caseStudy.metadata.industry.value}
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-balance">
          {caseStudy.metadata.project_title}
        </h3>

        {/* Client Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{caseStudy.metadata.client_name}</span>
          </div>
          
          {caseStudy.metadata.project_duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{caseStudy.metadata.project_duration}</span>
            </div>
          )}
        </div>

        {/* Challenge Preview */}
        <p className="text-gray-600 mb-6 line-clamp-3">
          {caseStudy.metadata.challenge}
        </p>

        {/* Key Metrics Preview */}
        {caseStudy.metadata.key_metrics && Object.keys(caseStudy.metadata.key_metrics).length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(caseStudy.metadata.key_metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-primary-600 mb-1">
                  {String(value)}
                </div>
                <div className="text-xs text-gray-600 capitalize">
                  {key.replace(/_/g, ' ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Services Used */}
        {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {caseStudy.metadata.services_used.slice(0, 2).map((service) => (
              <span
                key={service.id}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {service.metadata.service_name}
              </span>
            ))}
            {caseStudy.metadata.services_used.length > 2 && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                +{caseStudy.metadata.services_used.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Read Case Study
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}