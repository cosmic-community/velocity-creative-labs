import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function CTASection() {
  const benefits = [
    'Free consultation and project scoping',
    '30-day money-back guarantee',
    'Dedicated project manager',
    'Ongoing support and maintenance'
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl mb-12 text-primary-100 max-w-2xl mx-auto text-balance">
          Join hundreds of companies that trust us to build scalable solutions 
          that drive growth and success.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-left">
              <CheckCircle className="w-5 h-5 text-primary-200 flex-shrink-0" />
              <span className="text-primary-100">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/services"
            className="border border-primary-200 text-white hover:bg-primary-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  )
}