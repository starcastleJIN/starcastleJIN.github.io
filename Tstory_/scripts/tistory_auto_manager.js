/**
 * Tistory Full Automation Operator (Playwright)
 * 화면에 실제 브라우저를 띄워 스킨 적용 및 글 임시저장을 전자동으로 제어합니다.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BLOG_NAME = 'power-n-life';

async function runAutoManager(mode = 'all') {
  console.log('==============================================================');
  console.log(`🚀 [Tistory Operator] 티스토리 자동화 에이전트를 가동합니다. (모드: ${mode})`);
  console.log('==============================================================');

  const userDataDir = path.join(__dirname, '../.tistory_session');

  // 사용자 화면 전체에 크게 보이는 브라우저 창 띄우기
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: null, // 브라우저 창 크기에 자동 맞춤
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    const manageUrl = `https://${BLOG_NAME}.tistory.com/manage`;
    console.log(`[1/3] 관리자 페이지로 진입합니다: ${manageUrl}`);
    await page.goto(manageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // 로그인 필요 여부 확인
    if (page.url().includes('login') || page.url().includes('kakao.com')) {
      console.log('\n--------------------------------------------------------------');
      console.log('🔔 [안내] 카카오 로그인이 필요합니다.');
      console.log('모니터에 나타난 브라우저 창에서 [카카오계정으로 로그인]을 완료해주세요.');
      console.log('로그인이 완료되면 AI가 마우스/키보드를 직접 조종하여 스킨 적용과 글 작성을 시작합니다! (최대 10분 대기)');
      console.log('--------------------------------------------------------------\n');

      const startTime = Date.now();
      let loggedIn = false;
      while (Date.now() - startTime < 600000) {
        await page.waitForTimeout(2000);
        const curUrl = page.url();
        if (!curUrl.includes('login') && !curUrl.includes('kakao.com') && curUrl.includes('tistory.com')) {
          console.log(`✅ [로그인 감지 성공!] 현재 URL: ${curUrl}`);
          loggedIn = true;
          break;
        }
      }

      if (!loggedIn) {
        throw new Error('로그인 대기 시간이 초과되었습니다.');
      }
      await page.waitForTimeout(3000);
    } else {
      console.log('✅ [세션 확인] 이미 로그인되어 있습니다.');
    }

    // -------------------------------------------------------------
    // STEP 1: 미니멀 화이트 저널 스킨 자동 적용
    // -------------------------------------------------------------
    if (mode === 'all' || mode === 'skin') {
      console.log('\n🎨 [Step 1] 미니멀 화이트 저널 스킨 자동 적용을 시작합니다...');
      const skinEditUrl = `https://${BLOG_NAME}.tistory.com/manage/design/skin/edit`;
      console.log(` -> 스킨 편집 페이지 이동: ${skinEditUrl}`);
      await page.goto(skinEditUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      // 'html 편집' 버튼 탐색 및 클릭
      const htmlEditBtn = await page.waitForSelector('button:has-text("HTML 편집"), a:has-text("HTML 편집"), button:has-text("html 편집"), a:has-text("html 편집"), .btn_edit, a[href*="skin/edit"]', { timeout: 15000 });
      if (htmlEditBtn) {
        console.log(' -> [HTML 편집] 버튼을 클릭합니다.');
        
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

        // 1-1. HTML 코드 교체
        console.log(' -> skin.html 코드를 에디터에 주입합니다...');
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

        // 1-2. CSS 탭 클릭 및 CSS 코드 교체
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

        // 1-3. '적용' 버튼 클릭
        console.log(' -> [적용] 버튼을 클릭하여 스킨을 저장합니다...');
        const applyBtn = await editPage.$('button:has-text("적용"), a:has-text("적용"), .btn_apply');
        if (applyBtn) {
          await applyBtn.click();
          await editPage.waitForTimeout(3500);
          console.log('✅ [스킨 적용 완료] 미니멀 화이트 저널 스킨이 성공적으로 저장되었습니다!');
        }

        if (popup) {
          await popup.close();
        }
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

      // 결과 스크린샷 캡처
      const screenshotPath = path.join(__dirname, 'auto_operator_result.png');
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 결과 스크린샷 캡처 완료: ${screenshotPath}`);
    }

    // -------------------------------------------------------------
    // STEP 3: 블로그 메인 화면 최종 확인
    // -------------------------------------------------------------
    console.log('\n🌐 [Step 3] 변경된 블로그 메인 화면을 확인합니다...');
    await page.goto(`https://${BLOG_NAME}.tistory.com/`, { waitUntil: 'networkidle', timeout: 30000 });
    const finalScreenshot = path.join(__dirname, 'blog_main_result.png');
    await page.screenshot({ path: finalScreenshot });
    console.log(`📸 블로그 메인 스크린샷 저장 완료: ${finalScreenshot}`);

    console.log('\n🎉 [모든 자동화 작업이 성공적으로 완료되었습니다!]');
    console.log('10초 후 브라우저 창을 안전하게 정리합니다.');
    await page.waitForTimeout(10000);

  } catch (err) {
    console.error('❌ [작업 중 오류 발생]:', err.message);
  } finally {
    await context.close();
    console.log('[Tistory Operator] 브라우저 세션 정리 완료.');
  }
}

if (require.main === module) {
  const mode = process.argv[2] || 'all';
  runAutoManager(mode).catch(console.error);
}

module.exports = { runAutoManager };
