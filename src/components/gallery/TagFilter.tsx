"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/types/gallery";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface TagFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  imageCounts: Record<string, number>;
}

export function TagFilter({ tags, selectedTags, onTagSelect, imageCounts }: TagFilterProps) {
  const allCount = Object.values(imageCounts).reduce((sum, count) => sum + count, 0);

  // 태그를 랜덤하게 섞기
  const shuffledTags = useMemo(() => {
    const shuffled = [...tags];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [tags]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-4">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          동네 필터
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* 전체 동네 */}
        <Button
          variant={selectedTags.length === 0 ? "default" : "ghost"}
          className={cn(
            "w-full justify-between h-auto p-3 transition-all duration-200",
            selectedTags.length === 0
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
              : "hover:bg-gray-100"
          )}
          onClick={() => onTagSelect("all")}
        >
          <span className="font-medium">전체</span>
          <Badge
            variant={selectedTags.length === 0 ? "secondary" : "outline"}
            className={selectedTags.length === 0 ? "bg-white/20 text-white" : ""}
          >
            {allCount}
          </Badge>
        </Button>

        <Separator className="my-4" />

        {/* 개별 동네들 */}
        <div className="space-y-2">
          {shuffledTags.map((tag) => {
            const count = imageCounts[tag.name] || 0;
            const isSelected = selectedTags.includes(tag.name);

            return (
              <Button
                key={tag.name}
                variant={isSelected ? "default" : "ghost"}
                className={cn(
                  "w-full justify-between h-auto p-3 transition-all duration-200",
                  isSelected
                    ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md"
                    : "hover:bg-gray-100"
                )}
                onClick={() => onTagSelect(tag.name)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="font-medium capitalize">{tag.name}</span>
                </div>
                <Badge
                  variant={isSelected ? "secondary" : "outline"}
                  className={isSelected ? "bg-white/20 text-white" : ""}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
