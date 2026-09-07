/**
 * 블로그 목록 및 마크다운 포스트 뷰어 처리 스크립트
 */

let allPosts = [];
let activeTag = "all";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  // 현재 페이지 판별
  if (document.getElementById("blog-list-container")) {
    initBlogListPage();
  } else if (document.getElementById("post-article-container")) {
    initPostDetailPage();
  }
});

/* ==========================================================================
   1. 블로그 목록 페이지 (blog.html)
   ========================================================================== */
async function initBlogListPage() {
  try {
    const res = await fetch("posts/posts.json");
    if (!res.ok) throw new Error("포스트 목록을 불러오지 못했습니다.");
    allPosts = await res.json();

    renderTagFilters();
    renderFilteredPosts();
    initSearch();
  } catch (err) {
    console.error(err);
    const container = document.getElementById("blog-list-container");
    if (container) {
      container.innerHTML = `
        <div class="text-center py-12 text-slate-500">
          <p class="text-lg">글 목록을 불러오는 중 오류가 발생했습니다.</p>
          <p class="text-sm mt-1">posts/posts.json 파일 경로를 확인해주세요.</p>
        </div>
      `;
    }
  }
}

// 태그 필터 버튼 렌더링
function renderTagFilters() {
  const container = document.getElementById("tag-filters");
  if (!container) return;

  const tagsSet = new Set();
  allPosts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((t) => tagsSet.add(t));
    }
  });

  const tags = ["all", ...Array.from(tagsSet)];

  container.innerHTML = tags.map((tag) => {
    const isAll = tag === "all";
    const label = isAll ? "전체 보기" : `#${tag}`;
    const isActive = activeTag === tag;
    return `
      <button 
        type="button" 
        data-tag="${escapeHTML(tag)}" 
        class="tag-filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
        }"
      >
        ${label}
      </button>
    `;
  }).join("");

  // 태그 클릭 이벤트
  container.querySelectorAll(".tag-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTag = btn.getAttribute("data-tag");
      renderTagFilters();
      renderFilteredPosts();
    });
  });
}

// 검색 이벤트 설정
function initSearch() {
  const searchInput = document.getElementById("blog-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderFilteredPosts();
  });
}

// 필터링된 포스트 목록 렌더링
function renderFilteredPosts() {
  const container = document.getElementById("blog-list-container");
  const countEl = document.getElementById("post-count-badge");
  if (!container) return;

  const filtered = allPosts.filter((post) => {
    const matchesTag =
      activeTag === "all" || (post.tags && post.tags.includes(activeTag));
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery)) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery)));

    return matchesTag && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `총 ${filtered.length}개의 글`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-slate-400 mb-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <p class="text-slate-600 dark:text-slate-300 font-medium">검색 결과가 없습니다.</p>
        <p class="text-sm text-slate-400 mt-1">다른 검색어나 태그를 선택해보세요.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((post) => `
    <article class="bg-white dark:bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover-card flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span class="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold">
            ${escapeHTML(post.category || "General")}
          </span>
          <span>•</span>
          <time datetime="${escapeHTML(post.date)}">${escapeHTML(post.date)}</time>
          <span>•</span>
          <span>${escapeHTML(post.readingTime || "3 min read")}</span>
        </div>

        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <a href="post.html?id=${encodeURIComponent(post.slug)}">
            ${escapeHTML(post.title)}
          </a>
        </h2>

        <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          ${escapeHTML(post.excerpt)}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
        <div class="flex flex-wrap gap-1.5">
          ${(post.tags || []).map((tag) => `
            <span class="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-md">
              #${escapeHTML(tag)}
            </span>
          `).join("")}
        </div>

        <a 
          href="post.html?id=${encodeURIComponent(post.slug)}" 
          class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
        >
          글 읽기 
          <span class="transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </article>
  `).join("");
}

/* ==========================================================================
   2. 포스트 상세 뷰어 페이지 (post.html)
   ========================================================================== */
async function initPostDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    showPostError("포스트 ID가 지정되지 않았습니다.");
    return;
  }

  try {
    const res = await fetch("posts/posts.json");
    if (!res.ok) throw new Error("포스트 정보를 가져올 수 없습니다.");
    allPosts = await res.json();

    const postIndex = allPosts.findIndex(
      (p) => p.slug === postId || p.id === postId
    );

    if (postIndex === -1) {
      showPostError("요청하신 글을 찾을 수 없습니다.");
      return;
    }

    const post = allPosts[postIndex];

    // 메타데이터 렌더링
    renderPostMetadata(post);

    // 마크다운 파일 페치 및 렌더링
    const mdRes = await fetch(`posts/${post.file}`);
    if (!mdRes.ok) throw new Error("마크다운 글 본문을 불러올 수 없습니다.");
    const markdownContent = await mdRes.text();

    renderMarkdownContent(markdownContent);

    // 이전/다음 글 네비게이션
    renderPostPagination(postIndex);

  } catch (err) {
    console.error(err);
    showPostError(err.message || "글을 불러오는 중 오류가 발생했습니다.");
  }
}

function renderPostMetadata(post) {
  document.title = `${post.title} - ${SITE_CONFIG?.profile?.name || "Blog"}`;

  const titleEl = document.getElementById("post-title");
  if (titleEl) titleEl.textContent = post.title;

  const dateEl = document.getElementById("post-date");
  if (dateEl) dateEl.textContent = post.date;

  const readTimeEl = document.getElementById("post-read-time");
  if (readTimeEl) readTimeEl.textContent = post.readingTime || "3 min read";

  const categoryEl = document.getElementById("post-category");
  if (categoryEl) categoryEl.textContent = post.category || "Tech";

  const tagsContainer = document.getElementById("post-tags");
  if (tagsContainer && Array.isArray(post.tags)) {
    tagsContainer.innerHTML = post.tags.map((tag) => `
      <span class="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
        #${escapeHTML(tag)}
      </span>
    `).join("");
  }
}

function renderMarkdownContent(mdText) {
  const container = document.getElementById("post-content");
  if (!container || typeof marked === "undefined") return;

  // marked 옵션 설정
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  // 본문 변환
  container.innerHTML = marked.parse(mdText);

  // 헤딩에 ID 부여 및 목차(TOC) 생성
  setupHeadingsAndTOC(container);

  // 코드 하이라이팅 및 복사 버튼
  setupCodeBlocks(container);
}

// 목차(TOC) 생성
function setupHeadingsAndTOC(container) {
  const tocContainer = document.getElementById("post-toc-list");
  const headings = container.querySelectorAll("h1, h2, h3");

  if (!headings.length) {
    const tocWrapper = document.getElementById("post-toc-wrapper");
    if (tocWrapper) tocWrapper.style.display = "none";
    return;
  }

  const tocItems = [];

  headings.forEach((h, index) => {
    // 첫 번째 h1은 대제목이므로 목차에서 제외
    if (h.tagName === "H1" && index === 0) return;

    if (!h.id) {
      h.id = `heading-${index}`;
    }

    const level = h.tagName.toLowerCase();
    const text = h.textContent.trim();
    const indentClass = level === "h3" ? "ml-4 text-xs" : "font-medium text-sm";

    tocItems.push(`
      <li>
        <a 
          href="#${h.id}" 
          class="toc-item block py-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors ${indentClass}"
        >
          ${escapeHTML(text)}
        </a>
      </li>
    `);
  });

  if (tocContainer) {
    tocContainer.innerHTML = tocItems.join("");
  }
}

// 코드 블록 하이라이팅 및 복사 버튼 추가
function setupCodeBlocks(container) {
  // Highlight.js 적용
  if (typeof hljs !== "undefined") {
    container.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }

  // Pre 태그를 래퍼로 감싸고 헤더 + 복사 버튼 생성
  container.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    let lang = "code";

    if (code) {
      const classNames = code.className.split(" ");
      for (const cls of classNames) {
        if (cls.startsWith("language-")) {
          lang = cls.replace("language-", "");
          break;
        }
      }
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper my-6";

    const header = document.createElement("div");
    header.className = "code-block-header";
    header.innerHTML = `
      <span>${escapeHTML(lang)}</span>
      <button type="button" class="copy-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>복사</span>
      </button>
    `;

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);

    const copyBtn = header.querySelector(".copy-button");
    copyBtn.addEventListener("click", async () => {
      try {
        const textToCopy = code ? code.innerText : pre.innerText;
        await navigator.clipboard.writeText(textToCopy);
        const span = copyBtn.querySelector("span");
        const originalText = span.textContent;
        span.textContent = "복사됨!";
        copyBtn.classList.add("bg-emerald-600/30", "text-emerald-400");
        setTimeout(() => {
          span.textContent = originalText;
          copyBtn.classList.remove("bg-emerald-600/30", "text-emerald-400");
        }, 2000);
      } catch (e) {
        console.error("Copy failed", e);
      }
    });
  });
}

// 이전/다음 글 네비게이션
function renderPostPagination(currentIndex) {
  const container = document.getElementById("post-pagination");
  if (!container) return;

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 pt-8 border-t border-slate-200 dark:border-slate-800">
      ${
        prevPost
          ? `
          <a 
            href="post.html?id=${encodeURIComponent(prevPost.slug)}"
            class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-slate-800/60 transition-all flex flex-col group"
          >
            <span class="text-xs text-slate-400 mb-1 flex items-center gap-1 group-hover:text-blue-500">
              ← 이전 글
            </span>
            <span class="font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              ${escapeHTML(prevPost.title)}
            </span>
          </a>
        `
          : `<div></div>`
      }
      ${
        nextPost
          ? `
          <a 
            href="post.html?id=${encodeURIComponent(nextPost.slug)}"
            class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-slate-800/60 transition-all flex flex-col text-right group sm:ml-auto w-full"
          >
            <span class="text-xs text-slate-400 mb-1 flex items-center justify-end gap-1 group-hover:text-blue-500">
              다음 글 →
            </span>
            <span class="font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              ${escapeHTML(nextPost.title)}
            </span>
          </a>
        `
          : `<div></div>`
      }
    </div>
  `;
}

function showPostError(msg) {
  const container = document.getElementById("post-article-container");
  if (container) {
    container.innerHTML = `
      <div class="text-center py-20">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">글을 찾을 수 없습니다</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-6">${escapeHTML(msg)}</p>
        <a href="blog.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          블로그 목록으로 돌아가기
        </a>
      </div>
    `;
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
