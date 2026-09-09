/**
 * Tistory Automated Draft Uploader (Playwright)
 * 안전 협업 모드: 임시저장까지만 자동 수행하여 사용자 계정을 안전하게 보호합니다.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function uploadDraft({ htmlFilePath, blogName = 'power-n-life' }) {
  console.log(`[Tistory Bot] 게시글 초안 임시저장 작업을 시작합니다.`);
  console.log(`[Tistory Bot] 대상 파일: ${htmlFilePath}`);

  if (!fs.existsSync(htmlFilePath)) {
    throw new Error(`파일을 찾을 수 없습니다: ${htmlFilePath}`);
  }

  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

  // HTML 파일에서 <h1> 태그를 제목으로 추출
  const titleMatch = htmlContent.match(/<h1>(.*?)<\/h1>/);
  const postTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '전력전자 & 임베디드 기술 노트';
  
  // <h1> 태그 이후의 본문 추출
  const postBody = htmlContent.replace(/<h1>.*?<\/h1>/, '').trim();

  console.log(`[Tistory Bot] 추출된 제목: "${postTitle}"`);

  // 세션 저장을 위한 프로필 경로 설정 (로그인 상태 영구 보존)
  const userDataDir = path.join(__dirname, '../.tistory_session');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // 사용자가 로그인 과정을 볼 수 있도록 브라우저 창 표시
    viewport: { width: 1280, height: 860 },
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    const editorUrl = `https://${blogName}.tistory.com/manage/newpost/`;
    console.log(`[Tistory Bot] 글쓰기 페이지로 이동합니다: ${editorUrl}`);
    await page.goto(editorUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // 로그인 필요 여부 확인 (카카오 로그인 리다이렉트 체크)
    if (page.url().includes('accounts.kakao.com') || page.url().includes('login')) {
      console.log('\n======================================================');
      console.log('⚠️ [최초 1회 안내] 카카오 계정 로그인이 필요합니다.');
      console.log('열려있는 브라우저 화면에서 카카오 로그인을 완료해주세요.');
      console.log('로그인이 완료되면 세션이 자동 저장되어 다음부터는 이 과정이 생략됩니다.');
      console.log('======================================================\n');

      // 로그인 완료 후 티스토리 글쓰기 화면으로 진입할 때까지 최대 120초 대기
      await page.waitForURL(`**/${blogName}.tistory.com/manage/newpost/**`, { timeout: 120000 });
      console.log('[Tistory Bot] 로그인 확인 완료! 계속 진행합니다.');
      await page.waitForTimeout(2000);
    }

    // 제목 입력 (플레이스홀더 및 셀렉터 대응)
    const titleInput = await page.waitForSelector('textarea#post-title-inp, textarea[placeholder*="제목"], .textarea_tit', { timeout: 15000 });
    await titleInput.click();
    await titleInput.fill(postTitle);
    console.log('[Tistory Bot] 제목 입력 완료.');

    // HTML 모드 전환 시도
    // 기본모드 버튼 클릭 -> 드롭다운에서 HTML 선택
    const modeBtn = await page.$('button#editor-mode-btn, button:has-text("기본모드"), button:has-text("마크다운")');
    if (modeBtn) {
      await modeBtn.click();
      await page.waitForTimeout(500);
      const htmlOption = await page.$('button:has-text("HTML"), li:has-text("HTML")');
      if (htmlOption) {
        await htmlOption.click();
        console.log('[Tistory Bot] HTML 모드로 전환했습니다.');
        await page.waitForTimeout(1000);
      }
    }

    // 본문 입력 (CodeMirror 또는 textarea)
    const editorArea = await page.$('.CodeMirror textarea, textarea.tx-content-container, #mceu_31-body');
    if (editorArea) {
      await editorArea.focus();
      // CodeMirror 인스턴스가 존재하는 경우 브라우저 context에서 직접 값 설정
      await page.evaluate((content) => {
        const cm = document.querySelector('.CodeMirror');
        if (cm && cm.CodeMirror) {
          cm.CodeMirror.setValue(content);
        } else {
          const ta = document.querySelector('textarea.tx-content-container') || document.querySelector('textarea');
          if (ta) ta.value = content;
        }
      }, postBody);
      console.log('[Tistory Bot] 본문 HTML 삽입 완료.');
    } else {
      // 일반 에디터 프레임 또는 contenteditable 대응
      const editable = await page.$('[contenteditable="true"]');
      if (editable) {
        await page.evaluate(({ el, content }) => {
          el.innerHTML = content;
        }, { el: editable, content: postBody });
        console.log('[Tistory Bot] 에디터에 본문 삽입 완료.');
      }
    }

    await page.waitForTimeout(1500);

    // 임시저장 버튼 탐색 및 클릭 (안전 협업 모드!)
    console.log('[Tistory Bot] [임시저장] 버튼을 탐색합니다...');
    const draftBtn = await page.$('button:has-text("임시저장"), button.btn-draft, button.btn_temp');
    if (draftBtn) {
      await draftBtn.click();
      console.log('✅ [Tistory Bot] "임시저장" 버튼 클릭 완료! 초안이 안전하게 저장되었습니다.');
    } else {
      console.log('⚠️ [Tistory Bot] "임시저장" 버튼을 자동으로 찾지 못했습니다. 에디터 화면에 내용이 채워져 있으니 수동으로 임시저장을 클릭해주세요.');
    }

    await page.waitForTimeout(2000);

    // 작업 결과 스크린샷 캡처
    const screenshotPath = path.join(__dirname, 'last_draft_result.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 [Tistory Bot] 작업 상태 스크린샷 저장 완료: ${screenshotPath}`);

  } catch (err) {
    console.error(`❌ [Tistory Bot Error] 작업 도중 오류 발생:`, err.message);
  } finally {
    // 사용자가 확인할 수 있도록 5초 대기 후 브라우저 종료
    console.log('[Tistory Bot] 5초 후 브라우저 세션을 안전하게 정리합니다.');
    await page.waitForTimeout(5000);
    await context.close();
    console.log('[Tistory Bot] 작업 종료.');
  }
}

// CLI 직접 실행 지원
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetHtml = args[0] || path.join(__dirname, '../posts/01_welcome_and_roadmap.html');
  uploadDraft({ htmlFilePath: targetHtml })
    .catch(console.error);
}

module.exports = { uploadDraft };
