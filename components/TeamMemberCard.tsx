import { Linkedin, Twitter } from 'lucide-react'
import { TeamMember } from '@/types'

interface TeamMemberCardProps {
  teamMember: TeamMember
}

export default function TeamMemberCard({ teamMember }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover">
      {/* Profile Photo */}
      {teamMember.metadata.profile_photo && (
        <img
          src={`${teamMember.metadata.profile_photo.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
          alt={teamMember.metadata.full_name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        {/* Name and Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {teamMember.metadata.full_name}
        </h3>
        <p className="text-primary-600 font-medium mb-2">
          {teamMember.metadata.job_title}
        </p>
        
        {/* Department Badge */}
        {teamMember.metadata.department && (
          <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {teamMember.metadata.department.value}
          </div>
        )}

        {/* Bio */}
        {teamMember.metadata.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-4">
            {teamMember.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {teamMember.metadata.linkedin_url && (
            <a
              href={teamMember.metadata.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-100 hover:text-primary-600 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {teamMember.metadata.twitter_handle && (
            <a
              href={`https://twitter.com/${teamMember.metadata.twitter_handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-100 hover:text-primary-600 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}