/**
 * 사이트 기본 정보 및 개인 프로필 설정
 * starcastleJIN 님의 취향과 인터뷰 결과에 맞게 구성된 설정 파일입니다.
 */
const SITE_CONFIG = {
  // 기본 프로필 정보
  profile: {
    name: "진성규 (Sunggyu Jin)",
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
        highlight: "전력전자 & 모터제어 전공"
      },
      {
        badge: "SCI 1저자",
        title: "IEEE Access 게재 (2024)",
        highlight: "R2CD 스너버 최적 수식 모델링",
        doi: "10.1109/ACCESS.2024.3458191"
      },
      {
        badge: "KCI 1저자",
        title: "전력전자학회지 등재 (2025)",
        highlight: "IPMSM 센서리스 댐핑 알고리즘",
        doi: "10.6113/TKPE.2025.30.3.215"
      },
      {
        badge: "HW 실증",
        title: "10kW EV & 16,000 RPM",
        highlight: "급속충전 UNIT & 진공펌프 인버터"
      },
      {
        badge: "DSP & SW",
        title: "TI C2000 DSP 펌웨어 개발",
        highlight: "레지스터 및 인터럽트 최적 제어 구현"
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
      desc: "상용 블랙박스 라이브러리에 의존하지 않고, ADC 샘플링·PWM 제어부터 I-f 센서리스 알고리즘까지 바닥부터 C 코드로 구현하여 독자적 제어권을 확보합니다."
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

  // 경력 및 활동 이력 (2-Tier Hierarchical Timeline: 대분류 기관/학위 ➡️ 중분류 세부 프로젝트/연구/수상)
  experiences: [
    {
      id: "wonik-pne",
      tier: "major",
      period: "2024.09 - 현재",
      organization: "원익피앤이 (WONIK PNE)",
      degree: "전력 제어 그룹 (Power Control Group)",
      subInfo: "연구원 / 전력전자 제어 엔지니어 (재직 중)",
      summary: "2차전지 활성화(Formation & Cycler) 충방전 전력변환 시스템 제어 알고리즘 및 임베디드 펌웨어 개발",
      subItems: [
        {
          category: "양산/개발",
          categoryType: "project",
          title: "2차전지 충방전 전력변환 시스템 제어 및 임베디드 펌웨어 개발",
          period: "2024.09 - 현재",
          description: "2차전지 제조 공정용 고효율 충방전기(Formation & Cycler) 전력변환 제어 알고리즘 설계 및 펌웨어 구현, 제어 루프 안정성 및 전력 품질 최적화.",
          tags: ["2차전지", "충방전기", "전력변환제어", "임베디드SW", "WONIK PNE"]
        }
      ]
    },
    {
      id: "keti",
      tier: "major",
      period: "2024",
      organization: "한국전자기술연구원 (KETI)",
      degree: "연구원 (Researcher)",
      subInfo: "전력변환 및 에너지 제어 시스템 연구",
      summary: "신재생 에너지 및 산업용 전력변환 시스템 제어 알고리즘 연구 및 회로 토폴로지 해석·검증",
      subItems: [
        {
          category: "연구과제",
          categoryType: "research",
          title: "전력변환 및 지능형 에너지 제어 시스템 연구",
          period: "2024",
          description: "에너지 변환 효율 향상을 위한 전력전자 토폴로지 분석 및 시뮬레이션, 제어 알고리즘 검증 연구 수행.",
          tags: ["KETI", "전력변환", "에너지제어", "토폴로지해석"]
        }
      ]
    },
    {
      id: "grad-school",
      tier: "major",
      period: "2022.09 - 2024.08",
      organization: "한남대학교 일반대학원 전기전자공학과",
      degree: "공학석사 (M.S.)",
      subInfo: "전력전자 및 모터제어 연구실 (지도교수: 최종원)",
      summary: "전력변환 회로 토폴로지(Vienna/LLC/Flyback) 해석·설계 및 초고속 IPMSM 센서리스 제어 알고리즘 집중 연구",
      subItems: [
        {
          category: "프로젝트",
          categoryType: "project",
          title: "10kW급 EV 급속 충전 스테이션 전력변환 UNIT 개발",
          period: "2022.09 - 2024.08",
          description: "3-Level Vienna Rectifier(AC/DC) + Full-Bridge LLC Resonant Converter(DC/DC) 및 50W Flyback SMPS 보조전원 회로 설계. TI TMS320F28377D DSP 제어보드(OrCAD/PADS) 설계 및 C언어 레지스터 기반 인터럽트 최적화 펌웨어(CCS) 구현 및 검증.",
          tags: ["TI F28377D", "Vienna Rectifier", "LLC Resonant", "Flyback SMPS", "CAN"]
        },
        {
          category: "프로젝트",
          categoryType: "project",
          title: "반도체 진공펌프용 IPMSM 구동 인버터 & 센서리스 제어 SW 개발",
          period: "2023.01 - 2024.06",
          description: "고부하 반도체 진공펌프용 AC 모터 인버터 구동. 10초 이내 500 RPM 도달하는 I-f 기동 알고리즘 및 16,000 RPM 초고속 센서리스 제어 안정화 달성. 정전 발생 시 관성 에너지를 회생시켜 DSP 제어보드 전원을 1초 이상 유지하는 무정전 보호 알고리즘 개발.",
          tags: ["IPMSM", "센서리스 모터제어", "16,000 RPM", "I-f 기동", "무정전 회생제동"]
        },
        {
          category: "산학협력",
          categoryType: "industry",
          title: "현대자동차(HMC) 기술용역 차량용 저전압 벅 컨버터 노이즈 저감",
          period: "2023.05 - 2023.11",
          description: "차량용 배터리단 저전압 벅 컨버터 구동 및 주파수 디더링(Frequency Dithering) 제어 알고리즘 설계를 통해 특정 스위칭 주파수 대역의 전도/방사 EMI 노이즈 Peak 분산 및 저감 실증.",
          tags: ["현대자동차", "DC-DC 벅 컨버터", "주파수 디더링", "EMI 노이즈 저감"]
        },
        {
          category: "학술연구",
          categoryType: "research",
          title: "국제저널 IEEE Access (SCI 1저자) & 전력전자학회논문지 (KCI 1저자) 게재",
          period: "2024.09 & 2025.06",
          description: "플라이백 스너버 댐핑 저항 수식 최적화 모델링(IEEE Access, DOI: 10.1109/ACCESS.2024.3458191) 및 IPMSM 고부하 기동 시 감쇠비 0.707 최적 댐핑 게인 기반 속도 진동 저감 능동 제어(전력전자학회논문지, DOI: 10.6113/TKPE.2025.30.3.215 & 석사학위논문).",
          tags: ["IEEE Access (SCI)", "전력전자학회지 (KCI)", "석사 학위논문", "R2CD 스너버"],
          links: [
            { label: "IEEE Access 원문", url: "https://doi.org/10.1109/ACCESS.2024.3458191" },
            { label: "KCI 논문지 원문", url: "https://doi.org/10.6113/TKPE.2025.30.3.215" }
          ]
        }
      ]
    },
    {
      id: "undergrad",
      tier: "major",
      period: "2016.03 - 2022.08",
      organization: "한남대학교 공과대학 전기전자공학과",
      degree: "공학학사 (B.S.)",
      subInfo: "전력전자 전공 트랙",
      summary: "전기전자공학 기초 회로이론, 전력변환 및 마이크로프로세서 제어 기반 구축",
      subItems: [
        {
          category: "경진대회 수상",
          categoryType: "award",
          title: "HCS 메가시티 실전문제연구단 연합경진대회 장려상 & HNU 캡스톤디자인 동상",
          period: "2023.03 - 2023.12",
          description: "'사랑의 배터리' 팀장으로서 산업체 연계 배터리 충전용 전력변환 시스템 개발 총괄. PLECS 시뮬레이션 기반 ZVS 최적 스위칭 주파수 해석 및 순수 C언어 레지스터 제어 펌웨어 구현.",
          tags: ["사랑의 배터리 팀장", "배터리 충전기", "PLECS ZVS", "연합경진대회 장려상", "캡스톤 동상"]
        },
        {
          category: "학술발표",
          categoryType: "research",
          title: "2023 전력전자학술대회 포스터 발표",
          period: "2023.07",
          description: "플라이백 컨버터의 스위칭 서지 전압 저감을 위한 R2CD 스너버 회로 최적 설계 기법 포스터 발표.",
          tags: ["한국전력전자학회", "포스터 발표", "플라이백 컨버터"]
        }
      ]
    }
  ]
};

// 브라우저 전역 객체로 내보내기
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
