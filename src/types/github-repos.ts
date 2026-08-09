export interface AddedByInfo {
  name?: string
  url?: string
}

export interface GithubRepoBase {
  name: string
  description: string
  category: string
  repo_url: string
  owner: string
  repo_name: string
  website: string
  twitter: string
  instagram: string
  discord: string
  added_by?: AddedByInfo
}

export interface GithubRepoRequest extends GithubRepoBase {}

export interface GithubRepoResponse extends GithubRepoBase {
  _id: string
  created_at?: string
}