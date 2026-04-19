'use client'

import type { Representative } from '@/types/representative'

interface Props {
  representatives: Representative[]
  selectedId: string | null
  onSelect: (rep: Representative) => void
  loading?: boolean
  error?: string | null
}

const PARTY_COLORS: Record<string, string> = {
  Democrat: 'bg-blue-100 text-blue-800',
  Democratic: 'bg-blue-100 text-blue-800',
  Republican: 'bg-red-100 text-red-800',
  Independent: 'bg-purple-100 text-purple-800',
  Libertarian: 'bg-yellow-100 text-yellow-800',
}

const LEVEL_LABELS: Record<string, string> = {
  federal: 'Federal',
  state: 'State',
  local: 'Local',
}

function partyBadge(party: string) {
  const cls = PARTY_COLORS[party] ?? 'bg-gray-100 text-gray-700'
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{party || 'N/A'}</span>
}

export default function RepresentativeList({ representatives, selectedId, onSelect, loading, error }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
        Searching...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm">
        {error}
      </div>
    )
  }

  if (representatives.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
        Search to find representatives
      </div>
    )
  }

  return (
    <ul className="overflow-y-auto flex-1">
      {representatives.map((rep) => (
        <li key={rep.candidateId}>
          <button
            onClick={() => onSelect(rep)}
            className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors ${
              selectedId === rep.candidateId ? 'bg-blue-50 border-l-4 border-l-blue-700' : ''
            }`}
          >
            <div className="font-medium text-sm text-gray-900">{rep.fullName}</div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {partyBadge(rep.party)}
              <span className="text-xs text-gray-500">
                {LEVEL_LABELS[rep.level]} {rep.stateId ? `· ${rep.stateId}` : ''}
              </span>
            </div>
            {rep.office && (
              <div className="text-xs text-gray-500 mt-0.5 truncate">{rep.office}</div>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
