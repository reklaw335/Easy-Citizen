export interface FinanceSummary {
  candidateId?: string
  name?: string
  cycle?: number
  totalRaised: number
  totalSpent: number
  cashOnHand?: number
  debts?: number
  individualContributions: number
  pacContributions: number
  otherContributions: number
  partyContributions?: number
}

export interface TopContributor {
  name: string
  total: number
  count?: number
  employer?: string
  occupation?: string
}

export interface FinanceData {
  summary: FinanceSummary[]
  topContributors: TopContributor[]
}
