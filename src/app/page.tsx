import { Gallery } from "@/components/gallery/Gallery";
import { StructuredData } from "@/components/seo/StructuredData";
import { GalleryData } from "@/types/gallery";

async function getGalleryData(): Promise<GalleryData> {
  try {
    // Import the JSON data directly for static builds
    const data = await import('../../public/data/images.json');
    return data.default as GalleryData;
  } catch (error) {
    console.error('Error loading gallery data:', error);
    // Return fallback data
    return {
      images: [],
      tags: [],
      metadata: {
        version: "1.0",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalImages: 0,
        totalTags: 0
      }
    };
  }
}

export default async function Home() {
  const galleryData = await getGalleryData();

  return (
    <>
      <StructuredData data={galleryData} />
      <Gallery data={galleryData} />
    </>
  );
}