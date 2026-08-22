export interface Image {
  _id?: string;
  filename: string;
  url: string;
  size?: number;
  content_type?: string;
  media_type?: string;
  r2_key?: string;
  created_at?: string;
}

export interface ImageRequest {
  filename: string;
  url: string;
  size?: number;
  content_type?: string;
  media_type?: string;
  r2_key?: string;
}