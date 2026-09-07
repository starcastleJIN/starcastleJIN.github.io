/**
 * 사이트 기본 정보 및 개인 프로필 설정
 * 사용자의 정보에 맞게 이 파일의 내용을 자유롭게 수정하세요.
 */
const SITE_CONFIG = {
  // 기본 프로필 정보
  profile: {
    name: "starcastleJIN",
    role: "Developer & Creator",
    bio: "기술로 일상의 문제를 해결하고 지식을 기록하는 개발자입니다. 깔끔한 코드와 가치 있는 프로덕트를 지향합니다.",
    avatar: "https://github.com/starcastleJIN.png", // GitHub 프로필 이미지 자동 연동
    location: "Seoul, Republic of Korea",
    email: "jsgyu0223@gmail.com",
    githubUsername: "starcastleJIN",
  },

  // 소셜 및 링크
  socials: {
    github: "https://github.com/starcastleJIN",
    linkedin: "", // 필요시 입력 (예: https://linkedin.com/in/아이디)
    twitter: "",
    instagram: "",
    email: "mailto:jsgyu0223@gmail.com",
  },

  // 기술 스택 (Skills)
  skills: [
    {
      category: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Tailwind CSS"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Python", "PostgreSQL", "REST API"]
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "GitHub Actions", "Docker", "VS Code", "Vercel"]
    }
  ],

  // 대표 프로젝트 (Featured Projects)
  projects: [
    {
      id: "project-1",
      title: "AI 기반 스마트 북마크 매니저",
      description: "웹 브라우저에서 저장한 방대한 링크를 AI가 카테고리별로 자동 분류하고 요약해 주는 생산성 서비스입니다.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Node.js"],
      demoUrl: "https://starcastlejin.github.io",
      githubUrl: "https://github.com/starcastleJIN/starcastleJIN.github.io",
      featured: true
    },
    {
      id: "project-2",
      title: "실시간 협업 마크다운 에디터",
      description: "Websocket 기술을 활용하여 여러 사용자가 동시에 하나의 문서를 편집하고 미리볼 수 있는 실시간 웹 에디터입니다.",
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
