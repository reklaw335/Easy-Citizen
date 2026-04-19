import { NextRequest, NextResponse } from 'next/server'
import {
  MOCK_SEARCH_RESULTS,
  MOCK_BIO,
  MOCK_VOTES,
  MOCK_RATINGS,
} from '@/lib/mockData'

const BASE = 'https://api.votesmart.org'
const KEY = process.env.VOTESMART_API_KEY?.trim() || ''

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const endpoint = searchParams.get('endpoint')
  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint param' }, { status: 400 })
  }

  if (!KEY) {
    return NextResponse.json(mockVoteSmart(endpoint, searchParams))
  }

  const params = new URLSearchParams()
  searchParams.forEach((value, key) => {
    if (key !== 'endpoint') params.set(key, value)
  })
  params.set('key', KEY)
  params.set('o', 'JSON')

  const url = `${BASE}/${endpoint}?${params.toString()}`
  const res = await fetch(url, { next: { revalidate: 300 } })

  if (!res.ok) {
    return NextResponse.json({ error: `VoteSmart error: ${res.status}` }, { status: res.status })
  }

  return NextResponse.json(await res.json())
}

function mockVoteSmart(endpoint: string, params: URLSearchParams) {
  const candidateId = params.get('candidateId') ?? '9490'

  if (endpoint.startsWith('Candidates') || endpoint.startsWith('Officials')) {
    return MOCK_SEARCH_RESULTS
  }
  if (endpoint.startsWith('CandidateBio')) {
    return MOCK_BIO[candidateId] ?? MOCK_BIO['9490']
  }
  if (endpoint.startsWith('Votes')) {
    return MOCK_VOTES[candidateId] ?? MOCK_VOTES['9490']
  }
  if (endpoint.startsWith('Rating')) {
    return MOCK_RATINGS[candidateId] ?? MOCK_RATINGS['9490']
  }
  return {}
}
