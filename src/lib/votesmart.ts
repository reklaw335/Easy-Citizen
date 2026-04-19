import type { Representative, RepresentativeBio } from '@/types/representative'
import type { VoteRecord } from '@/types/votes'
import type { InterestGroupRating } from '@/types/lobbying'

async function vs(endpoint: string, params: Record<string, string> = {}) {
  const q = new URLSearchParams({ endpoint, ...params })
  const res = await fetch(`/api/votesmart?${q.toString()}`)
  if (!res.ok) throw new Error(`VoteSmart request failed: ${res.status}`)
  return res.json()
}

export async function searchByName(lastName: string): Promise<Representative[]> {
  const data = await vs('Candidates.getByLastname', { lastName, stateId: '', office: '' })
  const candidates = data?.candidateList?.candidate
  if (!candidates) return []
  const list = Array.isArray(candidates) ? candidates : [candidates]
  return list.map(mapCandidate)
}

export async function searchByState(stateId: string): Promise<Representative[]> {
  const data = await vs('Officials.getStatewide', { stateId })
  const officials = data?.candidateList?.candidate
  if (!officials) return []
  const list = Array.isArray(officials) ? officials : [officials]
  return list.map(mapCandidate)
}

export async function getBio(candidateId: string): Promise<RepresentativeBio | null> {
  const data = await vs('CandidateBio.getBio', { candidateId })
  const bio = data?.bio
  if (!bio) return null
  const candidate = bio.candidate ?? {}
  const office = bio.office ?? {}
  return {
    candidateId: candidate.candidateId ?? candidateId,
    firstName: candidate.firstName ?? '',
    lastName: candidate.lastName ?? '',
    fullName: `${candidate.firstName ?? ''} ${candidate.lastName ?? ''}`.trim(),
    party: candidate.party ?? '',
    photoUrl: candidate.photo ? `https://static.votesmart.org/canphoto/${candidate.candidateId}.jpg` : undefined,
    birthDate: candidate.birthDate,
    birthPlace: candidate.birthPlace,
    education: candidate.education?.item
      ? (Array.isArray(candidate.education.item) ? candidate.education.item : [candidate.education.item]).map((e: Record<string, string>) => e.degree ?? e['#text'] ?? String(e))
      : [],
    offices: office.title
      ? [{
          title: office.title,
          name: office.name ?? '',
          district: office.district,
          stateId: office.stateId,
          firstElect: office.firstElect,
          termEnd: office.termEnd,
        }]
      : [],
    phone: candidate.phone,
    website: candidate.website,
    email: candidate.email,
  }
}

export async function getVotes(candidateId: string, category?: string): Promise<VoteRecord[]> {
  const params: Record<string, string> = { candidateId }
  if (category) params.category = category
  const data = await vs('Votes.getByOfficial', params)
  const bills = data?.bills?.bill
  if (!bills) return []
  const list = Array.isArray(bills) ? bills : [bills]
  return list.map((b: Record<string, string>) => ({
    billId: b.billId,
    billTitle: b.title ?? b.billNumber ?? 'Untitled Bill',
    description: b.title,
    date: b.date ?? '',
    vote: b.action ?? '',
    result: b.result,
    category: b.category,
    url: b.url,
  }))
}

export async function getRatings(candidateId: string): Promise<InterestGroupRating[]> {
  const data = await vs('Rating.getCandidateRating', { candidateId })
  const items = data?.candidateRating?.rating
  if (!items) return []
  const list = Array.isArray(items) ? items : [items]
  return list.map((r: Record<string, string>) => ({
    ratingId: r.ratingId ?? '',
    ratingName: r.ratingName ?? '',
    sigId: r.sigId ?? '',
    sigName: r.sigName ?? '',
    rating: r.rating ?? '',
    ratingText: r.ratingText,
    timespan: r.timespan,
  }))
}

function mapCandidate(c: Record<string, string>): Representative {
  const officeType = (c.officeTypeId ?? '').toUpperCase()
  const level = officeType === 'P' || officeType === 'C' || officeType === 'S'
    ? 'federal'
    : officeType === 'L'
      ? 'local'
      : 'state'
  return {
    candidateId: c.candidateId ?? '',
    firstName: c.firstName ?? '',
    lastName: c.lastName ?? '',
    fullName: `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim(),
    party: c.party ?? c.electionParties ?? '',
    office: c.officeName ?? c.office ?? '',
    district: c.officeDistrictName ?? c.district,
    stateId: c.stateId,
    stateName: c.stateName,
    level,
  }
}
