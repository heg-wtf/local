'use client'

import Script from 'next/script'

export function AdSense() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8699046198561974"
        crossOrigin="anonymous"
        onError={() => {
          console.log('AdSense 스크립트 로딩 실패 - 광고 차단기가 감지되었습니다.')
        }}
      />
      {/* AdSense 광고 */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8699046198561974"
        data-ad-slot="1172358707"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-init">
        {`
          try {
            if (typeof adsbygoogle !== 'undefined') {
              (adsbygoogle = window.adsbygoogle || []).push({});
            } else {
              console.log('AdSense가 로드되지 않았습니다. 광고 차단기를 확인해주세요.');
            }
          } catch (error) {
            console.log('AdSense 초기화 실패:', error);
          }
        `}
      </Script>
    </>
  )
}
