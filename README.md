# 로컬리 (Locally) - 네이버에 안나오는 동네지도

전국 맛집, 여행지, 숨은명소 정보를 제공하는 로컬 정보 플랫폼입니다.

🌐 **Live Demo**: [https://localmap.cc](https://localmap.cc)

## 🚀 기능

- **🗺️ 지역별 정보**: 서울, 부산, 제주, 경주 등 전국 주요 도시 정보
- **🍽️ 맛집 지도**: 네이버에서 찾을 수 없는 진짜 로컬 맛집 정보
- **🏷️ 카테고리 필터**: 맛집, 전통주, 벚꽃명소, 온천 등 다양한 카테고리
- **🖼️ 시각적 정보**: 고품질 이미지로 생생한 정보 제공
- **📱 반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **🔍 SEO 최적화**: 검색엔진 친화적인 구조화된 데이터
- **⚡ 빠른 로딩**: Next.js 기반 성능 최적화

## 🛠️ 기술 스택

- **Framework**: Next.js 15 with App Router
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: Lucide React
- **배포**: GitHub Pages

## 🔍 SEO 최적화

### 메타데이터 최적화
- **타이틀 태그**: 지역별, 카테고리별 맞춤형 타이틀
- **메타 디스크립션**: 검색 친화적인 설명문
- **키워드**: 맛집, 여행지, 지역명 등 타겟 키워드 최적화
- **OpenGraph**: 소셜 미디어 공유 최적화
- **Twitter Cards**: 트위터 공유 최적화

### 구조화된 데이터 (JSON-LD)
- **웹사이트 스키마**: 기본 사이트 정보
- **조직 스키마**: 로컬리 브랜드 정보
- **이미지 갤러리 스키마**: 이미지 컬렉션 정보
- **지역 비즈니스 스키마**: 맛집 정보
- **FAQ 스키마**: 자주 묻는 질문

### 기술적 SEO
- **사이트맵**: 자동 생성되는 XML 사이트맵
- **로봇츠**: 검색엔진 크롤링 최적화
- **시맨틱 HTML**: 접근성과 SEO를 위한 구조화된 마크업
- **이미지 최적화**: alt 텍스트, title 속성, 적절한 파일명
- **성능 최적화**: 빠른 로딩 속도로 검색 순위 개선

### 콘텐츠 최적화
- **지역별 페이지**: 서울, 부산, 제주, 경주 등 지역별 최적화
- **카테고리별 페이지**: 맛집, 전통주, 벚꽃명소 등 카테고리별 최적화
- **롱테일 키워드**: "네이버에 안나오는", "숨은명소" 등 차별화된 키워드

## 📁 프로젝트 구조

```
/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 메인 페이지
│   │   └── globals.css           # 글로벌 스타일
│   ├── components/
│   │   ├── ui/                   # shadcn/ui 컴포넌트
│   │   └── gallery/
│   │       ├── Gallery.tsx       # 메인 갤러리 컴포넌트
│   │       ├── ImageCard.tsx     # 이미지 카드 컴포넌트
│   │       ├── TagFilter.tsx     # 태그 필터 컴포넌트
│   │       └── ImageModal.tsx    # 라이트박스 모달
│   ├── types/
│   │   └── gallery.ts            # 타입 정의
│   └── lib/
│       └── utils.ts              # 유틸리티 함수
├── public/
│   ├── data/
│   │   └── images.json           # 이미지 메타데이터
│   ├── images/                   # 이미지 파일들
│   └── CNAME                     # 커스텀 도메인 설정
└── docs/                         # 빌드 결과물 (GitHub Pages용)
```

## 🚀 로컬 개발

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

## 📝 이미지 추가하기

1. **이미지 파일 추가**
   - `public/images/` 폴더에 이미지 파일 업로드

2. **메타데이터 업데이트**
   - `public/data/images.json` 파일에 새 이미지 정보 추가:
   ```json
   {
     "id": 13,
     "filename": "new-image.jpg",
     "title": "새로운 이미지",
     "description": "이미지 설명",
     "tags": ["tag1", "tag2", "tag3"]
   }
   ```

3. **태그 관리**
   - 새로운 태그 추가 시 `tags` 섹션에도 정의:
   ```json
   {
     "name": "new-tag",
     "description": "새 태그 설명",
     "color": "#FF5722"
   }
   ```

## 🎨 디자인 특징

- **밝은 테마**: 밝고 깔끔한 색상 조합
- **그라데이션**: 부드러운 그라데이션 효과
- **카드 디자인**: 깔끔한 카드 기반 레이아웃
- **호버 효과**: 인터랙티브한 애니메이션
- **반응형**: 모든 디바이스에 최적화

## 📦 배포

### GitHub Pages 자동 배포
1. 코드를 main 브랜치에 푸시
2. GitHub Actions가 자동으로 빌드 및 배포
3. `https://local.heg.wtf`에서 확인

### 수동 빌드
```bash
npm run build
```

## 🔧 개발 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 검사
```

## 📄 라이센스

MIT License

---

Made with ❤️ using **shadcn/ui** and **Next.js**