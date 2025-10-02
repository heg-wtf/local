export function AdditionalMeta() {
  return (
    <>
      {/* 추가 메타 태그들 */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="동네지도" />
      
      {/* 지리적 메타 태그 */}
      <meta name="geo.region" content="KR" />
      <meta name="geo.country" content="Korea" />
      <meta name="geo.placename" content="South Korea" />
      
      {/* 언어 및 지역 설정 */}
      <meta httpEquiv="content-language" content="ko-KR" />
      <meta name="language" content="Korean" />
      
      {/* 캐시 제어 */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
      
      {/* 보안 헤더 */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      
      {/* 검색엔진 최적화 */}
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="classification" content="travel, food, restaurant, guide" />
      
      {/* 소셜 미디어 최적화 */}
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="동네지도 - 네이버지도에는 없는 진짜 동네지도" />
      
      {/* 네이버 검색 최적화 */}
      <meta name="naver-site-verification" content="naver-verification-code" />
      
      {/* 다음/카카오 검색 최적화 */}
      <meta name="daumVerification" content="daum-verification-code" />
      
      {/* 링크 미리보기 최적화 */}
      <link rel="canonical" href="https://localmap.cc" />
      <link rel="alternate" hrefLang="ko" href="https://localmap.cc" />
      <link rel="alternate" hrefLang="x-default" href="https://localmap.cc" />
      
      {/* 파비콘 및 아이콘 */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* DNS 프리페치 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* 프리로드 중요 리소스 */}
      <link rel="preload" href="/images/sample1.webp" as="image" type="image/webp" />
    </>
  );
}
