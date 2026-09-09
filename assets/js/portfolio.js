/**
 * 포트폴리오 벤토 그리드(Bento Grid) 데이터 렌더링 스크립트
 * Hallmark Macrostructure Architecture 준수
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONFIG === "undefined") return;

  renderBentoHero();
  renderCurrentlyLearning();
  renderBentoSkills();
  renderPhilosophy();
  renderProjects();
  renderRecentPosts();
  renderExperiences();
});

// 1. 벤토 히어로 카드 렌더링
function renderBentoHero() {
  const { profile, socials } = SITE_CONFIG;

  const heroName = document.getElementById("hero-name");
  if (heroName) heroName.textContent = profile.name;

  const heroRole = document.getElementById("hero-role");
  if (heroRole) heroRole.textContent = profile.role;

  const heroBio = document.getElementById("hero-bio");
  if (heroBio) heroBio.textContent = profile.bio;

  const heroTagline = document.getElementById("hero-tagline");
  if (heroTagline) heroTagline.textContent = profile.tagline || profile.bio;

  const heroAvatar = document.getElementById("hero-avatar");
  if (heroAvatar && profile.avatar) {
    heroAvatar.src = profile.avatar;
    heroAvatar.alt = profile.name;
  }

  const heroStatus = document.getElementById("hero-status-text");
  if (heroStatus) {
    heroStatus.textContent = profile.statusText || "Available for collaboration";
  }

  const locationEl = document.getElementById("hero-location");
  if (locationEl) locationEl.textContent = profile.location;
}

// 2. 벤토 위젯: Core Milestones & Verified Skills
function renderCurrentlyLearning() {
  const data = SITE_CONFIG.coreHighlights || SITE_CONFIG.currentlyLearning;
  const container = document.getElementById("currently-learning-container");
  if (!container || !data) return;

  const listHtml = data.items.map((item) => `
    <li class="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-emerald-500/30 transition-all">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono flex-shrink-0">
            ${escapeHTML(item.badge || "Key")}
          </span>
          <strong class="text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm leading-snug">
            ${escapeHTML(item.title || item.name)}
          </strong>
        </div>
        ${item.doi ? `
          <a href="https://doi.org/${encodeURIComponent(item.doi)}" target="_blank" rel="noopener noreferrer" class="px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold transition-colors inline-flex items-center gap-0.5 flex-shrink-0" title="DOI 공식 원문 확인">
            DOI ↗
          </a>
        ` : ''}
      </div>
      ${item.highlight ? `
        <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
          ${escapeHTML(item.highlight)}
        </p>
      ` : ''}
      <div class="flex flex-wrap items-center gap-1.5 mt-2">
        ${(item.skills || []).map((skill) => `
          <span class="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
            #${escapeHTML(skill)}
          </span>
        `).join("")}
      </div>
    </li>
  `).join("");

  container.innerHTML = `
    <div class="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-2.5">
        <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </span>
        <div>
          <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-none">${escapeHTML(data.title || "Core Milestones")}</h3>
          <span class="text-[11px] text-slate-400 font-medium">${escapeHTML(data.subtitle || "핵심 역량 & 실적 요약")}</span>
        </div>
      </div>
      <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
        ${escapeHTML(data.status || "Verified")}
      </span>
    </div>
    <ul class="space-y-2">
      ${listHtml}
    </ul>
  `;
}

// 3. 벤토 위젯: 기술 스택 매트릭스
function renderBentoSkills() {
  const { skills } = SITE_CONFIG;
  const container = document.getElementById("bento-skills-container");
  if (!container || !skills) return;

  container.innerHTML = skills.map((group) => `
    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
      <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        ${escapeHTML(group.category)}
      </h4>
      <div class="flex flex-wrap gap-1.5">
        ${group.items.map((skill) => `
          <span class="px-2.5 py-1 text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200/60 dark:border-slate-700 shadow-2xs">
            ${escapeHTML(skill)}
          </span>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// 4. 벤토 위젯: 개발 철학 (My Principles)
function renderPhilosophy() {
  const { philosophy } = SITE_CONFIG;
  const container = document.getElementById("philosophy-container");
  if (!container || !philosophy) return;

  container.innerHTML = philosophy.map((item) => `
    <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 flex items-start gap-4 hover:border-emerald-500/40 transition-colors">
      <span class="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold text-base opacity-90">${item.number}</span>
      <div>
        <div class="flex flex-wrap items-baseline gap-2 mb-1.5">
          <h5 class="font-bold text-slate-900 dark:text-white text-sm sm:text-base">${escapeHTML(item.title)}</h5>
          ${item.enTitle ? `<span class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">${escapeHTML(item.enTitle)}</span>` : ''}
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">${escapeHTML(item.desc)}</p>
      </div>
    </div>
  `).join("");
}

// 5. 대표 프로젝트 렌더링
function renderProjects() {
  const { projects } = SITE_CONFIG;
  const container = document.getElementById("projects-container");
  if (!container || !projects) return;

  container.innerHTML = projects.map((project, idx) => `
    <article class="group bento-card flex flex-col justify-between">
      <div class="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img 
          src="${escapeHTML(project.thumbnail)}" 
          alt="${escapeHTML(project.title)}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'"
        />
        <div class="absolute top-3 right-3">
          <span class="bento-badge bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
            Featured #${idx + 1}
          </span>
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            ${escapeHTML(project.title)}
          </h3>
          <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            ${escapeHTML(project.description)}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1 mb-5">
            ${project.tags.map((tag) => `
              <span class="px-2 py-0.5 text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded">
                #${escapeHTML(tag)}
              </span>
            `).join("")}
          </div>

          <div class="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            ${project.demoUrl ? `
              <a 
                href="${escapeHTML(project.demoUrl)}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 text-center py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                라이브 데모
              </a>
            ` : ""}
            ${project.githubUrl ? `
              <a 
                href="${escapeHTML(project.githubUrl)}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 text-center py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                GitHub 코드
              </a>
            ` : ""}
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

// 6. 경력 및 활동 타임라인
function renderExperiences() {
  const { experiences } = SITE_CONFIG;
  const container = document.getElementById("experience-container");
  if (!container || !experiences) return;

  container.innerHTML = `
    <div class="relative border-l-2 border-emerald-500/30 ml-3 pl-6 space-y-7">
      ${experiences.map((exp) => `
        <div class="relative group">
          <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform"></div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            ${escapeHTML(exp.period)}
          </span>
          <h4 class="text-base font-bold text-slate-900 dark:text-white mt-1.5">
            ${escapeHTML(exp.role)} <span class="text-slate-400 font-normal">@ ${escapeHTML(exp.organization)}</span>
          </h4>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
            ${escapeHTML(exp.description)}
          </p>
        </div>
      `).join("")}
    </div>
  `;
}

// 7. 최신 블로그 글 미리보기
async function renderRecentPosts() {
  const container = document.getElementById("recent-posts-container");
  if (!container) return;

  try {
    const res = await fetch("posts/posts.json");
    if (!res.ok) throw new Error("포스트 목록을 불러올 수 없습니다.");
    const posts = await res.json();

    const recent = posts.slice(0, 3);
    container.innerHTML = recent.map((post) => `
      <article class="bento-card p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            <span class="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
              ${escapeHTML(post.category || "Tech")}
            </span>
            <span>•</span>
            <time datetime="${escapeHTML(post.date)}">${escapeHTML(post.date)}</time>
          </div>
          <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            <a href="post.html?id=${encodeURIComponent(post.slug)}">
              ${escapeHTML(post.title)}
            </a>
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            ${escapeHTML(post.excerpt)}
          </p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span class="text-slate-400">${escapeHTML(post.readingTime || "3 min")}</span>
          <a href="post.html?id=${encodeURIComponent(post.slug)}" class="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            글 읽기 →
          </a>
        </div>
      </article>
    `).join("");
  } catch (err) {
    console.error(err);
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
