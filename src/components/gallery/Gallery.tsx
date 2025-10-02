"use client";

import { useState, useEffect, useMemo, memo } from "react";
import Link from "next/link";
import { ImageCard } from "./ImageCard";
import { TagFilter } from "./TagFilter";
import { ImageModal } from "./ImageModal";
import { useToast } from "@/components/ui/toast";
import { GalleryData, Image as ImageType } from "@/types/gallery";

interface GalleryProps {
  data: GalleryData;
}

export const Gallery = memo(function Gallery({ data }: GalleryProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ToastContainer } = useToast();

  // 선택된 동네에 따라 이미지 필터링
  const filteredImages = useMemo(() => {
    if (selectedTags.length === 0) {
      return data.images;
    }
    return data.images.filter(image =>
      selectedTags.some(tag => image.tags.includes(tag))
    );
  }, [data.images, selectedTags]);

  // 각 동네별 이미지 개수 계산
  const imageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    data.tags.forEach(tag => {
      counts[tag.name] = data.images.filter(image => 
        image.tags.includes(tag.name)
      ).length;
    });
    
    return counts;
  }, [data.images, data.tags]);

  // 동네 선택 핸들러
  const handleTagSelect = (tag: string) => {
    if (tag === "all") {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => {
        if (prev.includes(tag)) {
          return prev.filter(t => t !== tag);
        } else {
          return [...prev, tag];
        }
      });
    }
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (image: ImageType) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImageIndex(-1), 300);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (newIndex: number) => {
    setSelectedImageIndex(newIndex);
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <Link 
                  href="https://localmap.cc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  동네지도
                </Link>
              </h1>
              <p className="text-sm text-gray-600 mt-1" role="doc-subtitle">
                네이버지도에는 없는 진짜 동네지도
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1" role="complementary" aria-label="동네 필터 옵션">
            <TagFilter
              tags={data.tags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              imageCounts={imageCounts}
            />
          </aside>

          {/* Gallery Grid */}
          <section className="lg:col-span-3" role="region" aria-label="이미지 갤러리">
            {filteredImages.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  이미지가 없습니다
                </h3>
                <p className="text-gray-600">
                  선택한 동네에 해당하는 이미지가 없습니다.
                </p>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    {selectedTags.length === 0 ? "전체" :
                     selectedTags.length === 1 ? `${selectedTags[0]} 태그의 이미지` :
                     `선택된 ${selectedTags.length}개 태그의 이미지`}{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredImages.length}개
                    </span>
                  </p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="grid" aria-label={`${filteredImages.length}개의 이미지`}>
                  {filteredImages.map((image, index) => (
                    <article key={image.id} role="gridcell">
                      <ImageCard
                        image={image}
                        onClick={() => handleImageClick(image)}
                        priority={index < 2} // 처음 2개 이미지만 우선 로드, 나머지는 lazy loading
                      />
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* Image Modal */}
      <ImageModal
        images={filteredImages}
        currentIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onImageChange={handleImageChange}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
});
