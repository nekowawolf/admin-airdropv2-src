export interface NetMedia {
  video_url?: string
  screenshot_urls?: string[]
}

export interface NetSocials {
  twitter?: string
  instagram?: string
  discord?: string
  youtube?: string
}

export interface NetBase {
  name: string
  description: string
  image_url: string
  website: string
  categories: string[]
  media: NetMedia
  socials: NetSocials
}

export interface NetRequest extends NetBase {}

export interface NetResponse extends NetBase {
  _id: string
  created_at?: string
}