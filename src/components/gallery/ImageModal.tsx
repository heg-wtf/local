"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { Image as ImageType } from "@/types/gallery";

interface ImageModalProps {
  images: ImageType[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onImageChange: (index: number) => void;
}

export function ImageModal({ images, currentIndex, isOpen, onClose, onImageChange }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { addToast } = useToast();

  const image = images[currentIndex];
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;

  // 이미지가 변경될 때마다 로딩 상태 초기화
  useEffect(() => {
    if (image) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [image]);

  // 방향키 네비게이션
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (isFirstImage) {
          addToast("이전 이미지가 없습니다", "info");
        } else {
          onImageChange(currentIndex - 1);
        }
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (isLastImage) {
          addToast("다음 이미지가 없습니다", "info");
        } else {
          onImageChange(currentIndex + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, isFirstImage, isLastImage, onImageChange, addToast]);

  const handlePrevImage = () => {
    if (isFirstImage) {
      addToast("이전 이미지가 없습니다", "info");
    } else {
      onImageChange(currentIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (isLastImage) {
      addToast("다음 이미지가 없습니다", "info");
    } else {
      onImageChange(currentIndex + 1);
    }
  };

  if (!image) return null;

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', image.filename);
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    console.error('Image loading error:', image.filename);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] max-h-[99vh] p-0 overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-2xl" showCloseButton={false}>

        {/* Content Header */}
        <div className="p-4 pb-2 space-y-2 bg-white/90 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {image.title}
            </DialogTitle>
          </DialogHeader>

          {image.description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {image.description}
            </p>
          )}
        </div>

        {/* Image Container */}
        <div className="relative">
          {!hasError ? (
            <>
              {isLoading && (
                <div className="w-full h-[800px] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500">이미지를 불러오는 중...</div>
                </div>
              )}
              <div className="relative w-full max-h-[95vh] min-h-[800px]">
                <Image
                  src={`/images/${image.filename}`}
                  alt={image.title}
                  fill
                  priority={true}
                  unoptimized={true}
                  className={`object-contain transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  sizes="98vw"
                />
              </div>
            </>
          ) : (
            <div className="w-full h-[800px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🖼️</div>
                <div className="text-lg">이미지를 불러올 수 없습니다</div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!isFirstImage && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
              aria-label="이전 이미지"
            >
              ‹
            </button>
          )}

          {!isLastImage && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
              aria-label="다음 이미지"
            >
              ›
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
