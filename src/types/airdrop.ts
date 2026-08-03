export interface AirdropBase {
  _id?: string
  name: string
  task: string
  website: string
  level: string
  status: string
  backed: string
  funds: string
  supply: string
  fdv: string
  market_cap: string
  is_vesting: boolean
  is_paid: boolean
  claim_url: string
  price: number
  usd_income: number
  discord: string
  twitter: string
  telegram: string
  image_url: string
  description: string
  guide_url: string
  created_at?: string
  ended_at?: string
}

export interface AirdropFormData extends AirdropBase {}

export interface AirdropRequest extends AirdropBase {}
