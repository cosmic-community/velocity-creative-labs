import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Velocity Creative Labs - Professional Services & Solutions',
  description: 'Expert API development, payment processing, data analytics, and consulting services. Build scalable solutions with our experienced team.',
  keywords: 'API development, payment processing, data analytics, consulting, professional services',
  authors: [{ name: 'Velocity Creative Labs' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Velocity Creative Labs - Professional Services & Solutions',
    description: 'Expert API development, payment processing, data analytics, and consulting services.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velocity Creative Labs - Professional Services & Solutions',
    description: 'Expert API development, payment processing, data analytics, and consulting services.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}