'use client'

import { useQuery } from '@tanstack/react-query'
import { findMemberId, getSponsoredBills } from '@/lib/propublica'
import type { Representative } from '@/types/representative'

interface Props { rep: Representative }

export default function BillsTab({ rep }: Props) {
  if (rep.level !== 'federal') {
    return (
      <div className="p-6 text-gray-500 text-sm">
        <p className="font-medium">Federal data only</p>
        <p className="mt-1">Bill sponsorship data via ProPublica is available for U.S. Congress members only.</p>
      </div>
    )
  }

  return <BillsContent name={rep.fullName} />
}

function BillsContent({ name }: { name: string }) {
  const { data: memberId, isLoading: idLoading } = useQuery({
    queryKey: ['ppMemberId', name],
    queryFn: () => findMemberId(name),
  })

  const { data: bills = [], isLoading: billsLoading, error } = useQuery({
    queryKey: ['bills', memberId],
    queryFn: () => getSponsoredBills(memberId!),
    enabled: !!memberId,
  })

  if (idLoading || billsLoading) return <div className="p-6 text-gray-400 text-sm">Loading bills...</div>
  if (error) return <div className="p-6 text-red-500 text-sm">Failed to load bills.</div>
  if (!memberId) return <div className="p-6 text-gray-400 text-sm">Member not found in ProPublica database.</div>
  if (bills.length === 0) return <div className="p-6 text-gray-400 text-sm">No sponsored bills found.</div>

  return (
    <div className="p-4">
      <p className="text-xs text-gray-500 mb-3">{bills.length} bills · Source: ProPublica Congress</p>
      <div className="space-y-2">
        {bills.map((bill) => (
          <div key={bill.billId} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {bill.congressUrl ? (
                    <a href={bill.congressUrl} target="_blank" rel="noreferrer" className="hover:text-blue-700 hover:underline">
                      {bill.shortTitle || bill.title}
                    </a>
                  ) : (bill.shortTitle || bill.title)}
                </p>
                {bill.shortTitle && bill.shortTitle !== bill.title && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{bill.title}</p>
                )}
                <div className="flex gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                  <span>Introduced: {bill.introducedDate}</span>
                  {bill.primarySubject && <span>{bill.primarySubject}</span>}
                  {bill.latestMajorAction && (
                    <span className="truncate max-w-xs">{bill.latestMajorAction}</span>
                  )}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded shrink-0 ${bill.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {bill.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
