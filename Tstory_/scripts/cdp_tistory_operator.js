/**
 * Tistory CDP (Chrome DevTools Protocol) Direct Operator
 * 사용자의 실제 크롬(포트 9222)에 직접 연결하여 눈앞에서 실시간으로 스킨 적용과 글 등록을 수행합니다.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const BLOG_NAME = 'power-n-life';
const CDP_URL = 'http://localhost:9222';

// 9222 포트 열림 여부 확인 함수
function checkPortOpen() {
  return new Promise((resolve) => {
    const req = http.get(`${CDP_URL}/json/version`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function runCdpOperator(mode = 'all') {
  console.log('==============================================================');
  console.log(`🚀 [CDP Operator] 크롬 원격 디버깅 연동 에이전트 가동 (모드: ${mode})`);
  console.log('==============================================================');

  // 1. 크롬 디버깅 포트 연결 대기 (최대 10분)
  console.log('[1/4] 크롬 원격 디버깅 포트(9222) 연결을 확인합니다... (대기 시간: 최대 10분)');
  const startTime = Date.now();
  let isPortOpen = false;

  while (Date.now() - startTime < 600000) {
    isPortOpen = await checkPortOpen();
    if (isPortOpen) break;
    process.stdout.write('.');
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log('');

  if (!isPortOpen) {
    throw new Error('크롬 원격 디버깅 포트(9222)가 열리지 않았습니다. "AI_원격제어_크롬_실행.bat"을 먼저 실행해 주세요.');
  }

  console.log('✅ [포트 감지 성공!] 사용자님의 실제 크롬 브라우저에 연결합니다...');
  const browser = await chromium.connectOverCDP(CDP_URL);
  const contexts = browser.contexts();
  const context = contexts[0] || browser;
  const pages = context.pages();

  // 기존에 열려있는 티스토리 탭 찾기, 없으면 활성 탭 또는 새 탭 사용
  let page = pages.find((p) => p.url().includes('tistory.com')) || pages[0] || (await context.newPage());

  try {
    console.log(`[2/4] 연결된 탭 URL: ${page.url()}`);
    await page.bringToFront();

    // 관리자 페이지로 이동
    const manageUrl = `https://${BLOG_NAME}.tistory.com/manage`;
    if (!page.url().includes(`${BLOG_NAME}.tistory.com/manage`)) {
      console.log(` -> 관리자 페이지로 이동합니다: ${manageUrl}`);
      await page.goto(manageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
    }

    // 로그인 여부 확인
    if (page.url().includes('login') || page.url().includes('kakao.com')) {
      console.log('⚠️ 카카오 로그인이 필요합니다. 크롬 창에서 로그인을 완료해주세요. (최대 3분 대기)');
      await page.waitForURL(`**/${BLOG_NAME}.tistory.com/manage**`, { timeout: 180000 });
      console.log('✅ 로그인 완료 감지!');
      await page.waitForTimeout(2000);
    } else {
      console.log('✅ [세션 확인] 기존 카카오 로그인 세션이 완벽하게 유지되어 있습니다!');
    }

    // -------------------------------------------------------------
    // STEP 1: 미니멀 화이트 저널 스킨 자동 적용
    // -------------------------------------------------------------
    if (mode === 'all' || mode === 'skin') {
      console.log('\n🎨 [Step 1] 미니멀 화이트 저널 스킨 자동 적용을 시작합니다...');
      const skinEditUrl = `https://${BLOG_NAME}.tistory.com/manage/design/skin/edit`;
      await page.goto(skinEditUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      // 'html 편집' 버튼 탐색 및 클릭
      const htmlEditBtn = await page.waitForSelector('button:has-text("HTML 편집"), a:has-text("HTML 편집"), button:has-text("html 편집"), a:has-text("html 편집"), .btn_edit, a[href*="skin/edit"]', { timeout: 15000 });
      if (htmlEditBtn) {
        console.log(' -> [HTML 편집] 버튼 클릭...');
        
        const [popup] = await Promise.all([
          context.waitForEvent('page', { timeout: 4000 }).catch(() => null),
          htmlEditBtn.click()
        ]);

        const editPage = popup || page;
        await editPage.waitForTimeout(3000);

        const skinHtmlPath = path.join(__dirname, '../skin.html');
        const styleCssPath = path.join(__dirname, '../style.css');

        const skinHtml = fs.readFileSync(skinHtmlPath, 'utf8');
        const styleCss = fs.readFileSync(styleCssPath, 'utf8');

        // 1-1. HTML 코드 주입
        console.log(' -> HTML 탭에 skin.html 코드를 주입합니다...');
        await editPage.evaluate((code) => {
          const aceEditor = window.ace && document.querySelector('.ace_editor');
          if (aceEditor && window.ace.edit) {
            const ed = window.ace.edit(aceEditor);
            ed.setValue(code, -1);
          } else {
            const ta = document.querySelector('textarea.textarea_code') || document.querySelector('textarea');
            if (ta) ta.value = code;
          }
        }, skinHtml);
        await editPage.waitForTimeout(2000);

        // 1-2. CSS 탭 전환 및 style.css 주입
        console.log(' -> CSS 탭으로 전환하여 style.css 코드를 주입합니다...');
        const cssTab = await editPage.$('a:has-text("CSS"), button:has-text("CSS"), li:has-text("CSS")');
        if (cssTab) {
          await cssTab.click();
          await editPage.waitForTimeout(1500);

          await editPage.evaluate((code) => {
            const aceEditor = window.ace && document.querySelector('.ace_editor');
            if (aceEditor && window.ace.edit) {
              const ed = window.ace.edit(aceEditor);
              ed.setValue(code, -1);
            } else {
              const ta = document.querySelector('textarea.textarea_code') || document.querySelector('textarea');
              if (ta) ta.value = code;
            }
          }, styleCss);
          await editPage.waitForTimeout(2000);
        }

        // 1-3. [적용] 버튼 클릭
        console.log(' -> [적용] 버튼을 클릭하여 스킨을 저장합니다...');
        const applyBtn = await editPage.$('button:has-text("적용"), a:has-text("적용"), .btn_apply');
        if (applyBtn) {
          await applyBtn.click();
          await editPage.waitForTimeout(3500);
          console.log('✅ [스킨 적용 완료] 미니멀 화이트 저널 스킨이 사용자님의 크롬에서 성공적으로 적용되었습니다!');
        }

        if (popup) await popup.close();
      }
    }

    // -------------------------------------------------------------
    // STEP 2: 1호 기술 글 자동 업로드 (임시저장 초안 등록)
    // -------------------------------------------------------------
    if (mode === 'all' || mode === 'post') {
      console.log('\n✍️ [Step 2] 1호 기술 아티클 초안 임시저장을 시작합니다...');
      const postHtmlPath = path.join(__dirname, '../posts/01_welcome_and_roadmap.html');
      const postHtml = fs.readFileSync(postHtmlPath, 'utf8');

      const titleMatch = postHtml.match(/<h1>(.*?)<\/h1>/);
      const postTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '전력전자 & 임베디드 제어 기술 아카이브를 시작하며';
      const postBody = postHtml.replace(/<h1>.*?<\/h1>/, '').trim();

      const newPostUrl = `https://${BLOG_NAME}.tistory.com/manage/newpost/`;
      console.log(` -> 글쓰기 페이지 이동: ${newPostUrl}`);
      await page.goto(newPostUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      // 제목 입력
      const titleInput = await page.waitForSelector('textarea#post-title-inp, textarea[placeholder*="제목"], .textarea_tit, input[name="title"]', { timeout: 15000 });
      if (titleInput) {
        await titleInput.click();
        await titleInput.fill(postTitle);
        console.log(` -> 제목 입력 완료: "${postTitle}"`);
      }

      // HTML 모드로 전환
      const modeBtn = await page.$('button#editor-mode-btn, button:has-text("기본모드"), button:has-text("마크다운")');
      if (modeBtn) {
        await modeBtn.click();
        await page.waitForTimeout(600);
        const htmlOption = await page.$('button:has-text("HTML"), li:has-text("HTML")');
        if (htmlOption) {
          await htmlOption.click();
          console.log(' -> HTML 편집 모드로 전환 완료.');
          await page.waitForTimeout(1200);
        }
      }

      // 본문 주입
      await page.evaluate((content) => {
        const cm = document.querySelector('.CodeMirror');
        if (cm && cm.CodeMirror) {
          cm.CodeMirror.setValue(content);
        } else {
          const ta = document.querySelector('textarea.tx-content-container') || document.querySelector('textarea.CodeMirror-textarea') || document.querySelector('textarea');
          if (ta) ta.value = content;
          const ed = document.querySelector('[contenteditable="true"]');
          if (ed) ed.innerHTML = content;
        }
      }, postBody);
      console.log(' -> 본문 HTML 내용 주입 완료.');
      await page.waitForTimeout(2000);

      // [임시저장] 버튼 클릭
      const draftBtn = await page.$('button:has-text("임시저장"), button.btn-draft, button.btn_temp');
      if (draftBtn) {
        await draftBtn.click();
        await page.waitForTimeout(2500);
        console.log('✅ [임시저장 완료] 1호 글이 초안으로 안전하게 보관되었습니다!');
      }
    }

    // -------------------------------------------------------------
    // STEP 3: 최종 검증 및 블로그 메인 화면 스크린샷
    // -------------------------------------------------------------
    console.log('\n🌐 [Step 3] 변경된 블로그 메인 화면으로 이동합니다...');
    await page.goto(`https://${BLOG_NAME}.tistory.com/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const projectScreenshot = path.join(__dirname, 'cdp_final_result.png');
    const gDriveScreenshot = path.join('G:/내 드라이브/31_홈페이지 관리/Ti_story', '최종_적용_스크린샷.png');

    await page.screenshot({ path: projectScreenshot, fullPage: false });
    try {
      await page.screenshot({ path: gDriveScreenshot, fullPage: false });
      console.log(`📸 구글 드라이브 스크린샷 저장 완료: ${gDriveScreenshot}`);
    } catch(e) {}

    console.log('\n🎉 [모든 작업이 성공적으로 완료되었습니다!]');
    console.log('사용자님의 크롬 브라우저 창은 그대로 유지됩니다. 직접 확인해 보세요!');

  } catch (err) {
    console.error('❌ [CDP 작업 중 오류 발생]:', err.message);
  } finally {
    // 연결만 해제하고 사용자님의 브라우저는 닫지 않음!
    browser.disconnect();
    console.log('[CDP Operator] 원격 디버깅 연결 해제 완료.');
  }
}

if (require.main === module) {
  const mode = process.argv[2] || 'all';
  runCdpOperator(mode).catch(console.error);
}

module.exports = { runCdpOperator };
