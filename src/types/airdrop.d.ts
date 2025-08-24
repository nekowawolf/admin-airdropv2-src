export interface AirdropFormData {
  name: string
  task: string
  link: string
  level: string
  status: string
  backed: string
  funds: string
  supply: string
  market_cap: string
  price: string
  vesting: string
  usd_income: string
  claim: string
}

export interface AirdropRequest {
  name: string
  task: string
  link: string
  level: string
  status: string
  backed: string
  funds: string
  supply: string
  market_cap: string
  vesting: string
  link_claim: string
  price: number
  usd_income: number
}

export interface AirdropFreeRequest {
  name: string;
  task: string;
  link: string;
  level: string;
  status: string;
  backed: string;
  funds: string;
  supply: string;
  market_cap: string;
  vesting: string;
  link_claim: string;
  price: number;
  usd_income: number;
}

export interface AirdropPaidRequest {
  name: string;
  task: string;
  link: string;
  level: string;
  status: string;
  backed: string;
  funds: string;
  supply: string;
  market_cap: string;
  vesting: string;
  link_claim: string;
  price: number;
  usd_income: number;
}