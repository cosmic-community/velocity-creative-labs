import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-xl font-bold mb-4">
              Velocity <span className="text-primary-400">Creative</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              We build scalable solutions that power modern businesses. From API development to data analytics, we deliver results that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">API Development</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Payment Processing</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Data Analytics</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Consulting</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
              <li><Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Velocity Creative Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}