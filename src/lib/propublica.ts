import type { Bill } from '@/types/bills'
import type { VoteRecord } from '@/types/votes'

async function pp(path: string) {
  const q = new URLSearchParams({ path })
  const res = await fetch(`/api/propublica?${q.toString()}`)
  if (!res.ok) throw new Error(`ProPublica request failed: ${res.status}`)
  return res.json()
}

export async function findMemberId(name: string): Promise<string | null> {
  const data = await pp(`/members/search.json?name=${encodeURIComponent(name)}`)
  const results = data?.results?.[0]?.members ?? []
  return results[0]?.member_id ?? null
}

export async function getSponsoredBills(memberId: string): Promise<Bill[]> {
  const data = await pp(`/members/${memberId}/bills/introduced.json`)
  const bills = data?.results?.[0]?.bills ?? []
  return bills.map((b: Record<string, string>) => ({
    billId: b.bill_id ?? '',
    title: b.title ?? '',
    shortTitle: b.short_title,
    congressUrl: b.congressdotgov_url,
    introducedDate: b.introduced_date ?? '',
    primarySubject: b.primary_subject,
    status: b.bill_type,
    latestMajorAction: b.latest_major_action,
    latestMajorActionDate: b.latest_major_action_date,
    active: b.active === 'true' || b.active === true,
  }))
}

export async function getMemberVotes(memberId: string): Promise<VoteRecord[]> {
  const data = await pp(`/members/${memberId}/votes.json`)
  const votes = data?.results?.[0]?.votes ?? []
  return votes.map((v: Record<string, string>) => ({
    billId: v.bill?.bill_id,
    billTitle: v.bill?.title ?? v.description ?? 'Vote',
    description: v.description,
    date: v.date ?? '',
    vote: v.position ?? '',
    result: v.result,
  }))
}
