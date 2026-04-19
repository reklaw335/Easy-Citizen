import { NextRequest, NextResponse } from 'next/server'
import {
  MOCK_PROPUBLICA_SEARCH,
  MOCK_PROPUBLICA_BILLS,
  MOCK_PROPUBLICA_VOTES,
} from '@/lib/mockData'

const BASE = 'https://api.propublica.org/congress/v1'
const KEY = process.env.PROPUBLICA_API_KEY?.trim() || ''

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  if (!path) {
    return NextResponse.json({ error: 'Missing path param' }, { status: 400 })
  }

  if (!KEY) {
    return NextResponse.json(mockProPublica(path))
  }

  const params = new URLSearchParams()
  searchParams.forEach((value, key) => {
    if (key !== 'path') params.set(key, value)
  })

  const url = `${BASE}${path}?${params.toString()}`
  const res = await fetch(url, {
    headers: { 'X-API-Key': KEY },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return NextResponse.json({ error: `ProPublica error: ${res.status}` }, { status: res.status })
  }

  return NextResponse.json(await res.json())
}

function mockProPublica(path: string) {
  if (path.includes('/members/search')) {
    return MOCK_PROPUBLICA_SEARCH['default']
  }
  const billsMatch = path.match(/\/members\/([^/]+)\/bills/)
  if (billsMatch) {
    return MOCK_PROPUBLICA_BILLS[billsMatch[1]] ?? MOCK_PROPUBLICA_BILLS['S000001']
  }
  const votesMatch = path.match(/\/members\/([^/]+)\/votes/)
  if (votesMatch) {
    return MOCK_PROPUBLICA_VOTES[votesMatch[1]] ?? MOCK_PROPUBLICA_VOTES['S000001']
  }
  return { results: [] }
}
