# 🌟 GitHub Pages 개인 포트폴리오 & 기술 블로그

깃허브(GitHub Pages)를 통해 무료로 영구 호스팅되는 **개인 포트폴리오 및 기술 블로그** 통합 웹사이트입니다.

별도의 복잡한 프레임워크 빌드나 유료 서버 없이, HTML5 / Tailwind CSS / Vanilla JS / Marked.js 기반의 표준 정적 구조로 제작되어 안정적이고 빠릅니다.

---

## ✨ 주요 특징

- **포트폴리오 메인 (`index.html`)**
  - 깔끔한 히어로 섹션, 자기소개, 경력 및 활동 타임라인
  - 카테고리별 기술 스택(Skills) 뱃지 렌더링
  - 라이브 데모 및 GitHub 링크가 포함된 대표 프로젝트 카드
  - 최신 작성된 기술 블로그 글 3편 자동 연동
- **기술 블로그 (`blog.html`)**
  - 실시간 검색 기능 (제목, 본문, 태그 키워드 검색)
  - 태그/카테고리별 즉시 필터링
  - 반응형 카드 레이아웃 및 읽는 시간(Reading Time) 표시
- **마크다운 포스트 뷰어 (`post.html`)**
  - `posts/` 폴더의 `.md` 파일을 읽어 자동으로 예쁜 웹 아티클로 렌더링
  - 개발 블로그 필수 기능: 코드 신택스 하이라이팅 + 원클릭 코드 복사 버튼
  - 헤딩 태그(h2, h3) 기반 목차(Table of Contents) 자동 생성 및 스무스 스크롤
  - 이전 글 / 다음 글 네비게이션
- **디자인 & 편의성**
  - 완벽한 다크 모드 / 라이트 모드 지원 (사용자 환경 자동 감지 + 수동 토글)
  - 모바일 / 태블릿 / PC 전 기기 완벽 반응형 디자인
  - 한국어에 최적화된 Pretendard 폰트 적용

---

## 📁 프로젝트 폴더 구조

```text
making homepage/
├── index.html              # 포트폴리오 메인 랜딩 페이지
├── blog.html               # 기술 블로그 목록 & 검색/태그 필터 페이지
├── post.html               # 마크다운 글 상세 뷰어 페이지
├── config.js               # [중요] 내 정보(이름, 바이오, 소셜, 스택, 프로젝트) 설정 파일
├── server.js               # 로컬 테스트용 간이 웹 서버
├── package.json            # 로컬 실행 및 새 글 생성 스크립트 정의
├── .gitignore              # Git 무시 파일 목록
├── assets/
│   ├── css/
│   │   └── style.css       # 타이포그래피, 다크모드, 커스텀 스타일
│   └── js/
│       ├── main.js         # 다크모드, 모바일 네비게이션 공통 스크립트
│       ├── portfolio.js    # config.js 기반 포트폴리오 렌더링 스크립트
│       └── blog.js         # 마크다운 파싱, TOC, 검색/필터 스크립트
├── posts/
│   ├── posts.json          # 블로그 글 메타데이터 목록 (제목, 날짜, 태그 등)
│   ├── 01-welcome.md       # 샘플 포스트 1
│   └── 02-tech-stack-and-architecture.md # 샘플 포스트 2
└── scripts/
    └── new-post.js         # 새 글 템플릿 자동 생성 스크립트
```

---

## 💻 로컬에서 실행 및 확인하기

Node.js가 설치되어 있다면 추가 패키지 설치 없이 바로 실행할 수 있습니다:

```bash
# 로컬 개발 서버 실행
npm start
```

실행 후 웹 브라우저에서 **`http://localhost:3000`** 으로 접속하시면 바로 웹사이트를 확인하실 수 있습니다.

---

## ✏️ 내 정보로 수정하는 방법

[`config.js`](file:///config.js) 파일을 열면 내 프로필과 프로젝트 정보가 깔끔하게 정리되어 있습니다:

1. **프로필 정보**: 이름, 한 줄 소개, 지역, 이메일, GitHub 아이디 수정
2. **소셜 링크**: GitHub, LinkedIn, 이메일 주소 연결
3. **기술 스택 (Skills)**: Frontend, Backend, DevOps 등 내가 다룰 수 있는 기술 목록 편집
4. **프로젝트 (Projects)**: 제목, 설명, 썸네일 이미지, 태그, 데모 주소, GitHub 링크 추가/수정
5. **경력 (Experiences)**: 소속, 직무, 기간, 설명 수정

---

## 📝 새로운 블로그 글 작성하기

새로운 글을 작성하는 방법은 2가지가 있습니다:

### 방법 1. 자동 생성 명령어 사용 (권장)
터미널에서 아래 명령어를 실행하면 `posts/` 폴더에 마크다운 템플릿 파일이 생성되고 `posts/posts.json`에 자동으로 등록됩니다:

```bash
npm run new-post "글 제목" "카테고리"
# 예시: npm run new-post "React 최적화 기법 정리" "Frontend"
```

생성된 마크다운 파일을 열어 내용을 작성하기만 하면 끝납니다!

### 방법 2. 직접 파일 추가
1. `posts/` 폴더에 새 마크다운 파일(예: `my-new-post.md`)을 작성합니다.
2. `posts/posts.json` 파일의 맨 위에 아래 형식으로 메타데이터를 추가합니다:
   ```json
   {
     "id": "my-new-post",
     "slug": "my-new-post",
     "title": "글 제목",
     "excerpt": "한 줄 요약 내용",
     "date": "2025-03-01",
     "category": "Frontend",
     "tags": ["React", "Performance"],
     "readingTime": "5 min",
     "file": "my-new-post.md",
     "featured": false
   }
   ```

---

## 🚀 GitHub Pages로 무료 배포하기 (단계별 가이드)

### 1단계: GitHub에서 리포지토리 생성
1. [GitHub](https://github.com/)에 로그인합니다.
2. 우측 상단 `+` 버튼 클릭 후 **[New repository]**를 선택합니다.
3. **Repository name**에 반드시 아래 규칙으로 이름을 입력합니다:
   - **`<내_깃허브_아이디>.github.io`**
   - (예: 본인 아이디가 `gildong`이라면 `gildong.github.io`로 입력)
4. 공개 범위를 **Public**으로 설정하고, 'Add a README file' 등은 체크를 해제한 뒤 **[Create repository]**를 클릭합니다.

### 2단계: 로컬에서 Git 커밋 및 푸시
프로젝트 폴더(터미널)에서 아래 명령어들을 순서대로 실행합니다:

```bash
# 1. git 초기화
git init

# 2. 파일 전체 추가 및 첫 커밋
git add .
git commit -m "feat: Initial commit for portfolio & blog homepage"

# 3. 기본 브랜치를 main으로 설정
git branch -M main

# 4. 내 GitHub 리포지토리 원격 연결 (본인 아이디로 변경)
git remote add origin https://github.com/<내_깃허브_아이디>/<내_깃허브_아이디>.github.io.git

# 5. GitHub에 업로드
git push -u origin main
```

### 3단계: 배포 확인
- 푸시 후 약 1~2분 뒤, 웹 브라우저에서 **`https://<내_깃허브_아이디>.github.io`** 로 접속하면 전 세계 어디서든 접속 가능한 나만의 홈페이지가 완성됩니다!
- 배포 상태는 GitHub 저장소의 **[Settings] -> [Pages]** 탭에서 확인하실 수 있습니다 (Source가 `Deploy from a branch` / Branch가 `main` / `/(root)`로 되어 있으면 정상입니다).
