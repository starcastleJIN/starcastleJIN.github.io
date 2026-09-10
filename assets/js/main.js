/**
 * 공통 스크립트: 테마 토글(다크모드), 모바일 네비게이션, 공통 링크 동기화
 */

(function () {
  // 1. 테마 초기화 (다크 / 라이트)
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    updateThemeIcons();
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcons();
  }

  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains("dark");
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.innerHTML = isDark
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      btn.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
    });
  }

  // 2. 모바일 메뉴 토글 & 접근성 최적화
  function initMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!toggleBtn || !mobileMenu) return;

    const openIcon = toggleBtn.querySelector(".icon-menu-open");
    const closeIcon = toggleBtn.querySelector(".icon-menu-close");

    function setMenuState(open) {
      if (open) {
        mobileMenu.classList.remove("hidden");
        toggleBtn.setAttribute("aria-expanded", "true");
        if (openIcon && closeIcon) {
          openIcon.classList.add("hidden");
          closeIcon.classList.remove("hidden");
        }
      } else {
        mobileMenu.classList.add("hidden");
        toggleBtn.setAttribute("aria-expanded", "false");
        if (openIcon && closeIcon) {
          openIcon.classList.remove("hidden");
          closeIcon.classList.add("hidden");
        }
      }
    }

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains("hidden");
      setMenuState(isHidden);
    });

    // 메뉴 항목 클릭 시 자동으로 닫히도록
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        setMenuState(false);
      }
    });

    // ESC 키 입력 시 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setMenuState(false);
      }
    });

    // 화면 너비가 데스크톱(768px 이상)으로 확장되면 자동 닫기
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setMenuState(false);
      }
    });
  }

  // 3. 사이트 공통 브랜딩 동기화
  function applySiteConfig() {
    if (typeof SITE_CONFIG === "undefined") return;

    const { profile, socials } = SITE_CONFIG;

    // 사이트 로고 / 타이틀
    document.querySelectorAll(".site-author-name").forEach((el) => {
      el.textContent = profile.name.split(" ")[0] || profile.name;
    });

    // 푸터 저작권
    const copyrightYear = document.getElementById("current-year");
    if (copyrightYear) {
      copyrightYear.textContent = new Date().getFullYear();
    }
    const footerAuthor = document.getElementById("footer-author");
    if (footerAuthor) {
      footerAuthor.textContent = profile.name;
    }

    // 소셜 링크
    document.querySelectorAll("a.social-github").forEach((el) => {
      el.href = socials.github || "#";
    });
    document.querySelectorAll("a.social-email").forEach((el) => {
      el.href = socials.email || `mailto:${profile.email}`;
    });
    document.querySelectorAll("a.social-linkedin").forEach((el) => {
      if (socials.linkedin) {
        el.href = socials.linkedin;
        el.style.display = "inline-flex";
      } else {
        el.style.display = "none";
      }
    });

    // 티스토리 / 외부 기술 블로그 링크 연동
    if (socials.blog) {
      document.querySelectorAll("a.blog-link").forEach((el) => {
        el.href = socials.blog;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      });
    }
  }

  // 4. 맨 위로 스크롤 버튼
  function initScrollToTop() {
    const scrollBtn = document.getElementById("scroll-to-top");
    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.remove("opacity-0", "pointer-events-none");
        scrollBtn.classList.add("opacity-100");
      } else {
        scrollBtn.classList.add("opacity-0", "pointer-events-none");
        scrollBtn.classList.remove("opacity-100");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5. 플로팅 커넥트 허브 (RnDcircle 스타일 빠른 문의 & 모달)
  function initConnectHub() {
    const btn = document.getElementById("connect-floating-btn");
    const modal = document.getElementById("connect-modal");
    const closeBtn = document.getElementById("close-connect-modal");
    const tooltip = document.getElementById("connect-tooltip");
    const closeTooltipBtn = document.getElementById("close-connect-tooltip");
    const chatIcon = document.getElementById("connect-btn-icon-chat");
    const closeIcon = document.getElementById("connect-btn-icon-close");
    const copyBtn = document.getElementById("copy-email-btn");
    const copyText = document.getElementById("copy-email-text");
    const heroChatTriggers = document.querySelectorAll(".trigger-connect-modal");

    if (!btn || !modal) return;

    function toggleModal(show) {
      const isOpen = modal.classList.contains("opacity-100");
      const nextState = show !== undefined ? show : !isOpen;

      if (nextState) {
        modal.classList.remove("opacity-0", "pointer-events-none", "translate-y-4", "scale-95");
        modal.classList.add("opacity-100", "pointer-events-auto", "translate-y-0", "scale-100");
        btn.setAttribute("aria-expanded", "true");
        if (chatIcon) chatIcon.classList.add("hidden");
        if (closeIcon) closeIcon.classList.remove("hidden");
        if (tooltip) tooltip.classList.add("hidden");
      } else {
        modal.classList.add("opacity-0", "pointer-events-none", "translate-y-4", "scale-95");
        modal.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0", "scale-100");
        btn.setAttribute("aria-expanded", "false");
        if (chatIcon) chatIcon.classList.remove("hidden");
        if (closeIcon) closeIcon.classList.add("hidden");
      }
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleModal();
    });

    heroChatTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleModal(true);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleModal(false);
      });
    }

    if (closeTooltipBtn && tooltip) {
      closeTooltipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tooltip.style.display = "none";
      });
    }

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!modal.contains(e.target) && !btn.contains(e.target)) {
        toggleModal(false);
      }
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggleModal(false);
      }
    });

    // Copy email with feedback
    if (copyBtn && copyText) {
      copyBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText("jsgyu0223@gmail.com");
          copyText.textContent = "복사 완료! ✓";
          setTimeout(() => {
            copyText.textContent = "이메일 복사";
          }, 2000);
        } catch (err) {
          copyText.textContent = "jsgyu0223@gmail.com";
        }
      });
    }
  }

  // DOM 로드 시 실행
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    applySiteConfig();
    initScrollToTop();
    initConnectHub();

    // 테마 토글 버튼 이벤트 등록
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });
  });
})();
