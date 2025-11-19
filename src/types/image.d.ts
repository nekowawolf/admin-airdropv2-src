export interface Image {
  _id?: string;
  filename: string;
  url: string;
  sha: string;
  path: string;
}

export interface ImageRequest {
  filename: string;
  url: string;
  sha: string;
  path: string;
}