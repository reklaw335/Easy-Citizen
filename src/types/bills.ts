export interface Bill {
  billId: string
  title: string
  shortTitle?: string
  congressUrl?: string
  govtrackUrl?: string
  introducedDate: string
  primarySubject?: string
  status?: string
  latestMajorAction?: string
  latestMajorActionDate?: string
  active: boolean
}
