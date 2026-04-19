'use client'

import { useQuery } from '@tanstack/react-query'
import { findFecCandidate, getFinanceData } from '@/lib/fec'
import type { Representative } from '@/types/representative'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

interface Props { rep: Representative }

const PIE_COLORS = ['#1d4ed8', '#7c3aed', '#6b7280']
const fmt = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1_000).toFixed(0)}K`

export default function FinanceTab({ rep }: Props) {
  if (rep.level !== 'federal') {
    return (
      <div className="p-6 text-gray-500 text-sm">
        <p className="font-medium">Federal data only</p>
        <p className="mt-1">Campaign finance data via FEC is available for federal candidates only.</p>
      </div>
    )
  }

  return <FinanceContent name={rep.fullName} />
}

function FinanceContent({ name }: { name: string }) {
  const { data: candidateId, isLoading: idLoading } = useQuery({
    queryKey: ['fecId', name],
    queryFn: () => findFecCandidate(name),
  })

  const { data: finance, isLoading: finLoading, error } = useQuery({
    queryKey: ['finance', candidateId],
    queryFn: () => getFinanceData(candidateId!),
    enabled: !!candidateId,
  })

  if (idLoading || finLoading) return <div className="p-6 text-gray-400 text-sm">Loading finance data...</div>
  if (error) return <div className="p-6 text-red-500 text-sm">Failed to load finance data.</div>
  if (!candidateId) return <div className="p-6 text-gray-400 text-sm">Candidate not found in FEC database.</div>
  if (!finance || finance.summary.length === 0) return <div className="p-6 text-gray-400 text-sm">No finance records found.</div>

  const latest = finance.summary[0]
  const pieData = [
    { name: 'Individual', value: latest.individualContributions },
    { name: 'PAC', value: latest.pacContributions },
    { name: 'Other', value: Math.max(0, latest.otherContributions) },
  ].filter(d => d.value > 0)

  const barData = [...finance.summary].reverse().map(s => ({
    cycle: s.cycle,
    Raised: s.totalRaised,
    Spent: s.totalSpent,
  }))

  return (
    <div className="p-4 space-y-6">
      <p className="text-xs text-gray-500">Source: FEC OpenFEC · Most recent cycle first</p>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total Raised" value={fmt(latest.totalRaised)} color="text-blue-700" />
        <StatCard label="Total Spent" value={fmt(latest.totalSpent)} color="text-purple-700" />
        {latest.cashOnHand != null && <StatCard label="Cash on Hand" value={fmt(latest.cashOnHand)} color="text-green-700" />}
      </div>

      {barData.length > 1 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Fundraising by Cycle</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} margin={{ left: 10, right: 10 }}>
              <XAxis dataKey="cycle" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={fmt} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Bar dataKey="Raised" fill="#1d4ed8" radius={[3,3,0,0]} />
              <Bar dataKey="Spent" fill="#7c3aed" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {pieData.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Funding Sources (Latest Cycle)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {finance.topContributors.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Top Contributors</h3>
          <div className="space-y-2">
            {finance.topContributors.slice(0, 10).map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                <div>
                  <span className="font-medium text-gray-800">{c.name}</span>
                  {c.employer && c.employer !== c.name && (
                    <span className="text-xs text-gray-500 ml-2">{c.employer}</span>
                  )}
                </div>
                <span className="text-blue-700 font-medium">{fmt(c.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="border border-gray-100 rounded-lg p-3 text-center">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}
