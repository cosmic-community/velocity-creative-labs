import Link from 'next/link'
import { ArrowRight, Linkedin, Twitter } from 'lucide-react'
import { TeamMember } from '@/types'

interface TeamSectionProps {
  teamMembers: TeamMember[]
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  if (!teamMembers || teamMembers.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Our diverse team of experts brings together decades of experience in 
            engineering, design, and business strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-6 text-center card-hover"
            >
              {/* Profile Photo */}
              {member.metadata.profile_photo && (
                <img
                  src={`${member.metadata.profile_photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                  alt={member.metadata.full_name}
                  width={120}
                  height={120}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
              )}

              {/* Name and Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.metadata.full_name}
              </h3>
              <p className="text-primary-600 font-medium mb-2">
                {member.metadata.job_title}
              </p>

              {/* Department */}
              {member.metadata.department && (
                <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {member.metadata.department.value}
                </div>
              )}

              {/* Bio */}
              {member.metadata.bio && (
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {member.metadata.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                {member.metadata.linkedin_url && (
                  <a
                    href={member.metadata.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.metadata.twitter_handle && (
                  <a
                    href={`https://twitter.com/${member.metadata.twitter_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors"
          >
            Meet the Full Team
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}