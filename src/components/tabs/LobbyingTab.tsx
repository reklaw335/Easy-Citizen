'use client'

import { useQuery } from '@tanstack/react-query'
import { getRatings } from '@/lib/votesmart'
import type { Representative } from '@/types/representative'

interface Props { rep: Representative }

function ratingColor(rating: string): string {
  const n = parseInt(rating, 10)
  if (isNaN(n)) return 'bg-gray-100 text-gray-700'
  if (n >= 75) return 'bg-green-100 text-green-800'
  if (n >= 40) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

export default function LobbyingTab({ rep }: Props) {
  const { data: ratings = [], isLoading, error } = useQuery({
    queryKey: ['ratings', rep.candidateId],
    queryFn: () => getRatings(rep.candidateId),
  })

  if (isLoading) return <div className="p-6 text-gray-400 text-sm">Loading interest group ratings...</div>
  if (error) return <div className="p-6 text-red-500 text-sm">Failed to load ratings.</div>
  if (ratings.length === 0) return (
    <div className="p-6 text-gray-400 text-sm">
      No interest group ratings found for this representative.
    </div>
  )

  return (
    <div className="p-4">
      <p className="text-xs text-gray-500 mb-1">{ratings.length} ratings · Source: VoteSmart</p>
      <p className="text-xs text-gray-400 mb-4">Scores show how interest groups rate this official (0–100 or letter grade)</p>
      <div className="space-y-2">
        {ratings.map((r) => (
          <div key={r.ratingId} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{r.sigName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.ratingName}</p>
                {r.timespan && <p className="text-xs text-gray-400 mt-0.5">{r.timespan}</p>}
                {r.ratingText && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{r.ratingText}</p>
                )}
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded shrink-0 ${ratingColor(r.rating)}`}>
                {r.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
