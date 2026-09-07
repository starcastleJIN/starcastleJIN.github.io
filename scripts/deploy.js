const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function getApiKey() {
  const envPaths = [
    path.join(__dirname, "../.env"),
    path.join(process.env.USERPROFILE || process.env.HOME || "", ".env")
  ];

  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf-8");
      const match = content.match(/^GITHUB_API_KEY\s*=\s*(.+)$/m) ||
                    content.match(/^GITHUB_TOKEN\s*=\s*(.+)$/m) ||
                    content.match(/^GITHUB_PERSONAL_ACCESS_TOKEN\s*=\s*(.+)$/m);
      if (match) {
        return match[1].trim().replace(/^['\"]|['\"]$/g, "");
      }
    }
  }
  return null;
}

const token = getApiKey();
if (!token) {
  console.error("❌ 오류: .env 파일에서 GITHUB_API_KEY를 찾을 수 없습니다.");
  process.exit(1);
}

const repoUrlWithToken = `https://${token}@github.com/starcastleJIN/starcastleJIN.github.io.git`;
const cleanRepoUrl = `https://github.com/starcastleJIN/starcastleJIN.github.io.git`;

try {
  console.log("🔄 원격 저장소 인증 설정 중...");
  execSync(`git remote set-url origin "${repoUrlWithToken}"`, { stdio: "pipe" });

  console.log("🚀 GitHub Pages로 배포 푸시 중...");
  execSync(`git push -f origin main`, { stdio: "inherit" });

  console.log("✅ 배포 성공! GitHub Pages에 성공적으로 업로드되었습니다.");
} catch (error) {
  console.error("❌ 배포 중 오류가 발생했습니다:", error.message);
  process.exit(1);
} finally {
  // 보안을 위해 .git/config에 토큰이 평문으로 남지 않도록 정리
  try {
    execSync(`git remote set-url origin "${cleanRepoUrl}"`, { stdio: "pipe" });
  } catch (e) {
    // 무시
  }
}

// 2. MCP 설정(mcp_config.json)에 GitHub MCP 서버 등록
try {
  const mcpConfigPath = path.join(
    process.env.USERPROFILE || process.env.HOME || "",
    ".gemini/config/mcp_config.json"
  );
  if (fs.existsSync(mcpConfigPath)) {
    const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, "utf-8"));
    if (!mcpConfig.mcpServers) mcpConfig.mcpServers = {};

    mcpConfig.mcpServers["github"] = {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: token
      }
    };

    fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2), "utf-8");
    console.log("🔌 Antigravity MCP에 GitHub MCP 서버(@modelcontextprotocol/server-github)가 성공적으로 등록되었습니다!");
  }
} catch (mcpErr) {
  console.warn("⚠️ MCP 설정 업데이트 중 알림:", mcpErr.message);
}
