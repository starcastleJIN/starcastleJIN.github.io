/**
 * 사이트 기본 정보 및 개인 프로필 설정
 * starcastleJIN 님의 취향과 인터뷰 결과에 맞게 구성된 설정 파일입니다.
 */
const SITE_CONFIG = {
  // 기본 프로필 정보
  profile: {
    name: "진성규 (Seonggyu Jin)",
    role: "전력전자 & 모터제어 임베디드 SW 엔지니어",
    tagline: "수식적 모델링에서 DSP 펌웨어 및 하드웨어 실증까지, 전 과정을 아우르는 엔지니어링",
    bio: "전기공학 석사(전력전자 및 모터 제어 연구실) 출신으로, 3-Level Vienna Rectifier / Full-Bridge LLC / Flyback SMPS 회로 설계부터 TI C2000 DSP 기반 PMSM/IPMSM 센서리스(I-f 제어) 펌웨어 알고리즘 개발까지 전 과정을 주도합니다.",
    avatar: "https://github.com/starcastleJIN.png", // 모던 아바타 유지
    location: "Daejeon / Seoul, Republic of Korea",
    email: "jsgyu0223@gmail.com",
    githubUsername: "starcastleJIN",
    statusText: "Available for HW/SW Engineering Projects"
  },

  // 소셜 및 링크
  socials: {
    github: "https://github.com/starcastleJIN",
    linkedin: "", // 필요시 입력
    twitter: "",
    email: "mailto:jsgyu0223@gmail.com",
    blog: "https://power-n-life.tistory.com" // 티스토리 블로그 (로그 & 라이프 아카이브)
  },

  // 벤토 위젯 1: 핵심 경력 요약 (Core Milestones & Verified Highlights)
  coreHighlights: {
    title: "Core Milestones",
    subtitle: "핵심 경력 한눈에 보기",
    status: "Verified",
    items: [
      {
        badge: "Degree",
        name: "전기공학 공학석사 (M.S.)",
        desc: "한남대학교 일반대학원 전력전자 및 모터제어 연구실 (지도교수: 최종원)"
      },
      {
        badge: "SCI 1저자",
        name: "IEEE Access 국제저널 논문 게재 (2024)",
        desc: "Flyback R2CD 스너버 서지/손실 비용함수 최적 수식 모델링 및 56W 하드웨어 실증 (DOI: 10.1109/ACCESS.2024.3458191)"
      },
      {
        badge: "KCI 1저자",
        name: "전력전자학회논문지 등재 (2025.06)",
        desc: "IPMSM 센서리스 고부하 기동 속도 진동 저감을 위한 I-f 제어 능동 댐핑 알고리즘 (DOI: 10.6113/TKPE.2025.30.3.215)"
      },
      {
        badge: "Projects",
        name: "10kW EV 급속 충전 UNIT & 16k RPM 인버터",
        desc: "Vienna+LLC+Flyback 전력변환 장치 및 반도체 진공펌프 TI C2000 DSP 펌웨어 직접 구현"
      },
      {
        badge: "Honors",
        name: "HCS 메가시티 경진대회 장려상 & HNU 동상",
        desc: "산업체 연계 배터리 충전 전력변환 시스템 개발 및 알고리즘 구현 (2023)"
      }
    ]
  },

  // 벤토 위젯 2: 개발 철학 (Engineering Principles)
  philosophy: [
    {
      number: "01",
      title: "수식적 모델링과 하드웨어 실증",
      enTitle: "Empirical Proof",
      desc: "단순 시뮬레이션에 그치지 않고, 물리적 상태방정식과 비용함수를 수식화하여 56W~10kW급 하드웨어 실험으로 오차와 경향성을 끝까지 검증합니다."
    },
    {
      number: "02",
      title: "HW 회로와 DSP 펌웨어의 유기적 융합",
      enTitle: "HW/SW Convergence",
      desc: "전력 반도체의 기생 인덕턴스·스위칭 서지 등 아날로그 특성을 깊이 이해하고, TI C2000 DSP의 레지스터와 인터럽트를 정밀 제어하여 시스템 한계를 극복합니다."
    },
    {
      number: "03",
      title: "라이브러리 탈피와 핵심 제어 기술 내재화",
      enTitle: "Core Control In-House",
      desc: "상용 블랙박스 라이브러리에 기대지 않고, ADC 샘플링·PWM 제어부터 I-f 센서리스 알고리즘까지 바닥부터 C 코드로 직접 구현하여 독자적 제어권을 확보합니다."
    }
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
