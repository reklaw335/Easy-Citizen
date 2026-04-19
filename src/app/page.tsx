import Dashboard from '@/components/Dashboard'

export default function Page() {
  const isDemoMode =
    !process.env.VOTESMART_API_KEY?.trim() &&
    !process.env.FEC_API_KEY?.trim() &&
    !process.env.PROPUBLICA_API_KEY?.trim()

  return <Dashboard isDemoMode={isDemoMode} />
}
