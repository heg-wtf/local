# HEG Gallery Makefile

.PHONY: help install dev build build-serve start clean lint type-check export serve

# 기본 타겟
help: ## 사용 가능한 명령어 목록 표시
	@echo "HEG Gallery - 사용 가능한 명령어:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

# 의존성 설치
install: ## npm 의존성 설치
	@echo "📦 의존성을 설치하는 중..."
	npm install

# 개발 서버 실행
dev: ## 개발 서버 실행 (localhost:3000)
	@echo "🚀 개발 서버를 시작하는 중..."
	npm run dev

# 프로덕션 빌드
build: ## 프로덕션 빌드 실행
	@echo "🔨 프로덕션 빌드를 시작하는 중..."
	npm run build
	@echo "✅ 빌드가 완료되었습니다!"
	@echo ""
	@echo "🌐 빌드된 파일을 테스트하려면 다음 명령어를 사용하세요:"
	@echo "   make serve    # 로컬 서버 실행 (http://localhost:8000)"
	@echo "   make build-serve  # 빌드 후 바로 서버 실행"

# 프로덕션 서버 실행
start: ## 프로덕션 서버 실행
	@echo "🌟 프로덕션 서버를 시작하는 중..."
	npm run start

# 정적 파일 내보내기 (GitHub Pages용)
export: build ## GitHub Pages용 정적 파일 생성
	@echo "📤 GitHub Pages용 정적 파일을 생성했습니다."
	@echo "📁 docs/ 폴더에서 확인하세요."

# 빌드 후 바로 서버 실행
build-serve: build serve ## 빌드 후 바로 로컬 서버 실행

# 로컬에서 빌드된 파일 서빙
serve: ## 빌드된 파일을 로컬에서 서빙 (랜덤 포트)
	@echo "🌐 빌드된 파일을 로컬에서 서빙하는 중..."
	@PORT=$$(($(($$RANDOM % 1000)) + 8000)); \
	echo "🎲 랜덤 포트 $$PORT에서 서버를 시작합니다"; \
	if command -v python3 >/dev/null 2>&1; then \
		echo "🐍 Python3을 사용하여 서빙합니다 (http://localhost:$$PORT)"; \
		cd docs && python3 -m http.server $$PORT; \
	elif command -v python >/dev/null 2>&1; then \
		echo "🐍 Python을 사용하여 서빙합니다 (http://localhost:$$PORT)"; \
		cd docs && python -m SimpleHTTPServer $$PORT; \
	elif command -v npx >/dev/null 2>&1; then \
		echo "⚛️  npx serve를 사용하여 서빙합니다 (http://localhost:$$PORT)"; \
		cd docs && npx serve -p $$PORT .; \
	else \
		echo "❌ Python 또는 npx가 필요합니다"; \
		exit 1; \
	fi

# 코드 품질 검사
lint: ## ESLint로 코드 검사
	@echo "🔍 코드 품질을 검사하는 중..."
	npm run lint

# 타입 검사
type-check: ## TypeScript 타입 검사
	@echo "🔍 TypeScript 타입을 검사하는 중..."
	npx tsc --noEmit

# 전체 검사 (린트 + 타입 체크)
check: lint type-check ## 전체 코드 검사 (ESLint + TypeScript)
	@echo "✅ 모든 검사가 완료되었습니다."

# 프로젝트 정리
clean: ## node_modules, .next, docs 폴더 삭제
	@echo "🧹 프로젝트를 정리하는 중..."
	rm -rf node_modules
	rm -rf .next
	rm -rf docs
	@echo "✅ 정리가 완료되었습니다."

# 전체 재설치
fresh: clean install ## 전체 정리 후 재설치
	@echo "🔄 프로젝트를 새로 설치했습니다."

# shadcn/ui 컴포넌트 추가
add-component: ## shadcn/ui 컴포넌트 추가 (사용: make add-component COMPONENT=button)
	@if [ -z "$(COMPONENT)" ]; then \
		echo "❌ 컴포넌트 이름을 지정해주세요. 예: make add-component COMPONENT=button"; \
		exit 1; \
	fi
	@echo "➕ $(COMPONENT) 컴포넌트를 추가하는 중..."
	npx shadcn@latest add $(COMPONENT)

# 개발 도구 설치 (선택사항)
dev-tools: ## 개발에 유용한 추가 도구 설치
	@echo "🛠️ 개발 도구를 설치하는 중..."
	npm install --save-dev @types/node

# 배포 준비
deploy-prep: build ## 배포 전 준비 작업
	@echo "🚀 배포 준비를 하는 중..."
	@echo "✅ 빌드 완료"
	@echo "📁 docs/ 폴더에 배포용 파일이 준비되었습니다"
	@echo "🌐 GitHub에 푸시하면 자동으로 배포됩니다"

# 이미지 최적화 (imagemin 설치 필요)
optimize-images: ## 이미지 최적화 (imagemin 필요)
	@echo "🖼️ 이미지를 최적화하는 중..."
	@if command -v imagemin >/dev/null 2>&1; then \
		imagemin public/images/* --out-dir=public/images/optimized; \
		echo "✅ 이미지 최적화 완료"; \
	else \
		echo "❌ imagemin이 설치되어 있지 않습니다"; \
		echo "설치: npm install -g imagemin-cli"; \
	fi

# 프로젝트 상태 확인
status: ## 프로젝트 상태 확인
	@echo "📊 프로젝트 상태:"
	@echo ""
	@echo "Node.js 버전:"
	@node --version
	@echo ""
	@echo "npm 버전:"
	@npm --version
	@echo ""
	@echo "프로젝트 의존성:"
	@npm list --depth=0 2>/dev/null || echo "의존성을 확인하려면 'make install'을 먼저 실행하세요"
	@echo ""
	@if [ -d "docs" ]; then \
		echo "✅ 빌드 파일 존재 (docs/)"; \
	else \
		echo "❌ 빌드 파일 없음 (make build 실행 필요)"; \
	fi
