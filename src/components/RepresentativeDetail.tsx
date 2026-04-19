'use client'

import { useState } from 'react'
import type { Representative } from '@/types/representative'
import OverviewTab from './tabs/OverviewTab'
import VotingHistoryTab from './tabs/VotingHistoryTab'
import BillsTab from './tabs/BillsTab'
import FinanceTab from './tabs/FinanceTab'
import LobbyingTab from './tabs/LobbyingTab'

interface Props { rep: Representative }

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'votes', label: 'Voting History' },
  { id: 'bills', label: 'Bills' },
  { id: 'finance', label: 'Campaign Finance' },
  { id: 'lobbying', label: 'Interest Groups' },
] as const

type TabId = typeof TABS[number]['id']

export default function RepresentativeDetail({ rep }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-0 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-gray-900">{rep.fullName}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{rep.party} · {rep.office}{rep.stateId ? ` · ${rep.stateId}` : ''}</p>
        <div className="flex gap-1 mt-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab === 'overview' && <OverviewTab rep={rep} />}
        {activeTab === 'votes' && <VotingHistoryTab rep={rep} />}
        {activeTab === 'bills' && <BillsTab rep={rep} />}
        {activeTab === 'finance' && <FinanceTab rep={rep} />}
        {activeTab === 'lobbying' && <LobbyingTab rep={rep} />}
      </div>
    </div>
  )
}
