export type LandingPage = {
  createdAt?: string
  updatedAt?: string
  _id?: string
  title?: string
  url?: string
  expired?: string
  user?: {
    id: string
  }
  status: string
  visitor: number,
  convert: number,
  percentConvert: number,
  revenue: number
}

export type LandingPageCreate = {
  expired?: string
  ldpId?: string
  title?: string
  user?: {
    id: string
  }
  status: string
}

export type ListLandingPages = {
  status: boolean
  data?: LandingPage[]
}

export type LandingPageCreated = {
  status: boolean
  data?: LandingPageCreate
}
export type LandingPageT = {
  listLandingPage: ListLandingPages
  landingPageCreated: LandingPageCreated
}
