"use client";

import { GalleryData } from "@/types/gallery";

interface StructuredDataProps {
  data: GalleryData;
}

export function StructuredData({ data }: StructuredDataProps) {
  // 웹사이트 기본 정보
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "로컬리",
    "alternateName": "Locally",
    "url": "https://localmap.cc",
    "description": "네이버에 안나오는 동네지도 - 전국 맛집, 여행지, 숨은명소 정보",
    "inLanguage": "ko-KR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://localmap.cc/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 조직 정보
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "로컬리",
    "url": "https://localmap.cc",
    "logo": "https://localmap.cc/images/sample1.webp",
    "description": "네이버에 안나오는 동네지도를 제공하는 로컬 정보 플랫폼",
    "foundingDate": "2024",
    "knowsAbout": [
      "맛집 정보",
      "여행지 추천",
      "숨은 명소",
      "전통주",
      "벚꽃 명소",
      "온천 정보"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "대한민국"
    }
  };

  // 이미지 갤러리 정보
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "로컬리 맛집 및 여행지 이미지 갤러리",
    "description": "전국 맛집, 여행지, 숨은명소의 이미지를 모은 갤러리",
    "url": "https://localmap.cc",
    "numberOfItems": data.metadata.totalImages,
    "image": data.images.slice(0, 10).map(image => ({
      "@type": "ImageObject",
      "name": image.title,
      "description": image.description || image.title,
      "url": `https://localmap.cc/images/${image.filename}`,
      "keywords": image.tags.join(", "),
      "contentLocation": {
        "@type": "Place",
        "name": image.tags.find(tag => 
          ["서울", "부산", "제주", "경주", "종로", "회기", "상계"].includes(tag)
        ) || "대한민국"
      }
    }))
  };

  // 지역별 맛집 정보
  const restaurantCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "name": "전국 맛집 지도",
    "description": "대한민국 전국의 맛집 정보를 지역별로 정리한 컬렉션",
    "url": "https://localmap.cc",
    "about": [
      {
        "@type": "Place",
        "name": "서울 맛집",
        "description": "서울 지역의 맛집 정보"
      },
      {
        "@type": "Place", 
        "name": "부산 맛집",
        "description": "부산 지역의 맛집 정보"
      },
      {
        "@type": "Place",
        "name": "제주 맛집", 
        "description": "제주도의 맛집 정보"
      },
      {
        "@type": "Place",
        "name": "경주 맛집",
        "description": "경주 지역의 맛집 정보"
      }
    ]
  };

  // FAQ 스키마
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "로컬리는 어떤 서비스인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "로컬리는 네이버에서 찾을 수 없는 진짜 로컬 정보를 제공하는 동네지도 서비스입니다. 전국 맛집, 여행지, 숨은명소 정보를 한눈에 확인할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "어떤 지역의 정보를 제공하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "서울, 부산, 제주, 경주 등 전국 주요 도시의 맛집과 여행 정보를 제공합니다. 전통주, 벚꽃명소, 온천, 휴게소 맛집 등 다양한 카테고리의 정보가 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "정보는 어떻게 분류되어 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "지역별(서울, 부산, 제주, 경주), 카테고리별(맛집, 전통주, 벚꽃명소, 온천 등)로 분류되어 있어 원하는 정보를 쉽게 찾을 수 있습니다."
        }
      }
    ]
  };

  const schemas = [
    websiteSchema,
    organizationSchema, 
    imageGallerySchema,
    restaurantCollectionSchema,
    faqSchema
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  );
}
