export interface Representative {
  candidateId: string
  firstName: string
  lastName: string
  fullName: string
  party: string
  office: string
  district?: string
  stateId?: string
  stateName?: string
  photoUrl?: string
  level: 'federal' | 'state' | 'local'
}

export interface RepresentativeBio {
  candidateId: string
  firstName: string
  lastName: string
  fullName: string
  party: string
  photoUrl?: string
  birthDate?: string
  birthPlace?: string
  pronouns?: string
  education?: string[]
  offices?: Office[]
  phone?: string
  website?: string
  email?: string
}

export interface Office {
  title: string
  shortTitle?: string
  name: string
  type?: string
  status?: string
  district?: string
  stateId?: string
  firstElect?: string
  lastElect?: string
  termEnd?: string
}
