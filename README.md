# Velocity Creative Labs - Professional Services Platform

![App Preview](https://imgix.cosmicjs.com/4bfbcab0-81e2-11f0-b0ac-f12686cb9ade-photo-1558494949-ef010cbdcc31-1756146938417.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated professional services platform built with Next.js that showcases comprehensive service offerings, case studies, team members, and testimonials. Designed with Stripe's signature clean aesthetic and premium user experience.

## Features

- 🛠️ **Interactive Service Showcase** - Beautifully presented services with detailed overviews and pricing
- 📊 **Compelling Case Studies** - Rich storytelling with metrics, challenges, solutions, and results  
- 👥 **Team Member Profiles** - Professional team showcase with social links and department filtering
- 💬 **Client Testimonials** - Trust-building social proof with ratings and company logos
- 📱 **Responsive Design** - Optimized for all devices with mobile-first approach
- 🔍 **SEO Optimized** - Dynamic meta tags and structured data for better search visibility

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68acac0ff01fd26965584662&clone_repository=68acae2d04ea77b1e31e5559)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a company website with services, team members, testimonials, and case studies. Make it styled like stripe.com

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Make it styled like stripe.com

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Cosmic for content management
- **Language**: TypeScript for type safety
- **Images**: Optimized with imgix integration
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the content structure

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Cosmic SDK Examples

### Fetching Services
```typescript
const response = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching Case Studies with Connected Services
```typescript
const response = await cosmic.objects
  .find({ type: 'case-studies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1); // Includes connected services data
```

### Fetching Team Members by Department
```typescript
const response = await cosmic.objects
  .find({ 
    type: 'team-members',
    'metadata.department.key': 'engineering'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## Cosmic CMS Integration

This application integrates with four main Cosmic object types:

- **Services** - Service offerings with descriptions, pricing, and features
- **Case Studies** - Detailed project showcases with metrics and results
- **Team Members** - Staff profiles with departments and social links
- **Testimonials** - Client feedback with ratings and company information

All content is dynamically fetched and includes proper error handling for missing or incomplete data.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command to `bun run build`
3. Set publish directory to `.next`
4. Add environment variables in Netlify dashboard

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

<!-- README_END -->