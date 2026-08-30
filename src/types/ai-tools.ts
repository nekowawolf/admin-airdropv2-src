export interface AIToolsMedia {
  video_url?: string
  screenshot_urls?: string[]
}

export interface AIToolsSocials {
  twitter?: string
  instagram?: string
  discord?: string
  youtube?: string
}

export interface AIToolsBase {
  name: string
  description: string
  image_url: string
  website: string
  categories: string[]
  media: AIToolsMedia
  socials: AIToolsSocials
}

export interface AIToolsRequest extends AIToolsBase {}

export interface AIToolsResponse extends AIToolsBase {
  _id: string
  created_at?: string
}