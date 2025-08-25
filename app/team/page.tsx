import { Metadata } from 'next'
import { getAllTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'Our Team - Velocity Creative Labs',
  description: 'Meet the talented team behind Velocity Creative Labs. Experts in engineering, design, marketing, and leadership.',
}

export const revalidate = 3600

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers()

  // Group team members by department
  const departmentGroups = teamMembers.reduce((groups, member) => {
    const department = member.metadata.department?.value || 'Other'
    if (!groups[department]) {
      groups[department] = []
    }
    groups[department].push(member)
    return groups
  }, {} as Record<string, typeof teamMembers>)

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto container-padding py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            We're a diverse group of passionate professionals dedicated to delivering 
            innovative solutions and exceptional results for our clients.
          </p>
        </div>

        {/* Team Members by Department */}
        {Object.entries(departmentGroups).map(([department, members]) => (
          <div key={department} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {department}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <TeamMemberCard key={member.id} teamMember={member} />
              ))}
            </div>
          </div>
        ))}

        {teamMembers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Team information coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}