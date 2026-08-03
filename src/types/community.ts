export interface CommunityBase {
  name: string
  platforms: string
  category: string
  image_url: string
  link: string
}

export interface CommunityRequest extends CommunityBase {}
