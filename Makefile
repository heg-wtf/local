# HEG Gallery Makefile

.PHONY: help install dev build serve test start clean lint type-check export

# 기본 타겟
help: ## Show available commands
	@echo "HEG Gallery - Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

# 의존성 설치
install: ## Install npm dependencies
	npm install

# 개발 서버 실행
dev: ## Start development server (localhost:3000)
	npm run dev

# 프로덕션 빌드
build: ## Build for production
	npm run build
	@echo "google.com, pub-8699046198561974, DIRECT, f08c47fec0942fa0" > docs/ads.txt
	@echo "google.com, pub-8699046198561974, DIRECT, f08c47fec0942fa0" > public/ads.txt
	@echo "ads.txt file created in docs/ and public/ directories"
	@if [ -f "docs/sitemap.xml" ]; then \
		echo "sitemap.xml already exists in docs/"; \
	else \
		echo "Warning: sitemap.xml not found in docs/ - Next.js should generate it automatically"; \
	fi

# 프로덕션 서버 실행
start: ## Start production server
	npm run start

# 로컬에서 빌드된 파일 서빙
serve: ## Serve built files locally
	@PORT=$$(($(($$RANDOM % 1000)) + 8000)); \
	echo "Starting server on port $$PORT"; \
	if command -v python3 >/dev/null 2>&1; then \
		cd docs && python3 -m http.server $$PORT; \
	elif command -v python >/dev/null 2>&1; then \
		cd docs && python -m SimpleHTTPServer $$PORT; \
	elif command -v npx >/dev/null 2>&1; then \
		cd docs && npx serve -p $$PORT .; \
	else \
		echo "Python or npx required"; \
		exit 1; \
	fi

# 테스트 실행 (린트 + 타입 체크)
test: ## Run tests (lint + type check)
	npm run lint
	npx tsc --noEmit

# 코드 품질 검사
lint: ## Run ESLint
	npm run lint

# 타입 검사
type-check: ## Run TypeScript type check
	npx tsc --noEmit

# 정적 파일 내보내기 (GitHub Pages용)
export: build ## Generate static files for GitHub Pages
	@echo "Static files generated in docs/ directory"

# 프로젝트 정리
clean: ## Clean build artifacts
	rm -rf node_modules
	rm -rf .next
	rm -rf docs

# 전체 재설치
fresh: clean install ## Clean and reinstall everything
	@echo "Project reinstalled"

# shadcn/ui 컴포넌트 추가
add-component: ## Add shadcn/ui component (usage: make add-component COMPONENT=button)
	@if [ -z "$(COMPONENT)" ]; then \
		echo "Please specify component name. Example: make add-component COMPONENT=button"; \
		exit 1; \
	fi
	npx shadcn@latest add $(COMPONENT)
