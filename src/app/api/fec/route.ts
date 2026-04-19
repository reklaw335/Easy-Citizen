import { NextRequest, NextResponse } from 'next/server'
import {
  MOCK_FEC_SEARCH,
  MOCK_FEC_TOTALS,
  MOCK_FEC_CONTRIBUTORS,
} from '@/lib/mockData'

const BASE = 'https://api.open.fec.gov/v1'
const KEY = process.env.FEC_API_KEY?.trim() || ''

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  if (!path) {
    return NextResponse.json({ error: 'Missing path param' }, { status: 400 })
  }

  if (!KEY) {
    return NextResponse.json(mockFec(path, searchParams))
  }

  const params = new URLSearchParams()
  searchParams.forEach((value, key) => {
    if (key !== 'path') params.set(key, value)
  })
  params.set('api_key', KEY)

  const url = `${BASE}${path}?${params.toString()}`
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) {
    return NextResponse.json({ error: `FEC error: ${res.status}` }, { status: res.status })
  }

  return NextResponse.json(await res.json())
}

function mockFec(path: string, _params: URLSearchParams) {
  if (path.includes('/candidates/search')) {
    return MOCK_FEC_SEARCH['default']
  }
  const totalsMatch = path.match(/\/candidate\/([^/]+)\/totals/)
  if (totalsMatch) {
    const id = totalsMatch[1]
    return MOCK_FEC_TOTALS[id] ?? MOCK_FEC_TOTALS['H2TX18000']
  }
  if (path.includes('/schedule_a')) {
    const candidateId = _params.get('candidate_id') ?? 'H2TX18000'
    return MOCK_FEC_CONTRIBUTORS[candidateId] ?? MOCK_FEC_CONTRIBUTORS['H2TX18000']
  }
  return { results: [] }
}
