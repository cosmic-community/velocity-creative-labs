import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CaseStudy } from '@/types'
import CaseStudyCard from './CaseStudyCard'

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  if (!caseStudies || caseStudies.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
            Success Stories That Inspire
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Discover how we've helped businesses transform their operations and achieve 
            remarkable results through innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors"
          >
            View All Case Studies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}