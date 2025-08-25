// app/case-studies/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Building2 } from 'lucide-react'
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/cosmic'
import ReactMarkdown from 'react-markdown'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.metadata.project_title} - Case Study`,
    description: caseStudy.metadata.challenge.substring(0, 160),
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto container-padding py-16">
        <Link 
          href="/case-studies"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          {caseStudy.metadata.hero_image && (
            <img
              src={`${caseStudy.metadata.hero_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
              alt={caseStudy.metadata.project_title}
              width={1200}
              height={400}
              className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
            />
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            {caseStudy.metadata.project_title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">{caseStudy.metadata.client_name}</span>
            </div>
            
            {caseStudy.metadata.industry && (
              <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {caseStudy.metadata.industry.value}
              </div>
            )}
            
            {caseStudy.metadata.project_duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{caseStudy.metadata.project_duration}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-12">
            {/* Challenge */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Challenge</h2>
              <div className="prose prose-lg max-w-none">
                <p>{caseStudy.metadata.challenge}</p>
              </div>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Solution</h2>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{caseStudy.metadata.solution}</ReactMarkdown>
              </div>
            </section>

            {/* Results */}
            {caseStudy.metadata.results && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{caseStudy.metadata.results}</ReactMarkdown>
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Key Metrics */}
            {caseStudy.metadata.key_metrics && Object.keys(caseStudy.metadata.key_metrics).length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  {Object.entries(caseStudy.metadata.key_metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        {String(value)}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Used */}
            {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Used</h3>
                <div className="space-y-3">
                  {caseStudy.metadata.services_used.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {service.metadata.service_name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}