import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdditionalMeta } from "@/components/seo/AdditionalMeta";
import { AdSense } from "@/components/AdSense";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "동네지도 | 네이버지도에는 없는 진짜 동네지도 - 맛집, 여행지, 숨은명소",
  description: "전국 맛집 지도, 여행지 추천, 숨은 명소까지! 네이버에서 찾을 수 없는 진짜 로컬 정보를 한눈에 확인하세요. 서울, 부산, 제주, 경주 등 전국 맛집과 여행 정보를 제공합니다.",
  keywords: ["맛집지도", "여행지추천", "로컬맛집", "숨은명소", "전국맛집", "서울맛집", "부산맛집", "제주맛집", "경주맛집", "전통주", "벚꽃명소", "온천", "휴게소맛집", "동네지도", "로컬정보", "맛집추천", "여행정보", "한국여행", "국내여행"],
  authors: [{ name: "동네지도" }],
  creator: "동네지도",
  publisher: "동네지도",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localmap.cc'),
  alternates: {
    canonical: 'https://localmap.cc',
  },
  openGraph: {
    title: "동네지도 | 네이버지도에는 없는 진짜 동네지도 - 맛집, 여행지, 숨은명소",
    description: "전국 맛집 지도, 여행지 추천, 숨은 명소까지! 네이버에서 찾을 수 없는 진짜 로컬 정보를 한눈에 확인하세요. 서울, 부산, 제주, 경주 등 전국 맛집과 여행 정보를 제공합니다.",
    url: 'https://localmap.cc',
    siteName: '동네지도',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/sample1.webp',
        width: 1200,
        height: 630,
        alt: '동네지도 - 전국 맛집 지도와 여행지 추천, 숨은 명소 정보',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "동네지도 | 네이버지도에는 없는 진짜 동네지도 - 맛집, 여행지, 숨은명소",
    description: "전국 맛집 지도, 여행지 추천, 숨은 명소까지! 네이버에서 찾을 수 없는 진짜 로컬 정보를 한눈에 확인하세요. 서울, 부산, 제주, 경주 등 전국 맛집과 여행 정보를 제공합니다.",
    images: ['/images/sample1.webp'],
    creator: '@dongnemap',
    site: '@dongnemap',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // 실제 구글 서치 콘솔 인증 코드로 교체 필요
    yandex: 'yandex-verification-code', // 필요시 추가
    yahoo: 'yahoo-site-verification-code', // 필요시 추가
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <AdditionalMeta />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AdSense />
      </body>
    </html>
  );
}
