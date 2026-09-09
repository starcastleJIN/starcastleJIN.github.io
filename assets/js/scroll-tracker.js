/**
 * Hallmark Floating Scroll Tracker & Dynamic Section Focus Navigator
 * - 휠 스크롤 시 화면 우측에 실시간 위치 표시 바 및 대제목 네비게이션 제공
 * - 현재 화면에 가까워질수록 대제목 확대(Scale-up), 선명화 및 로즈 레드 강조
 * - 비활성 영역은 음영(Dimmed) 처리 및 축소
 * - 클릭 시 스무스 스크롤 이동
 */

(function () {
  const SECTIONS = [
    { id: "profile-section", title: "01. Profile" },
    { id: "skills-section", title: "02. Tech Stack" },
    { id: "philosophy-section", title: "03. Philosophy" },
    { id: "projects", title: "04. Projects" },
    { id: "career-connect-section", title: "05. Career", subTitle: "& Connect" }
  ];

  function initFloatingTracker() {
    const trackerContainer = document.getElementById("floating-scroll-tracker");
    if (!trackerContainer) return;

    // 1. 유효한 섹션 엘리먼트 필터링
    const validSections = SECTIONS.map((sec) => ({
      ...sec,
      el: document.getElementById(sec.id)
    })).filter((sec) => sec.el !== null);

    if (validSections.length === 0) return;

    // 2. 트래커 마크업 생성 (두 줄 렌더링 지원)
    trackerContainer.innerHTML = `
      <nav class="tracker-nav" aria-label="페이지 섹션 네비게이션">
        ${validSections.map((sec) => `
          <a href="#${sec.id}" class="tracker-item" data-target="${sec.id}" title="${sec.title}${sec.subTitle ? ' ' + sec.subTitle : ''}">
            <span class="tracker-label">
              <span class="tracker-line-1">${sec.title}</span>
              ${sec.subTitle ? `<span class="tracker-line-2">${sec.subTitle}</span>` : ''}
            </span>
            <span class="tracker-dot"></span>
          </a>
        `).join("")}
      </nav>
      <div class="tracker-rail" id="tracker-rail">
        <div class="tracker-rail-indicator" id="tracker-rail-indicator"></div>
      </div>
    `;

    const items = trackerContainer.querySelectorAll(".tracker-item");
    const rail = document.getElementById("tracker-rail");
    const indicator = document.getElementById("tracker-rail-indicator");

    // 3. 클릭 시 부드러운 스크롤 이동
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.getAttribute("data-target");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          if (history.pushState) {
            history.pushState(null, null, `#${targetId}`);
          }
        }
      });
    });

    // 4. 스크롤 위치에 따른 실시간 근접 계산 및 다이내믹 포커스 애니메이션
    let ticking = false;

    function updateActiveSection() {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const focusLine = scrollY + vh * 0.42; // 시선이 가장 편안하게 머무는 상단 42% 지점

      let activeIndex = 0;
      let minDistance = Infinity;

      // 페이지 최하단 도달 검사 (푸터 혹은 마지막 행 도달 시 5번 섹션 안정적 유지)
      const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

      if (isBottom) {
        activeIndex = validSections.length - 1;
      } else {
        validSections.forEach((sec, idx) => {
          const rect = sec.el.getBoundingClientRect();
          const top = scrollY + rect.top;
          const bottom = top + rect.height;
          const center = (top + bottom) / 2;

          // 초점 라인과 섹션 중심 간의 거리 계산
          const distance = Math.abs(focusLine - center);

          // 현재 초점 라인이 섹션 영역 내에 포함되면 최우선
          if (focusLine >= top && focusLine <= bottom) {
            activeIndex = idx;
            minDistance = -1;
          } else if (minDistance !== -1 && distance < minDistance) {
            minDistance = distance;
            activeIndex = idx;
          }
        });
      }

      // 각 아이템 스타일 갱신
      items.forEach((item, idx) => {
        const label = item.querySelector(".tracker-label");
        if (idx === activeIndex) {
          item.classList.add("active");
          if (label) {
            label.style.opacity = "1";
            label.style.transform = "scale(1.18) translateX(-5px)";
          }
        } else {
          item.classList.remove("active");
          // 활성 섹션과의 거리(인덱스 차이)에 따른 부드러운 감쇠
          const diff = Math.abs(idx - activeIndex);
          if (label) {
            const scale = Math.max(0.85, 0.95 - diff * 0.05);
            const opacity = Math.max(0.28, 0.5 - diff * 0.08);
            label.style.opacity = opacity.toString();
            label.style.transform = `scale(${scale})`;
          }
        }
      });

      // 우측 트랙 레일 인디케이터 위치 갱신
      if (rail && indicator && validSections.length > 1) {
        const railHeight = rail.clientHeight;
        const indicatorHeight = indicator.clientHeight;
        const maxTop = railHeight - indicatorHeight;
        const step = maxTop / (validSections.length - 1);
        const targetTop = activeIndex * step;
        indicator.style.top = `${targetTop}px`;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // 초기 로드 시 1회 실행
    updateActiveSection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFloatingTracker);
  } else {
    initFloatingTracker();
  }
})();
