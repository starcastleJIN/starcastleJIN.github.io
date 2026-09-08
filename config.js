/**
 * 사이트 기본 정보 및 개인 프로필 설정
 * starcastleJIN 님의 취향과 인터뷰 결과에 맞게 구성된 설정 파일입니다.
 */
const SITE_CONFIG = {
  // 기본 프로필 정보
  profile: {
    name: "starcastleJIN",
    role: "Developer & Problem Solver",
    tagline: "호기심을 코드로 엮고, 가치를 프로덕트로 증명합니다.",
    bio: "기술로 일상의 불편을 해결하고 배운 것을 꾸준히 기록하는 개발자입니다. 간결한 구조, 높은 가독성, 편안한 사용자 경험을 추구합니다.",
    avatar: "https://github.com/starcastleJIN.png", // GitHub 프로필 이미지 자동 연동
    location: "Seoul, Republic of Korea",
    email: "jsgyu0223@gmail.com",
    githubUsername: "starcastleJIN",
    statusText: "Open to Collaborate & Chat"
  },

  // 소셜 및 링크
  socials: {
    github: "https://github.com/starcastleJIN",
    linkedin: "", // 필요시 입력 (예: https://linkedin.com/in/아이디)
    twitter: "",
    email: "mailto:jsgyu0223@gmail.com",
  },

  // 벤토 위젯 1: 현재 집중해서 공부/개발 중인 기술 (Currently Hacking & Learning)
  currentlyLearning: {
    title: "Currently Hacking & Exploring",
    status: "Active Learning",
    items: [
      { name: "Agentic AI & MCP", desc: "AI 에이전트 오케스트레이션 및 MCP 프로토콜 연구" },
      { name: "Modern Web Performance", desc: "Core Web Vitals 최적화 및 정적 사이트 경량화" },
      { name: "Clean Architecture", desc: "유지보수성 높은 프론트엔드 모듈 설계 패턴" }
    ]
  },

  // 벤토 위젯 2: 개발 철학 (Developer Philosophy)
  philosophy: [
    { number: "01", title: "기록의 힘", desc: "기록하지 않은 고민은 휘발되지만, 기록된 해결책은 자산이 된다." },
    { number: "02", title: "단순함의 미학", desc: "가장 좋은 코드는 불필요한 복잡성이 걷어내어진 명확한 코드다." },
    { number: "03", title: "사용자 중심", desc: "기술은 목적이 아닌 수단이며, 결국 사용자의 경험을 위해 존재한다." }
  ],

  // 기술 스택 (Skills)
  skills: [
    {
      category: "Frontend",
      color: "emerald",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Tailwind CSS", "Next.js"]
    },
    {
      category: "Backend & Cloud",
      color: "teal",
      items: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "GitHub Pages"]
    },
    {
      category: "Tools & Workflow",
      color: "cyan",
      items: ["Git & GitHub", "VS Code", "Docker", "Model Context Protocol (MCP)", "Vercel"]
    }
  ],

  // 대표 프로젝트 (Featured Projects)
  projects: [
    {
      id: "project-1",
      title: "AI 기반 스마트 북마크 매니저",
      description: "웹 브라우저에 저장한 수백 개의 링크를 AI가 카테고리별로 자동 분류하고 요약해 주는 생산성 서비스입니다.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Node.js"],
      demoUrl: "https://starcastlejin.github.io",
      githubUrl: "https://github.com/starcastleJIN/starcastleJIN.github.io",
      featured: true
    },
    {
      id: "project-2",
      title: "실시간 협업 마크다운 에디터",
      description: "웹소켓 기술을 활용하여 여러 사용자가 동시에 하나의 문서를 편집하고 라이브로 미리볼 수 있는 웹 에디터입니다.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      tags: ["Vue.js", "Socket.io", "Express", "Tailwind CSS"],
      demoUrl: "https://starcastlejin.github.io",
      githubUrl: "https://github.com/starcastleJIN/starcastleJIN.github.io",
      featured: true
    },
    {
      id: "project-3",
      title: "개발자 취업 준비 올인원 대시보드",
      description: "코딩 테스트 통계, 지원 이력 관리, 면접 질문 아카이빙을 한 화면에서 편리하게 관리할 수 있는 맞춤형 대시보드입니다.",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      demoUrl: "https://starcastlejin.github.io",
      githubUrl: "https://github.com/starcastleJIN/starcastleJIN.github.io",
      featured: true
    }
  ],

  // 경력 및 활동 이력 (Experience & Activities)
  experiences: [
    {
      period: "2024 - 현재",
      role: "소프트웨어 엔지니어 / 개발자",
      organization: "Tech Projects",
      description: "웹 애플리케이션 개발 및 사용자 경험 개선, 오픈소스 및 사이드 프로젝트 진행."
    },
    {
      period: "2023 - 2024",
      role: "프론트엔드 개발 / 스터디 리드",
      organization: "Developer Community",
      description: "모던 웹 기술 스터디 리드 및 프로젝트 협업 진행, 다양한 기술 블로그 아티클 작성."
    }
  ]
};

// 브라우저 전역 객체로 내보내기
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
