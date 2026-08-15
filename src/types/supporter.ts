export interface SupporterResponse {
  _id: string;
  name: string;
  url: string;
  platform: string;
  amount: number;
  created_at?: string;
}

export interface SupportRequestResponse {
  _id: string;
  name: string;
  url: string;
  platform: string;
  created_at?: string;
}