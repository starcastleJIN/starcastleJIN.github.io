/**
 * 포트폴리오 메인 페이지 데이터 렌더링 스크립트
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONFIG === "undefined") return;

  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderExperiences();
  renderRecentPosts();
});

// 1. Hero 섹션 렌더링
function renderHero() {
  const { profile } = SITE_CONFIG;

  const heroName = document.getElementById("hero-name");
  if (heroName) heroName.textContent = profile.name;

  const heroRole = document.getElementById("hero-role");
  if (heroRole) heroRole.textContent = profile.role;

  const heroBio = document.getElementById("hero-bio");
  if (heroBio) heroBio.textContent = profile.bio;

  const heroAvatar = document.getElementById("hero-avatar");
  if (heroAvatar && profile.avatar) {
    heroAvatar.src = profile.avatar;
    heroAvatar.alt = profile.name;
  }
}

// 2. About Me 섹션 렌더링
function renderAbout() {
  const { profile } = SITE_CONFIG;
  const aboutBio = document.getElementById("about-bio");
  if (aboutBio) {
    aboutBio.textContent = profile.bio;
  }

  const aboutLocation = document.getElementById("about-location");
  if (aboutLocation) {
    aboutLocation.textContent = profile.location;
  }

  const aboutEmail = document.getElementById("about-email");
  if (aboutEmail) {
    aboutEmail.textContent = profile.email;
    aboutEmail.href = `mailto:${profile.email}`;
  }
}

// 3. 기술 스택 (Skills) 렌더링
function renderSkills() {
  const { skills } = SITE_CONFIG;
  const skillsContainer = document.getElementById("skills-container");
  if (!skillsContainer || !skills) return;

  skillsContainer.innerHTML = skills.map((skillGroup) => `
    <div class="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover-card">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
        ${escapeHTML(skillGroup.category)}
      </h3>
      <div class="flex flex-wrap gap-2">
        ${skillGroup.items.map((skill) => `
          <span class="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200/60 dark:border-slate-700/50">
            ${escapeHTML(skill)}
          </span>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// 4. 대표 프로젝트 (Projects) 렌더링
function renderProjects() {
  const { projects } = SITE_CONFIG;
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer || !projects) return;

  projectsContainer.innerHTML = projects.map((project) => `
    <article class="group bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover-card flex flex-col">
      <div class="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img 
          src="${escapeHTML(project.thumbnail)}" 
          alt="${escapeHTML(project.title)}" 
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'"
        />
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          ${escapeHTML(project.title)}
        </h3>
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 flex-1">
          ${escapeHTML(project.description)}
        </p>
        
        <div class="flex flex-wrap gap-1.5 mb-6">
          ${project.tags.map((tag) => `
            <span class="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-md">
              #${escapeHTML(tag)}
            </span>
          `).join("")}
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-auto">
          ${project.demoUrl ? `
            <a 
              href="${escapeHTML(project.demoUrl)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              라이브 데모
            </a>
          ` : ""}
          ${project.githubUrl ? `
            <a 
              href="${escapeHTML(project.githubUrl)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
          ` : ""}
        </div>
      </div>
    </article>
  `).join("");
}

// 5. 경력 및 활동 (Timeline) 렌더링
function renderExperiences() {
  const { experiences } = SITE_CONFIG;
  const expContainer = document.getElementById("experience-container");
  if (!expContainer || !experiences) return;

  expContainer.innerHTML = `
    <div class="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 pl-6 space-y-8">
      ${experiences.map((exp) => `
        <div class="relative group">
          <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform"></div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            ${escapeHTML(exp.period)}
          </span>
          <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-2">
            ${escapeHTML(exp.role)} <span class="text-slate-500 font-normal">@ ${escapeHTML(exp.organization)}</span>
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
            ${escapeHTML(exp.description)}
          </p>
        </div>
      `).join("")}
    </div>
  `;
}

// 6. 최신 블로그 글 (Recent Posts) 미리보기 렌더링
async function renderRecentPosts() {
  const container = document.getElementById("recent-posts-container");
  if (!container) return;

  try {
    const res = await fetch("posts/posts.json");
    if (!res.ok) throw new Error("포스트 목록을 불러올 수 없습니다.");
    const posts = await res.json();

    const recent = posts.slice(0, 3);
    if (recent.length === 0) {
      container.innerHTML = `<p class="text-slate-500 text-center py-8">작성된 글이 없습니다.</p>`;
      return;
    }

    container.innerHTML = recent.map((post) => `
      <article class="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover-card flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <time datetime="${escapeHTML(post.date)}">${escapeHTML(post.date)}</time>
            <span>•</span>
            <span>${escapeHTML(post.readingTime || "3 min read")}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <a href="post.html?id=${encodeURIComponent(post.slug)}">
              ${escapeHTML(post.title)}
            </a>
          </h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 mb-4 leading-relaxed">
            ${escapeHTML(post.excerpt)}
          </p>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <div class="flex flex-wrap gap-1">
            ${post.tags.slice(0, 2).map((tag) => `
              <span class="text-xs text-slate-500 dark:text-slate-400">#${escapeHTML(tag)}</span>
            `).join(" ")}
          </div>
          <a 
            href="post.html?id=${encodeURIComponent(post.slug)}" 
            class="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 hover:underline"
          >
            읽기 →
          </a>
        </div>
      </article>
    `).join("");
  } catch (error) {
    console.error("Recent posts load error:", error);
    container.innerHTML = `<p class="text-slate-400 text-center py-6 text-sm">블로그 글을 불러오는 중 오류가 발생했습니다.</p>`;
  }
}

// XSS 방지 유틸리티
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
