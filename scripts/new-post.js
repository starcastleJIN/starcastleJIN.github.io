/**
 * 새 블로그 글 템플릿 생성 및 posts.json 등록 스크립트
 * 사용법: node scripts/new-post.js "글 제목" "카테고리"
 */

const fs = require("fs");
const path = require("path");

const title = process.argv[2] || "새로운 블로그 포스트";
const category = process.argv[3] || "Tech";

// 슬러그 생성 (영어/숫자/하이픈)
const now = new Date();
const dateStr = now.toISOString().split("T")[0];
const timestamp = Date.now().toString().slice(-4);
const slugSafeTitle = title
  .toLowerCase()
  .replace(/[^a-z0-9가-힣\s]/g, "")
  .replace(/\s+/g, "-")
  .slice(0, 30);

const slug = `${dateStr}-${slugSafeTitle || "post"}-${timestamp}`;
const fileName = `${slug}.md`;

const postsJsonPath = path.join(__dirname, "../posts/posts.json");
const newPostPath = path.join(__dirname, "../posts", fileName);

// 1. 마크다운 템플릿 작성
const markdownTemplate = `# ${title}

여기에 글의 도입부를 작성하세요. 독자의 흥미를 유발할 수 있는 배경이나 요약을 적어주세요.

---

## 1. 첫 번째 주제

본문 내용을 자유롭게 작성하세요. 마크다운 서식을 지원합니다.

- 리스트 항목 1
- 리스트 항목 2

\`\`\`javascript
// 코드 예시
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

---

## 2. 두 번째 주제

추가적인 설명이나 트러블슈팅 경험을 공유해보세요.

> 인용구 또는 중요한 팁을 이곳에 작성하세요.

---

## 맺음말

글을 마무리하며 배운 점이나 느낀 점을 요약합니다.
`;

fs.writeFileSync(newPostPath, markdownTemplate, "utf-8");

// 2. posts.json 에 메타데이터 추가
let posts = [];
if (fs.existsSync(postsJsonPath)) {
  try {
    posts = JSON.parse(fs.readFileSync(postsJsonPath, "utf-8"));
  } catch (e) {
    posts = [];
  }
}

const newPostMeta = {
  id: slug,
  slug: slug,
  title: title,
  excerpt: `${title}에 대한 이야기입니다. 여기에 한 줄 요약을 적어주세요.`,
  date: dateStr,
  category: category,
  tags: [category, "Dev"],
  readingTime: "3 min",
  file: fileName,
  featured: false
};

// 최신 글이 맨 위에 오도록 unshift
posts.unshift(newPostMeta);
fs.writeFileSync(postsJsonPath, JSON.stringify(posts, null, 2), "utf-8");

console.log(`=========================================`);
console.log(`🎉 새 포스트가 생성되었습니다!`);
console.log(`📄 파일 위치: posts/${fileName}`);
console.log(`📝 제목: ${title}`);
console.log(`🏷️  카테고리: ${category}`);
console.log(`👉 posts/${fileName} 파일을 열어 내용을 작성하세요.`);
console.log(`=========================================`);
