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
      <meta name="coverage" content="worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* 소셜 미디어 최적화 */}
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="동네지도 - 네이버지도에는 없는 진짜 동네지도" />
      <meta property="og:type" content="website" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* 네이버 검색 최적화 */}
      <meta name="naver-site-verification" content="naver-verification-code" />
      
      {/* 다음/카카오 검색 최적화 */}
      <meta name="daumVerification" content="daum-verification-code" />
      
      {/* 구글 서치 콘솔 최적화 */}
      <meta name="google-site-verification" content="google-site-verification-code" />
      <meta name="google-adsense-account" content="ca-pub-xxxxxxxxx" />
      
      {/* 추가 검색엔진 최적화 */}
      <meta name="subject" content="맛집, 여행지, 숨은명소, 동네지도, 로컬정보" />
      <meta name="copyright" content="동네지도" />
      <meta name="reply-to" content="info@localmap.cc" />
      <meta name="owner" content="동네지도" />
      <meta name="url" content="https://localmap.cc" />
      <meta name="identifier-URL" content="https://localmap.cc" />
      
      {/* 링크 미리보기 최적화 */}
      <link rel="canonical" href="https://localmap.cc" />
      <link rel="alternate" hrefLang="ko" href="https://localmap.cc" />
      <link rel="alternate" hrefLang="x-default" href="https://localmap.cc" />
      
      {/* 파비콘 및 아이콘 - 다양한 크기와 형식 지원 */}
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileImage" content="/favicon/android-chrome-192x192.png" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      
      {/* DNS 프리페치 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* 프리로드 중요 리소스 */}
      <link rel="preload" href="/images/sample1.webp" as="image" type="image/webp" />
    </>
  );
}
