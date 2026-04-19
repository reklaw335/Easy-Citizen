'use client'

import { useState } from 'react'
import QueryProvider from './QueryProvider'
import SearchBar from './SearchBar'
import RepresentativeList from './RepresentativeList'
import RepresentativeDetail from './RepresentativeDetail'
import { searchByName, searchByState } from '@/lib/votesmart'
import type { Representative } from '@/types/representative'

interface Props {
  isDemoMode: boolean
}

export default function Dashboard({ isDemoMode }: Props) {
  return (
    <QueryProvider>
      <DashboardInner isDemoMode={isDemoMode} />
    </QueryProvider>
  )
}

function DashboardInner({ isDemoMode }: Props) {
  const [results, setResults] = useState<Representative[]>([])
  const [selected, setSelected] = useState<Representative | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(query: string, type: 'name' | 'state') {
    setLoading(true)
    setError(null)
    setSelected(null)
    try {
      const reps = type === 'name'
        ? await searchByName(query)
        : await searchByState(query)
      setResults(reps)
      if (reps.length === 0) setError('No representatives found. Try a different search.')
    } catch {
      setError('Search failed. Please check your API key configuration.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-blue-900 text-white px-6 py-3 flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-900 font-bold text-xs">EC</span>
        </div>
        <span className="font-semibold tracking-wide">Easy Citizen</span>
        <span className="text-blue-300 text-sm ml-2">Elected Representative Lookup</span>
        {isDemoMode && (
          <span className="ml-auto text-xs bg-yellow-400 text-yellow-900 font-semibold px-2 py-0.5 rounded">
            DEMO MODE — sample data
          </span>
        )}
      </header>

      {isDemoMode && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2 text-xs text-yellow-800">
          No API keys configured. Showing sample data. Search for &quot;Smith&quot; or any state to see demo results.
          Add your keys to <code className="font-mono bg-yellow-100 px-1 rounded">.env.local</code> to use live data.
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 flex flex-col border-r border-gray-200 bg-white">
          <SearchBar onSearch={handleSearch} loading={loading} />
          <RepresentativeList
            representatives={results}
            selectedId={selected?.candidateId ?? null}
            onSelect={setSelected}
            loading={loading}
            error={error}
          />
          {results.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
              {results.length} results
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-hidden">
          {selected ? (
            <RepresentativeDetail rep={selected} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <svg className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">Search for a representative and select one to view their profile</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
