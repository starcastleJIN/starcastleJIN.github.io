/**
 * 포트폴리오 벤토 그리드(Bento Grid) 데이터 렌더링 스크립트
 * Hallmark Macrostructure Architecture 준수
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONFIG === "undefined") return;

  renderBentoHero();
  renderCurrentlyLearning();
  renderBentoSkills();
  renderHeroPhilosophy();
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
    <li class="flex items-start gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
      <div class="mt-0.5 flex-shrink-0">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          ${escapeHTML(item.badge || "Key")}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1.5">
          <strong class="text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm leading-snug">
            ${escapeHTML(item.title || item.name)}
          </strong>
          ${item.doi ? `
            <a href="https://doi.org/${encodeURIComponent(item.doi)}" target="_blank" rel="noopener noreferrer" class="px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold transition-colors inline-flex items-center gap-0.5 flex-shrink-0" title="DOI 공식 원문 확인">
              DOI ↗
            </a>
          ` : ''}
        </div>
        ${item.highlight ? `
          <p class="text-slate-600 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
            ${escapeHTML(item.highlight)}
          </p>
        ` : ''}
      </div>
    </li>
  `).join("");

  container.innerHTML = `
    <div class="flex items-center justify-between mb-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
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
    <ul class="space-y-1 max-h-[295px] overflow-y-auto pr-1.5 custom-scrollbar">
      ${listHtml}
    </ul>
  `;
}

// 3. 벤토 위젯: 기술 스택 매트릭스 (4대 실전 엔지니어링 카테고리)
function renderBentoSkills() {
  const { skills } = SITE_CONFIG;
  const container = document.getElementById("bento-skills-container");
  if (!container || !skills) return;

  container.innerHTML = skills.map((group) => `
    <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group/skillcard shadow-xs">
      <div>
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <h4 class="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            ${escapeHTML(group.category)}
          </h4>
          ${group.badge ? `
            <span class="text-[10px] sm:text-[11px] font-bold tracking-tight px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              ${escapeHTML(group.badge)}
            </span>
          ` : ""}
        </div>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${group.items.map((skill) => `
            <span class="px-2.5 py-1 text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200/60 dark:border-slate-700 shadow-2xs hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              ${escapeHTML(skill)}
            </span>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

// 4. 히어로 카드 내 개발 철학 컴팩트 인라인 렌더링
/* Hallmark · pre-emit critique: P5 H4 E5 S5 R5 V4 */
function renderHeroPhilosophy() {
  const { philosophy } = SITE_CONFIG;
  const heroPhil = document.getElementById("hero-philosophy");
  if (!heroPhil || !philosophy) return;

  const ul = heroPhil.querySelector("ul");
  if (!ul) return;

  // 짧은 요약 매핑 (원문을 핵심 한 문장으로 압축)
  const shortDesc = [
    "시뮬레이션에 그치지 않고, 수식화→하드웨어 실증까지 오차를 끝까지 검증",
    "아날로그 기생 특성을 이해하고 DSP 레지스터·인터럽트를 정밀 제어",
    "블랙박스 라이브러리 없이 ADC→PWM→센서리스까지 바닥부터 C 코드 구현"
  ];

  ul.innerHTML = philosophy.map((item, i) => `
    <li class="flex items-start gap-2 text-[11px] sm:text-xs leading-snug py-0.5">
      <span class="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 flex-shrink-0">${item.number}</span>
      <span>
        <strong class="text-slate-800 dark:text-slate-100">${escapeHTML(item.title)}</strong>
        <span class="text-slate-500 dark:text-slate-400 ml-1">— ${escapeHTML(shortDesc[i] || item.desc)}</span>
      </span>
    </li>
  `).join("");
}

// 5. 대표 엔지니어링 프로젝트 쇼케이스 렌더링 (Hallmark Showcase Archetype)
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
function renderProjects() {
  const { projects } = SITE_CONFIG;
  const container = document.getElementById("projects-container");
  if (!container || !projects) return;

  const badgeColorMap = {
    emerald: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    teal: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
    cyan: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    indigo: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30"
  };

  container.innerHTML = projects.map((project, idx) => {
    const badgeClass = badgeColorMap[project.badgeColor] || badgeColorMap.emerald;

    return `
    <article class="group bento-card flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300">
      <div>
        <!-- Card Header Image & Overlay -->
        <div class="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <img 
            src="${escapeHTML(project.thumbnail)}" 
            alt="${escapeHTML(project.title)}" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
          
          <!-- Top Badges -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span class="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border backdrop-blur-md ${badgeClass}">
              ${escapeHTML(project.badge || "Engineering")}
            </span>
            <span class="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-900/80 text-slate-200 border border-slate-700/60 rounded-lg backdrop-blur-md">
              Project #0${idx + 1}
            </span>
          </div>

          <!-- Bottom Overlay Info (Partner & Period) -->
          <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium drop-shadow">
            <span class="flex items-center gap-1.5 font-semibold text-slate-100 truncate pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 flex-shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              ${escapeHTML(project.partner || "")}
            </span>
            <span class="font-mono text-[11px] text-slate-300 flex-shrink-0">
              ${escapeHTML(project.period || "")}
            </span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-6 sm:p-7">
          <!-- Title & Subtitle -->
          <div class="mb-4">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              ${escapeHTML(project.title)}
            </h3>
            ${project.subtitle ? `
              <p class="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                ${escapeHTML(project.subtitle)}
              </p>
            ` : ""}
          </div>

          <!-- Key Metrics Grid (Stat-Led Microcomponent) -->
          ${project.metrics && project.metrics.length > 0 ? `
            <div class="grid grid-cols-3 gap-2 p-3 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              ${project.metrics.map(m => `
                <div class="text-center">
                  <div class="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight">${escapeHTML(m.label)}</div>
                  <div class="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-100 font-mono mt-0.5">${escapeHTML(m.value)}</div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Description -->
          <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            ${escapeHTML(project.description)}
          </p>

          <!-- Key Tasks / Achievements Bullets -->
          ${project.keyTasks && project.keyTasks.length > 0 ? `
            <div class="space-y-2 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Key Engineering Achievements</span>
              ${project.keyTasks.map(task => `
                <div class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-normal">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span>${escapeHTML(task)}</span>
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>
      </div>

      <!-- Card Footer: Tags & Action Links -->
      <div class="px-6 pb-6 sm:px-7 sm:pb-7">
        <!-- Tech Stack Tags -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${(project.techStack || project.tags || []).map(tag => `
            <span class="px-2 py-0.5 text-[11px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-md border border-emerald-500/20">
              #${escapeHTML(tag)}
            </span>
          `).join("")}
        </div>

        <!-- Action Links -->
        <div class="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          ${(project.links || []).map(link => `
            <a 
              href="${escapeHTML(link.url)}" 
              ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}
              class="flex-1 text-center py-2.5 px-3 text-xs font-semibold rounded-xl transition-all shadow-sm ${
                link.type === 'external' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20' 
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60'
              }"
            >
              ${escapeHTML(link.label)}
            </a>
          `).join("")}
        </div>
      </div>
    </article>
    `;
  }).join("");
}

// 6. 경력 및 활동 타임라인 (2-Tier Hierarchical Timeline: 대분류 기관/학위 ➡️ 중분류 세부 프로젝트/연구/수상)
function renderExperiences() {
  const { experiences } = SITE_CONFIG;
  const container = document.getElementById("experience-container");
  if (!container || !experiences) return;

  const categoryBadgeStyles = {
    project: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30",
    industry: "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-500/30",
    research: "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-500/30",
    award: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-500/30"
  };

  container.innerHTML = `
    <div class="relative border-l-2 border-emerald-500/40 dark:border-emerald-500/30 ml-3 sm:ml-5 pl-6 sm:pl-8">
      ${experiences.map((exp) => `
        <div class="relative group/major chapter-container pb-0" data-chapter="${escapeHTML(exp.id || "")}">
          <!-- 대분류 틀고정 헤더 래퍼 (Sticky Header Wrap) -->
          <div class="sticky-chapter-header sticky top-20 sm:top-24 z-20 pt-1 pb-2">
            <!-- 대분류 노드 (Main Trunk Node) -->
            <div class="chapter-node absolute -left-[33px] sm:-left-[41px] top-5 sm:top-6 w-5 h-5 bg-emerald-600 dark:bg-emerald-500 rounded-full ring-4 ring-white dark:ring-slate-900 shadow-md flex items-center justify-center transition-all group-hover/major:scale-110">
              <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>

            <!-- 대분류 헤더 카드 (중분류가 아래로 지나갈 때 완벽히 가려지도록 불투명 배경 & 입체 그림자) -->
            <div class="chapter-card p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#0f172a]/95 border border-slate-200/90 dark:border-slate-800 shadow-md backdrop-blur-xl transition-all group-hover/major:border-emerald-500/40">
              <div class="chapter-top-bar flex flex-wrap items-center gap-2 mb-2 transition-all">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm font-mono">
                  ${escapeHTML(exp.period)}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  ${escapeHTML(exp.degree || exp.role || "")}
                </span>
              </div>

              <h3 class="chapter-title text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight transition-all">
                ${escapeHTML(exp.organization)}
              </h3>

              <!-- 틀고정 시 컴팩트 축소되는 세부 내용 영역 -->
              <div class="chapter-collapsible transition-all overflow-hidden">
                ${exp.subInfo ? `
                  <div class="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 flex-shrink-0 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    ${escapeHTML(exp.subInfo)}
                  </div>
                ` : ""}

                ${exp.summary ? `
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                    ${escapeHTML(exp.summary)}
                  </p>
                ` : ""}
              </div>
            </div>

            <!-- 아래쪽 투명 그라데이션 음영 (Fade Shade: 하위 경력 가독성 극대화) -->
            <div class="chapter-gradient-shade"></div>
          </div>

          <!-- 중분류 트리 (Inner Sub-branch Timeline) -->
          ${exp.subItems && exp.subItems.length > 0 ? `
            <div class="relative border-l-2 border-dashed border-slate-300 dark:border-slate-700/80 ml-2 sm:ml-4 pl-5 sm:pl-6 space-y-6 mt-3 pb-10 sm:pb-14">
              ${exp.subItems.map((item) => `
                <div class="relative group/item">
                  <!-- 중분류 노드 (Sub-branch Node) -->
                  <div class="absolute -left-[27px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900 group-hover/item:bg-emerald-500 group-hover/item:scale-125 transition-all"></div>

                  <!-- 중분류 상세 내용 -->
                  <div class="bg-white/90 dark:bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs hover:border-emerald-500/40 transition-all">
                    <div class="flex flex-wrap items-center gap-2 mb-1.5">
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-md ${categoryBadgeStyles[item.categoryType] || "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}">
                        ${escapeHTML(item.category)}
                      </span>
                      <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                        ${escapeHTML(item.period)}
                      </span>
                    </div>

                    <h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                      ${escapeHTML(item.title)}
                    </h4>

                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      ${escapeHTML(item.description)}
                    </p>

                    ${(item.tags && item.tags.length > 0) || (item.links && item.links.length > 0) ? `
                      <div class="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                        ${(item.tags || []).map((t) => `
                          <span class="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                            #${escapeHTML(t)}
                          </span>
                        `).join("")}
                        ${(item.links || []).map((lnk) => `
                          <a 
                            href="${escapeHTML(lnk.url)}" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded border border-emerald-500/20 transition-colors"
                          >
                            <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            ${escapeHTML(lnk.label)}
                          </a>
                        `).join("")}
                      </div>
                    ` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>
      `).join("")}
    </div>
  `;

  // 스티키 헤더 컴팩트 컨트롤러 초기화
  setupStickyChapterHeaders();
}

// 대분류 스티키 헤더 컴팩트 모드 & 그라데이션 음영 동적 컨트롤러
function setupStickyChapterHeaders() {
  const containers = document.querySelectorAll(".chapter-container");
  if (!containers.length) return;

  let ticking = false;

  function updateStickyStates() {
    const stickyThreshold = window.innerWidth >= 640 ? 96 : 80;

    containers.forEach((container) => {
      const header = container.querySelector(".sticky-chapter-header");
      if (!header) return;

      const containerRect = container.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();

      // 헤더가 상단 스티키 위치에 닿았고, 해당 챕터 하단이 완전히 지나가지 않았을 때
      const isStuck = headerRect.top <= (stickyThreshold + 4) && containerRect.bottom > (stickyThreshold + 60);

      if (isStuck) {
        header.classList.add("is-stuck");
      } else {
        header.classList.remove("is-stuck");
      }
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateStickyStates);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!ticking) {
      requestAnimationFrame(updateStickyStates);
      ticking = true;
    }
  }, { passive: true });

  updateStickyStates();
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
