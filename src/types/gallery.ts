export interface Image {
  id: number;
  filename: string;
  title: string;
  description?: string;
  tags: string[];
}

export interface Tag {
  name: string;
  description: string;
  color: string;
}

export interface GalleryData {
  images: Image[];
  tags: Tag[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalImages: number;
    totalTags: number;
  };
}
