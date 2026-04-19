'use client'

import { useState, FormEvent } from 'react'

interface Props {
  onSearch: (query: string, type: 'name' | 'state') => void
  loading?: boolean
}

const STATES = [
  ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],
  ['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],
  ['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],
  ['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],
  ['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],
  ['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],
  ['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],
  ['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],
  ['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],
  ['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming'],
]

export default function SearchBar({ onSearch, loading }: Props) {
  const [mode, setMode] = useState<'name' | 'state'>('name')
  const [nameQuery, setNameQuery] = useState('')
  const [stateId, setStateId] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (mode === 'name' && nameQuery.trim()) {
      onSearch(nameQuery.trim(), 'name')
    } else if (mode === 'state' && stateId) {
      onSearch(stateId, 'state')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200 bg-white">
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode('name')}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            mode === 'name'
              ? 'bg-blue-700 text-white border-blue-700'
              : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
          }`}
        >
          By Name
        </button>
        <button
          type="button"
          onClick={() => setMode('state')}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            mode === 'state'
              ? 'bg-blue-700 text-white border-blue-700'
              : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
          }`}
        >
          By State
        </button>
      </div>

      {mode === 'name' ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            placeholder="Search by last name..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !nameQuery.trim()}
            className="px-4 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a state...</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading || !stateId}
            className="px-4 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>
      )}
    </form>
  )
}
