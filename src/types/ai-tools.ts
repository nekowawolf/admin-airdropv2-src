export interface AIToolsBase {
  name: string
  description: string
  categories: string[]
  video_url: string
  image_url: string
  website: string
  twitter: string
  instagram: string
  discord: string
  youtube: string
}

export interface AIToolsRequest extends AIToolsBase {}

export interface AIToolsResponse extends AIToolsBase {
  _id: string
}
