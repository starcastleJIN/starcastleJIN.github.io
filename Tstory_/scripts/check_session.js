const { chromium } = require('playwright');
const path = require('path');

async function check() {
  const userDataDir = path.join(__dirname, '../.tistory_session');
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true
  });
  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  await page.goto('https://power-n-life.tistory.com/manage', { waitUntil: 'domcontentloaded', timeout: 15000 });
  console.log('Current URL:', page.url());
  const cookies = await context.cookies();
  const tistoryCookies = cookies.filter(c => c.domain.includes('tistory'));
  console.log('Tistory Cookies count:', tistoryCookies.length);
  await context.close();
}

check().catch(console.error);
