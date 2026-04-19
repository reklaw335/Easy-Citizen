'use client'

import { useQuery } from '@tanstack/react-query'
import { getVotes } from '@/lib/votesmart'
import type { Representative } from '@/types/representative'

interface Props { rep: Representative }

const VOTE_COLORS: Record<string, string> = {
  Yea: 'text-green-700 bg-green-50',
  Yes: 'text-green-700 bg-green-50',
  Nay: 'text-red-700 bg-red-50',
  No: 'text-red-700 bg-red-50',
  Abstain: 'text-yellow-700 bg-yellow-50',
  'Not Voting': 'text-gray-500 bg-gray-50',
  Present: 'text-blue-700 bg-blue-50',
}

export default function VotingHistoryTab({ rep }: Props) {
  const { data: votes = [], isLoading, error } = useQuery({
    queryKey: ['votes', rep.candidateId],
    queryFn: () => getVotes(rep.candidateId),
  })

  if (isLoading) return <div className="p-6 text-gray-400 text-sm">Loading voting history...</div>
  if (error) return <div className="p-6 text-red-500 text-sm">Failed to load voting history.</div>
  if (votes.length === 0) return <div className="p-6 text-gray-400 text-sm">No voting records found.</div>

  return (
    <div className="p-4">
      <p className="text-xs text-gray-500 mb-3">{votes.length} votes found · Source: VoteSmart</p>
      <div className="space-y-2">
        {votes.map((vote, i) => {
          const colorClass = VOTE_COLORS[vote.vote] ?? 'text-gray-600 bg-gray-50'
          return (
            <div key={i} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    {vote.url ? (
                      <a href={vote.url} target="_blank" rel="noreferrer" className="hover:text-blue-700 hover:underline">
                        {vote.billTitle}
                      </a>
                    ) : vote.billTitle}
                  </p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>{vote.date}</span>
                    {vote.category && <span>{vote.category}</span>}
                    {vote.result && <span>Result: {vote.result}</span>}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded shrink-0 ${colorClass}`}>
                  {vote.vote}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
