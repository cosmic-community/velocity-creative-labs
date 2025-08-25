import { Metadata } from 'next'
import { getAllCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'

export const metadata: Metadata = {
  title: 'Case Studies - Velocity Creative Labs',
  description: 'Explore our successful project implementations and the results we\'ve delivered for clients across various industries.',
}

export const revalidate = 3600

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Discover how we've helped businesses transform their operations, increase revenue, and achieve their goals through innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {caseStudies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}