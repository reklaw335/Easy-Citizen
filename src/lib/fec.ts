import type { FinanceData, FinanceSummary, TopContributor } from '@/types/finance'

async function fec(path: string, params: Record<string, string> = {}) {
  const q = new URLSearchParams({ path, ...params })
  const res = await fetch(`/api/fec?${q.toString()}`)
  if (!res.ok) throw new Error(`FEC request failed: ${res.status}`)
  return res.json()
}

export async function findFecCandidate(name: string): Promise<string | null> {
  const data = await fec('/candidates/search/', { name, per_page: '5', sort: '-receipts' })
  const results: Array<{ candidate_id: string }> = data?.results ?? []
  return results[0]?.candidate_id ?? null
}

export async function getFinanceData(candidateId: string): Promise<FinanceData> {
  const [totalsData, contributorsData] = await Promise.all([
    fec(`/candidate/${candidateId}/totals/`, { per_page: '6', sort: '-cycle' }),
    fec('/schedules/schedule_a/', {
      candidate_id: candidateId,
      per_page: '10',
      sort: '-contribution_receipt_amount',
    }),
  ])

  const summaries: FinanceSummary[] = (totalsData?.results ?? []).map(
    (r: Record<string, number>) => ({
      cycle: r.cycle,
      totalRaised: r.receipts ?? 0,
      totalSpent: r.disbursements ?? 0,
      cashOnHand: r.cash_on_hand_end_period,
      debts: r.debts_owed_by_committee,
      individualContributions: r.individual_contributions ?? 0,
      pacContributions: r.other_political_committee_contributions ?? 0,
      otherContributions:
        (r.receipts ?? 0) -
        (r.individual_contributions ?? 0) -
        (r.other_political_committee_contributions ?? 0),
      partyContributions: r.party_full ?? 0,
    })
  )

  const topContributors: TopContributor[] = (contributorsData?.results ?? []).map(
    (r: Record<string, string | number>) => ({
      name: String(r.contributor_name ?? r.contributor_employer ?? 'Unknown'),
      total: Number(r.contribution_receipt_amount ?? 0),
      employer: r.contributor_employer as string | undefined,
      occupation: r.contributor_occupation as string | undefined,
    })
  )

  return { summary: summaries, topContributors }
}
