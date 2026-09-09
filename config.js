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

  // 벤토 위젯 1: 핵심 역량 & 실적 요약 (Core Milestones & Verified Skills)
  coreHighlights: {
    title: "Core Milestones",
    subtitle: "핵심 역량 & 실적 요약",
    status: "Verified",
    items: [
      {
        badge: "Degree",
        title: "전기공학 공학석사 (M.S.)",
        highlight: "전력전자 & 모터제어 전공",
        skills: ["전력전자", "모터제어", "석사학위"]
      },
      {
        badge: "SCI 1저자",
        title: "IEEE Access 게재 (2024)",
        highlight: "R2CD 스너버 최적 수식 모델링",
        doi: "10.1109/ACCESS.2024.3458191",
        skills: ["Flyback SMPS", "스너버 최적화", "56W 하드웨어"]
      },
      {
        badge: "KCI 1저자",
        title: "전력전자학회지 등재 (2025)",
        highlight: "IPMSM 센서리스 댐핑 알고리즘",
        doi: "10.6113/TKPE.2025.30.3.215",
        skills: ["IPMSM", "I-f 센서리스", "능동 댐핑 제어"]
      },
      {
        badge: "HW 실증",
        title: "10kW EV & 16,000 RPM",
        highlight: "급속충전 UNIT & 진공펌프 인버터",
        skills: ["Vienna Rectifier", "LLC 공진", "16,000 RPM"]
      },
      {
        badge: "DSP & SW",
        title: "TI C2000 DSP 펌웨어 직접 개발",
        highlight: "레지스터/인터럽트 직접 구현",
        skills: ["TMS320F28377D", "Embedded C", "CAN 통신"]
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
      period: "2022.09 - 2024.08",
      role: "석사 연구원 (M.S. Researcher)",
      organization: "한남대학교 일반대학원 전력전자 및 모터제어 연구실",
      description: "10kW EV 급속 충전 UNIT(Vienna+LLC) DSP 제어보드 설계 및 펌웨어 개발, 반도체 진공펌프용 IPMSM 센서리스 인버터(16,000 RPM) 개발. IEEE Access(SCI) 및 전력전자학회지(KCI) 1저자 논문 게재."
    },
    {
      period: "2023.05 - 2023.11",
      role: "산학 프로젝트 연구원",
      organization: "현대자동차(HMC) 기술용역 산학협력",
      description: "차량용 저전압 벅 컨버터 구동 및 주파수 디더링(Frequency Dithering) 알고리즘 설계를 통한 전도/방사 EMI 스위칭 노이즈 저감 연구 수행."
    },
    {
      period: "2023.03 - 2023.12",
      role: "팀장 & SW 엔지니어",
      organization: "HCS 메가시티 실전문제연구단 (사랑의 배터리)",
      description: "산업체 연계 배터리 충전용 전력변환 시스템 개발. PLECS ZVS 시뮬레이션 및 순수 C언어 레지스터 제어 펌웨어 직접 구현 (연합경진대회 장려상 & HNU 캡스톤 동상 수상)."
    }
  ]
};

// 브라우저 전역 객체로 내보내기
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
