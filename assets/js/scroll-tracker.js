/**
 * Active Nav Highlight — 상단 네비게이션 스크롤 위치 기반 활성 섹션 강조
 * - 스크롤 위치에 따라 상단 헤더 nav 링크에 .nav-active 클래스 부여
 * - 소개&스택 → #about 영역 / 프로젝트 → #projects / 이력 → #experience
 * - 섹션 진입 시 에메랄드 강조 밑줄 + 폰트 굵기 애니메이션
 * - 모바일 메뉴 링크도 동기화
 */

(function () {
  // 섹션 ID → nav data-nav-section 속성값 매핑
  // #about는 <main id="about"> 이므로 profile-section을 포함 범위로 사용
  const SECTIONS = [
    { sectionId: "about",         navKey: "about"      }, // main#about
    { sectionId: "skills-section",navKey: "about"      }, // 스택도 소개 영역 취급
    { sectionId: "projects",      navKey: "projects"   },
    { sectionId: "experience",    navKey: "experience" }
  ];

  function initNavHighlight() {
    // 모든 nav-section-link 수집 (desktop + mobile)
    const navLinks = document.querySelectorAll(".nav-section-link");
    if (!navLinks.length) return;

    // 유효한 섹션 엘리먼트 맵
    const sectionEls = SECTIONS.map((s) => ({
      ...s,
      el: document.getElementById(s.sectionId)
    })).filter((s) => s.el !== null);

    if (!sectionEls.length) return;

    let ticking = false;

    function updateActive() {
      const scrollY  = window.scrollY;
      const vh       = window.innerHeight;
      // 시선 기준선: 화면 상단에서 38% 내려온 지점
      const focusY   = scrollY + vh * 0.38;

      // 페이지 최하단 도달 시 마지막 섹션 강제 활성
      const isBottom = (scrollY + vh) >= (document.documentElement.scrollHeight - 60);

      let activeKey = "";

      if (isBottom) {
        activeKey = sectionEls[sectionEls.length - 1].navKey;
      } else {
        let minDist = Infinity;
        sectionEls.forEach((sec) => {
          const rect   = sec.el.getBoundingClientRect();
          const top    = scrollY + rect.top;
          const bottom = top + rect.height;
          const center = (top + bottom) / 2;

          // 기준선이 섹션 내부에 있으면 최우선
          if (focusY >= top && focusY <= bottom) {
            activeKey = sec.navKey;
            minDist   = -1;
          } else if (minDist !== -1) {
            const dist = Math.abs(focusY - center);
            if (dist < minDist) {
              minDist   = dist;
              activeKey = sec.navKey;
            }
          }
        });
      }

      // nav 링크에 .nav-active 토글
      navLinks.forEach((link) => {
        const key = link.getAttribute("data-nav-section");
        if (key === activeKey) {
          link.classList.add("nav-active");
        } else {
          link.classList.remove("nav-active");
        }
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // 초기 1회 실행
    updateActive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavHighlight);
  } else {
    initNavHighlight();
  }
})();
