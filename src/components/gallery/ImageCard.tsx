"use client";

import { useState, memo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageType } from "@/types/gallery";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: ImageType;
  onClick: () => void;
  priority?: boolean;
}

export const ImageCard = memo(function ImageCard({ image, onClick, priority = false }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // priority가 true면 즉시 로드
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer로 lazy loading 구현
  useEffect(() => {
    if (priority) return; // priority가 true면 관찰하지 않음

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // 한 번 로드되면 관찰 중지
          }
        });
      },
      {
        rootMargin: '50px', // 50px 전에 로드 시작
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <Card
      ref={cardRef}
      className="group cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          {!hasError ? (
            <>
              {(isLoading || !isInView) && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
              )}
              {isInView && (
                <Image
                  src={`/images/${image.filename}`}
                  alt={`${image.title} - ${image.description || ''} ${image.tags.join(', ')} | 로컬리 맛집 여행지 정보`.trim()}
                  title={`${image.title} - 로컬리`}
                  fill
                  priority={priority}
                  loading="eager" // 수동 lazy loading이므로 eager로 설정
                  className={cn(
                    "object-cover transition-all duration-500 group-hover:scale-110",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🖼️</div>
                <div className="text-sm">이미지를 불러올 수 없습니다</div>
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {image.title}
              </h3>
              <div className="flex flex-wrap gap-1">
                {image.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
                {image.tags.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 text-xs"
                  >
                    +{image.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
