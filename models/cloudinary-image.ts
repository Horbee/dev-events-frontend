export interface CloudinaryImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    large?: CloudinaryImageFormat;
    medium?: CloudinaryImageFormat;
    small?: CloudinaryImageFormat;
    thumbnail: CloudinaryImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  created_at: string;
  updated_at: string;
}

interface CloudinaryImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}
