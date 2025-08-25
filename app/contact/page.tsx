import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - Velocity Creative Labs',
  description: 'Get in touch with Velocity Creative Labs. Let\'s discuss your project and how we can help bring your vision to life.',
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: 'hello@velocitylabs.dev',
      link: 'mailto:hello@velocitylabs.dev'
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Location',
      info: 'San Francisco, CA',
      link: null
    },
    {
      icon: Clock,
      title: 'Business Hours',
      info: 'Mon-Fri 9AM-6PM PST',
      link: null
    }
  ]

  const faqs = [
    {
      question: 'What types of projects do you work on?',
      answer: 'We specialize in web development, API development, payment processing integration, data analytics platforms, and custom software solutions. From startups to enterprise clients, we handle projects of all sizes.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity and scope. Simple websites might take 2-4 weeks, while complex applications can take 3-6 months or more. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes! We offer various maintenance and support packages to keep your application running smoothly. This includes updates, security patches, monitoring, and feature enhancements.'
    },
    {
      question: 'What is your development process like?',
      answer: 'We follow an agile development approach with regular check-ins, transparent communication, and iterative delivery. You\'ll have full visibility into progress and can provide feedback throughout the process.'
    }
  ]

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-xl text-gray-600 text-balance">
            Ready to transform your ideas into reality? We'd love to hear about your project 
            and discuss how we can help you achieve your goals.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Prefer to reach out directly? Here are the best ways to get in touch with us.
              </p>
            </div>

            <div className="grid gap-6 mb-12">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a 
                        href={item.link}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {item.info}
                      </a>
                    ) : (
                      <p className="text-gray-600">{item.info}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}