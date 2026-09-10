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

  // 기술 스택 (Skills - 실전 하드웨어, DSP 펌웨어, 모터제어 알고리즘, 계측 스택)
  skills: [
    {
      category: "Embedded & DSP",
      badge: "Firmware & MCU",
      color: "emerald",
      items: [
        "TI TMS320F28377D (C2000)",
        "TI TMS320F28379D",
        "STM32 (STMicroelectronics)",
        "C / Embedded C",
        "Code Composer Studio (CCS)",
        "레지스터 레벨 BSW 구현",
        "ePWM / ADC / DAC / ISR 최적화",
        "EasyDSP 실시간 튜닝"
      ]
    },
    {
      category: "Power Electronics & Circuit",
      badge: "Topology & Hardware",
      color: "teal",
      items: [
        "3-Level Vienna Rectifier (AC/DC)",
        "Full-Bridge LLC Resonant (DC/DC)",
        "Flyback SMPS (50W~60W)",
        "3-Level GaN Inverter",
        "DC-DC Buck Converter",
        "R2CD 스너버 수식 모델링",
        "OrCAD Capture",
        "PADS Logic / Layout (아트워크)"
      ]
    },
    {
      category: "Motor Control & Algorithms",
      badge: "Sensorless & Motion",
      color: "cyan",
      items: [
        "PMSM / IPMSM 센서리스 제어",
        "I-f 오픈루프 기동 알고리즘",
        "HPF 기반 능동 댐핑 (ζ=0.707)",
        "MTPA(최대토크/전류) 곡선 추정",
        "무정전 회생제동 (Blackout 보호)",
        "공조용 3kW EC-FAN 구동 제어",
        "16,000 RPM 초고속 제어"
      ]
    },
    {
      category: "Simulation & Instruments",
      badge: "Analysis & Lab Tools",
      color: "indigo",
      items: [
        "PLECS (ZVS 스위칭 해석)",
        "MATLAB / Simulink (근궤적 해석)",
        "PSIM",
        "CAN 통신 (PCAN-View, Explorer)",
        "오실로스코프 & 차동 프로브",
        "파워 애널라이저",
        "Double Pulse Test (DPT)"
      ]
    }
  ],

  // 대표 엔지니어링 프로젝트 쇼케이스 (4대 핵심 과제)
  projects: [
    {
      id: "project-ev-charger",
      title: "30kW급 EV 급속 충전기 전력변환 UNIT 개발",
      subtitle: "3-Phase 380V AC ➡️ 200V~1,000V DC 고효율 전력변환 모듈",
      partner: "㈜ 인피니티웍스 (산학과제)",
      period: "2022.05 – 2023.02",
      badge: "전력전자 & 토폴로지",
      badgeColor: "emerald",
      metrics: [
        { label: "출력 사양", value: "1,000V / 10A (10kW)" },
        { label: "주요 토폴로지", value: "Vienna + LLC + Flyback" },
        { label: "제어 컨트롤러", value: "TI TMS320F28377D (BSW)" }
      ],
      description: "삼상 380V 계통 전원을 인가받아 200V~1,000V 광범위 직류 출력을 생성하는 30kW급 전기차 급속 충전기 파워 유닛 개발 과제입니다. 3-Level Vienna 정류기, Full-Bridge LLC 공진형 컨버터, 60W급 다중 출력 Flyback 보조전원 회로를 설계하고 TI DSP 레지스터 레벨 BSW 펌웨어를 구현하여 1차년도 10kW 실증을 성공적으로 달성했습니다.",
      keyTasks: [
        "TMS320F28377D MCU 기반 제어기 보드 회로 설계 (OP-Amp ADC 센싱단, 3-State 버퍼 PWM, HW_Fault 하드웨어 인터록)",
        "Code Composer Studio(CCS) 환경에서 레지스터 레벨 BSW 펌웨어 구현 (ADC, CAN, ePWM, DAC, PLL, ISR 동기화 최적화)",
        "PLECS 시뮬레이션 및 400V 조건 24V/15V 60W급 다중 출력 Flyback 변압기 설계 및 전부하 실증",
        "PCAN-View 및 EasyDSP 기반 실시간 파라미터 모니터링 & CAN 제어 UI 환경 구축"
      ],
      techStack: ["TMS320F28377D", "Vienna Rectifier", "LLC Resonant", "Flyback SMPS", "Embedded C", "PADS", "PLECS", "PCAN"],
      links: [
        { label: "경력 & 학술 연계 ⬇", url: "#wonik-pne", type: "internal" }
      ],
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "project-vacuum-pump",
      title: "반도체 진공펌프용 IPMSM 센서리스 인버터 & 제어 SW",
      subtitle: "16,000 RPM 초고속 구동 및 Blackout 무정전 회생제동 보호 알고리즘",
      partner: "㈜ 이피티 & 에드워드 코리아",
      period: "2024.01 – 2024.08",
      badge: "모터 제어 & 알고리즘",
      badgeColor: "teal",
      metrics: [
        { label: "최대 운전속도", value: "16,000 RPM 초고속" },
        { label: "기동 절환 시간", value: "< 10초 (500 RPM)" },
        { label: "정전 유지 시간", value: "> 1초 (220V/240V)" }
      ],
      description: "고부하 반도체 공정용 진공펌프 AC 모터를 센서 없이 16,000 RPM까지 안정적으로 구동하는 전용 인버터 및 센서리스 제어 펌웨어입니다. 저속 진동을 억제하는 I-f 기동 제어와 예기치 못한 정전(Blackout) 발생 시 모터 운동 에너지를 회생시켜 제어보드 전원을 1초 이상 유지하는 보호 알고리즘을 개발했습니다.",
      keyTasks: [
        "MATLAB 시뮬레이션 기반 I-f 속도 지령 궤적 설계 및 10초 이내 500 RPM 도달 후 EEMF 센서리스 절환 시퀀스 검증",
        "DC 링크 200V 도달 시 음수 q축 전압 제어를 통한 무정전 회생제동 알고리즘 구현 (전원 차단 후 1초 이상 DSP 전원 220V/240V 유지)",
        "다이나모 4,000 RPM 시험 기반 MTPA(최대토크/전류) 운전 곡선 도출 및 d-q축 인덕턴스(Ld, Lq) 자기포화 특성 정밀 분석",
        "석사 학위논문 연계 및 전력전자학회논문지(KCI 등재지) 제1저자 논문 게재 (2025.06)"
      ],
      techStack: ["IPMSM Sensorless", "I-f Control", "Regenerative Braking", "MTPA", "C / Embedded C", "MATLAB", "Dynamo"],
      links: [
        { label: "KCI 논문지 원문 ↗", url: "https://doi.org/10.6113/TKPE.2025.30.3.215", type: "external" }
      ],
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "project-hmc-buck",
      title: "차량용 저전압 벅 컨버터 가변 주파수 디더링 EMI 노이즈 저감",
      subtitle: "주파수 확산(Spread Spectrum) 기법 기반 전도 노이즈 피크 저감 실증",
      partner: "현대자동차 (HMC) & KATECH",
      period: "2024.05 – 2024.08",
      badge: "차량 전력전자 & EMI",
      badgeColor: "cyan",
      metrics: [
        { label: "대상 회로", value: "차량용 DC-DC 벅" },
        { label: "적용 기법", value: "주파수 디더링" },
        { label: "검증 결과", value: "EMI 피크 저감" }
      ],
      description: "차량 배터리 전원단과 연결되는 직류-직류(DC-DC) 벅 컨버터의 스위칭 하모닉 노이즈를 저감하기 위해 가변 주파수 디더링(Frequency Dithering) 알고리즘을 설계하고 파형으로 실증한 현대자동차 기술용역 산학 프로젝트입니다.",
      keyTasks: [
        "TI TMS320F28379D 런치패드 및 전력용 벅 컨버터 기반 실시간 하드웨어 테스트 벤치 구축",
        "각도 변수(Theta)와 변조 진폭(Amp)을 실시간 갱신하는 정현파 주파수 변조(Dithering) C 펌웨어 구현",
        "단일 주파수 구동 대비 특정 고조파 피크 에너지를 넓은 대역으로 분산시켜 전도 노이즈(EMI) 피크의 현저한 감소 확인",
        "PCAN-Explorer 기반 차량 통신 환경 구성, 모니터링 ID 할당 및 실시간 파라미터 계측 환경 완비"
      ],
      techStack: ["TMS320F28379D", "DC-DC Buck", "Frequency Dithering", "EMI/EMC", "Voltage PI Control", "PCAN-Explorer"],
      links: [
        { label: "경력 & 학술 연계 ⬇", url: "#experience", type: "internal" }
      ],
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "project-r2cd-snubber",
      title: "플라이백 컨버터 서지 전압 저감 R2CD 스너버 수식 모델링 & 실증",
      subtitle: "변압기 누설 인덕턴스 공진 억제 최적 댐핑 저항 설계 및 논문 게재",
      partner: "IEEE Access & KIPE",
      period: "2023.07 – 2024.09",
      badge: "수식 모델링 & SCI 저널",
      badgeColor: "indigo",
      metrics: [
        { label: "국제 저널", value: "IEEE Access 제1저자" },
        { label: "시험 사양", value: "400V ➡️ 56W 실증" },
        { label: "등재 구분", value: "SCI 국제 학술지" }
      ],
      description: "고전압 플라이백 컨버터의 스위치 오프 시 발생하는 고전압 서지와 기생 공진을 억제하기 위해, 기존 RCD 스너버 커패시터에 댐핑 저항을 추가한 R2CD 스너버의 물리적 상태방정식을 유도하고 최적 설계 해법을 제시한 연구입니다. 서지 전압 억제 효과와 스너버 전력 손실 간의 트레이드오프를 수식화하고 하드웨어 실험으로 오차를 실증했습니다.",
      keyTasks: [
        "플라이백 스위치 턴오프 과도상태 2계 미분방정식 상태공간 모델링 및 폐루프 수식 유도",
        "서지 전압 피크치 저감과 스너버 저항 손실 증가 사이의 트레이드오프를 평가하는 목적함수(Cost Function) 정식화",
        "400V 입력, 24V/15V 다중 출력 56W급 하드웨어 보드 제작 및 스위칭 전압/전류 파형 실측 검증",
        "IEEE Access (Vol. 12, pp. 163671–163681) 제1저자 논문 게재 및 2023 KIPE 포스터 발표 완료"
      ],
      techStack: ["Flyback Converter", "R2CD Snubber", "Surge Suppression", "Mathematical Modeling", "IEEE Access (SCI)", "Circuit Lab"],
      links: [
        { label: "IEEE Access 원문 읽기 ↗", url: "https://doi.org/10.1109/ACCESS.2024.3458191", type: "external" }
      ],
      thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80"
    }
  ],

  // 경력 및 활동 이력 (2-Tier Hierarchical Timeline: 대분류 기관/학위 ➡️ 중분류 세부 프로젝트/연구/수상)
  experiences: [
    {
      id: "wonik-pne",
      tier: "major",
      period: "2026.01 - 현재",
      organization: "원익피앤이 (WONIK PNE)",
      degree: "전력 제어 그룹 (Power Control Group)",
      subInfo: "연구원 / 전력전자 제어 엔지니어 (재직 중)",
      summary: "2차전지 활성화(Formation & Cycler) 충방전 전력변환 시스템 제어 알고리즘 및 임베디드 펌웨어 개발",
      subItems: [
        {
          category: "양산/개발",
          categoryType: "project",
          title: "2차전지 충방전 전력변환 시스템 제어 및 임베디드 펌웨어 개발",
          period: "2026.01 - 현재",
          description: "2차전지 제조 공정용 고효율 충방전기(Formation & Cycler) 전력변환 제어 알고리즘 설계 및 DSP 펌웨어 구현, 제어 루프 안정성 및 전력 품질 최적화.",
          tags: ["2차전지", "충방전기", "전력변환제어", "임베디드SW", "WONIK PNE"]
        }
      ]
    },
    {
      id: "keti",
      tier: "major",
      period: "2025.02 - 2025.12",
      organization: "한국전자기술연구원 (KETI)",
      degree: "연구원 (Researcher)",
      subInfo: "전력제어시스템연구센터 (전력전자제어시스템)",
      summary: "공조용 PMSM 고속 구동 및 차세대 차량용 GaN 3-Level 인버터 특성 해석·하드웨어 실증 연구",
      subItems: [
        {
          category: "연구과제",
          categoryType: "research",
          title: "공조용 3kW급 PMSM EC-FAN 개발과제 참여",
          period: "2025.02 - 2025.12",
          description: "외륜형 SPMSM을 적용한 3,200 RPM / 8Nm 기동 파형 실증 실험 및 인버터 제어 보드 하드웨어 디버깅 수행.",
          tags: ["KETI", "PMSM", "EC-FAN", "하드웨어 디버깅", "모터제어"]
        },
        {
          category: "연구과제",
          categoryType: "research",
          title: "차량용 3-Level GaN Inverter 개발과제 참여",
          period: "2025.02 - 2025.12",
          description: "완성된 기구물 3-Level GaN 인버터 모듈의 스위칭 특성 분석을 위한 Double Pulse Test(DPT) 진행 및 스위칭 노이즈 정밀 측정.",
          tags: ["KETI", "GaN 전력반도체", "3-Level Inverter", "DPT 테스트", "노이즈 측정"]
        }
      ]
    },
    {
      id: "grad-school",
      tier: "major",
      period: "2023.03 - 2024.08",
      organization: "한남대학교 일반대학원 전기전자공학과",
      degree: "공학석사 (M.S.)",
      subInfo: "전력전자 및 모터제어 연구실 (지도교수: 최종원)",
      summary: "전력변환 회로 토폴로지(Vienna/LLC/Flyback) 해석·설계 및 초고속 IPMSM 센서리스 제어 알고리즘 집중 연구",
      subItems: [
        {
          category: "산학 과제",
          categoryType: "project",
          title: "전기차용 30kW급 급속 충전기 개발 과제 (1차년도 10kW 달성)",
          period: "2022.05 - 2023.02",
          description: "㈜인피니티웍스 산학 과제. 3-Level Vienna Rectifier(AC/DC) + Full-Bridge LLC Resonant(DC/DC) 및 60W Flyback SMPS 보조전원 회로 설계. TI TMS320F28377D DSP 제어보드(PADs) 및 레지스터 인터럽트 최적화 펌웨어(CCS) 구현.",
          tags: ["TI F28377D", "Vienna Rectifier", "LLC Resonant", "Flyback SMPS", "CAN"]
        },
        {
          category: "학술발표",
          categoryType: "research",
          title: "2023 전력전자학술대회(KIPE) 포스터 발표",
          period: "2023.07",
          description: "플라이백 컨버터의 스위칭 서지 전압 저감을 위한 R2CD 스너버 회로 최적 설계 기법 포스터 발표.",
          tags: ["전력전자학회(KIPE)", "포스터 발표", "플라이백 컨버터", "R2CD 스너버"],
          links: [
            { label: "전력전자학회(KIPE) 바로가기", url: "https://www.kipe.or.kr/" }
          ]
        },
        {
          category: "산학 과제",
          categoryType: "project",
          title: "반도체 진공펌프용 IPMSM 구동 인버터 & 센서리스 제어 SW 개발",
          period: "2024.01 - 2024.08",
          description: "㈜이피티 & 에드워드 코리아 산학 과제. 10초 이내 500 RPM 도달하는 I-f 기동 및 16,000 RPM 초고속 센서리스 안정화 달성. 정전 시 모터 회생 에너지를 활용해 DSP 제어보드 전원을 1초 이상 유지하는 Blackout 방지 알고리즘 개발.",
          tags: ["IPMSM", "센서리스 모터제어", "16,000 RPM", "I-f 기동", "무정전 회생제동"]
        },
        {
          category: "산학협력",
          categoryType: "industry",
          title: "현대자동차(HMC) 기술용역 차량용 저전압 벅 컨버터 노이즈 저감",
          period: "2024.05 - 2024.08",
          description: "한국자동차연구원(KATECH) 기술용역 과제. 차량 배터리단 저전압 벅 컨버터 구동 및 주파수 디더링(Frequency Dithering) 알고리즘 설계를 통해 피크 하모닉 노이즈 저감 실증.",
          tags: ["현대자동차", "KATECH", "DC-DC 벅 컨버터", "주파수 디더링", "EMI 노이즈 저감"]
        },
        {
          category: "학술발표",
          categoryType: "research",
          title: "2024 전력전자학술대회(KIPE) 오랄 세션 구두 발표",
          period: "2024.07",
          description: "매입형 영구자석 전동기(IPMSM) 고부하 기동 시 속도 진동 저감을 위한 I-f 제어 방안 구두 발표 (오랄 세션). 테일러 급수 선형화 및 근궤적 해석 기반 감쇠비 0.707 최적 댐핑 제어 검증.",
          tags: ["전력전자학회(KIPE)", "오랄 발표", "IPMSM", "I-f 제어"],
          links: [
            { label: "전력전자학회(KIPE) 바로가기", url: "https://www.kipe.or.kr/" }
          ]
        },
        {
          category: "학술연구",
          categoryType: "research",
          title: "국제저널 IEEE Access (SCI 1저자) & 전력전자학회논문지 (KCI 1저자) 게재",
          period: "2024.09 & 2025.06",
          description: "플라이백 스너버 댐핑 저항 수식 최적화 모델링(IEEE Access, 등재일: 2024.09.11) 및 IPMSM 고부하 기동 시 감쇠비 0.707 최적 댐핑 게인 기반 속도 진동 저감 능동 제어(전력전자학회논문지, 게재일: 2025.06 & 석사학위논문).",
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
      period: "2017.03 - 2023.02",
      organization: "한남대학교 공과대학 전기전자공학과",
      degree: "공학학사 (B.S.)",
      subInfo: "전력전자 전공 트랙",
      summary: "전기전자공학 기초 회로이론, 전력변환 회로 및 마이크로프로세서 제어 기반 구축",
      subItems: [
        {
          category: "학부연구생",
          categoryType: "research",
          title: "모터제어 및 전력변환연구실 학부연구생",
          period: "2021.08 - 2022.02",
          description: "전력전자 및 모터제어 연구실(최종원 교수님) 학부연구생으로서 전력변환 토폴로지 및 임베디드 제어 기초 연구 수행.",
          tags: ["학부연구생", "전력변환", "모터제어"]
        },
        {
          category: "경진대회 수상",
          categoryType: "award",
          title: "HCS 메가시티 실전문제연구단 연합경진대회 장려상 & HNU 캡스톤디자인 발표회 은상",
          period: "2022.05 - 2023.02",
          description: "'사랑의 배터리' 팀장으로서 산업체 연계 배터리 충전 전력변환 시스템(AC/DC+DC/DC) 개발 총괄. PLECS ZVS 시뮬레이션 기반 최적 스위칭 주파수 선정 및 순수 C언어 레지스터 제어 펌웨어 구현 (2022.11 연합경진대회 장려상 & 교내 캡스톤 은상 수상).",
          tags: ["사랑의 배터리 팀장", "배터리 충전기", "PLECS ZVS", "연합경진대회 장려상", "캡스톤 은상"]
        }
      ]
    }
  ]
};

// 브라우저 전역 객체로 내보내기
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
