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

  // 2. 모바일 메뉴 토글
  function initMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // 메뉴 항목 클릭 시 자동으로 닫히도록
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }
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

  // DOM 로드 시 실행
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    applySiteConfig();
    initScrollToTop();

    // 테마 토글 버튼 이벤트 등록
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });
  });
})();
