'use client'

import { useQuery } from '@tanstack/react-query'
import { getBio } from '@/lib/votesmart'
import type { Representative } from '@/types/representative'

interface Props {
  rep: Representative
}

export default function OverviewTab({ rep }: Props) {
  const { data: bio, isLoading, error } = useQuery({
    queryKey: ['bio', rep.candidateId],
    queryFn: () => getBio(rep.candidateId),
  })

  if (isLoading) return <div className="p-6 text-gray-400 text-sm">Loading profile...</div>
  if (error) return <div className="p-6 text-red-500 text-sm">Failed to load profile.</div>
  if (!bio) return <div className="p-6 text-gray-400 text-sm">No profile data available.</div>

  return (
    <div className="p-6 space-y-5">
      <div className="flex gap-5 items-start">
        {bio.photoUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={bio.photoUrl}
            alt={bio.fullName}
            className="w-24 h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{bio.fullName}</h2>
          <p className="text-sm text-gray-600 mt-0.5">{bio.party}</p>
          {bio.offices?.[0] && (
            <p className="text-sm text-blue-700 font-medium mt-1">{bio.offices[0].title} — {bio.offices[0].name}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {bio.birthDate && <InfoRow label="Born" value={bio.birthDate} />}
        {bio.birthPlace && <InfoRow label="Birthplace" value={bio.birthPlace} />}
        {bio.offices?.[0]?.stateId && <InfoRow label="State" value={bio.offices[0].stateId!} />}
        {bio.offices?.[0]?.district && <InfoRow label="District" value={bio.offices[0].district!} />}
        {bio.offices?.[0]?.firstElect && <InfoRow label="First Elected" value={bio.offices[0].firstElect!} />}
        {bio.offices?.[0]?.termEnd && <InfoRow label="Term Ends" value={bio.offices[0].termEnd!} />}
      </div>

      {bio.education && bio.education.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Education</h3>
          <ul className="space-y-1">
            {bio.education.map((e, i) => (
              <li key={i} className="text-sm text-gray-700">{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Contact</h3>
        <div className="space-y-1">
          {bio.phone && <InfoRow label="Phone" value={bio.phone} />}
          {bio.email && <InfoRow label="Email" value={bio.email} />}
          {bio.website && (
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500 w-20 shrink-0">Website</span>
              <a href={bio.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                {bio.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-500 w-24 shrink-0">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  )
}
