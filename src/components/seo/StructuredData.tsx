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
    "name": "동네지도",
    "alternateName": "DongneMap",
    "url": "https://localmap.cc",
    "description": "네이버지도에는 없는 진짜 동네지도 - 전국 맛집, 여행지, 숨은명소 정보",
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
    "name": "동네지도",
    "url": "https://localmap.cc",
    "logo": "https://localmap.cc/favicon/android-chrome-192x192.png",
    "description": "네이버지도에는 없는 진짜 동네지도를 제공하는 로컬 정보 플랫폼",
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
    "name": "동네지도 맛집 및 여행지 이미지 갤러리",
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
        "description": "서울 지역의 맛집 정보",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "서울특별시",
          "addressCountry": "KR"
        }
      },
      {
        "@type": "Place", 
        "name": "부산 맛집",
        "description": "부산 지역의 맛집 정보",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "부산광역시",
          "addressCountry": "KR"
        }
      },
      {
        "@type": "Place",
        "name": "제주 맛집", 
        "description": "제주도의 맛집 정보",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "제주특별자치도",
          "addressCountry": "KR"
        }
      },
      {
        "@type": "Place",
        "name": "경주 맛집",
        "description": "경주 지역의 맛집 정보",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "경주시",
          "addressCountry": "KR"
        }
      }
    ]
  };

  // 브레드크럼 스키마
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://localmap.cc"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "맛집 지도",
        "item": "https://localmap.cc?category=맛집"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "여행지 추천",
        "item": "https://localmap.cc?category=여행지"
      }
    ]
  };

  // 로컬 비즈니스 스키마
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "동네지도",
    "description": "네이버지도에는 없는 진짜 로컬 정보를 제공하는 동네지도",
    "url": "https://localmap.cc",
    "telephone": "+82-10-0000-0000",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressLocality": "서울특별시"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.5665,
      "longitude": 126.9780
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "무료",
    "paymentAccepted": "무료",
    "currenciesAccepted": "KRW"
  };

  // FAQ 스키마
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "동네지는 어떤 서비스인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "동네지는 네이버지도에는 없는 진짜 로컬 정보를 제공하는 동네지도 서비스입니다. 전국 맛집, 여행지, 숨은명소 정보를 한눈에 확인할 수 있습니다."
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
    breadcrumbSchema,
    localBusinessSchema,
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
