const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function run() {
  console.log('=== TEST SUITE 5: TIPS PAGE AND ADMIN PANEL ===');
  const browser = await launchBrowser(true);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  const { errors, networkErrors } = attachErrorListeners(page, 'TipsAdminTest');

  try {
    // 1. Log in as regular student (demo)
    console.log('[1] Logging in as demo student...');
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 8000 });

    // 2. Test Tips Page (/tips.html)
    console.log('\n[2] Navigating to Tips Page (/tips.html)...');
    await page.goto(`${BASE_URL}/tips.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-tips', { timeout: 5000 });

    // Check Featured Tip of the day
    const hasFeatured = await page.locator('.tip-featured-card').isVisible();
    console.log(`Featured tip card visible: ${hasFeatured}`);
    if (!hasFeatured) throw new Error('Featured tip card not visible');

    // Check 6 Tips grid
    const tipCards = await page.locator('.tip-card-styled').count();
    console.log(`Tip cards count: ${tipCards} (expected 6)`);
    if (tipCards !== 6) throw new Error(`Expected 6 tip cards, found ${tipCards}`);

    // Click Kocok Semula (Shuffle)
    console.log('Clicking shuffle tips button...');
    const firstTitleBefore = await page.locator('.tc-card-title').first().innerText();
    await page.locator('.hero-white-btn, .tips-shuffle-link').first().click();
    await page.waitForTimeout(300);
    const firstTitleAfter = await page.locator('.tc-card-title').first().innerText();
    console.log(`Tips shuffled: "${firstTitleBefore.slice(0, 30)}" -> "${firstTitleAfter.slice(0, 30)}"`);

    // 3. Test Student Guard on /admin.html
    console.log('\n[3] Testing Student Guard on /admin.html...');
    await page.goto(`${BASE_URL}/admin.html`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const path = await page.evaluate(() => window.location.pathname);
    console.log(`Current pathname after attempting admin as student: ${path}`);
    if (path === '/admin.html') throw new Error('Non-admin user should not be allowed into /admin.html');

    // 4. Logout demo student
    console.log('\n[4] Logging out student...');
    await page.goto(`${BASE_URL}/profile.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.profile-logout-card', { timeout: 5000 });
    await page.click('.profile-logout-card');
    await page.waitForURL('**/login', { timeout: 8000 });
    console.log('Logged out successfully.');

    // 5. Test Admin Login Page (/admin-login.html)
    console.log('\n[5] Testing Admin Login Page (/admin-login.html)...');
    await page.goto(`${BASE_URL}/admin-login.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.auth-card', { timeout: 5000 });

    // Test invalid login
    console.log('Testing invalid admin credentials...');
    await page.fill('input[placeholder="admin"]', 'wrongadmin');
    await page.fill('input[type="password"]', 'badpass');
    await page.click('.auth-submit-btn');
    await page.waitForTimeout(600);

    // Test valid admin login
    console.log('Logging in as valid administrator (admin / admin123)...');
    await page.fill('input[placeholder="admin"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('.auth-submit-btn');
    await page.waitForURL('**/admin.html', { timeout: 8000 });
    console.log('Admin login successful. Landed on /admin.html!');

    // 6. Test Admin Panel Dashboard & Tabs
    console.log('\n[6] Testing Admin Dashboard and Tabs...');
    await page.waitForSelector('.admin-shell', { timeout: 5000 });
    const adminUser = await page.locator('.admin-user-name').innerText();
    console.log(`Logged in admin: ${adminUser}`);

    // Check tab buttons count (7 tabs)
    const adminTabs = await page.locator('.admin-tab').count();
    console.log(`Found ${adminTabs} admin tabs (expected 7)`);
    if (adminTabs !== 7) throw new Error(`Expected 7 admin tabs, got ${adminTabs}`);

    // Tab 1: Users tab
    console.log('Verifying Users tab...');
    await page.waitForSelector('.admin-table', { timeout: 5000 });
    const userRows = await page.locator('.admin-table tbody tr').count();
    console.log(`Users table has ${userRows} user rows`);
    if (userRows === 0) throw new Error('Users table has 0 rows');

    // Tab 2: Subjects & Topics tab
    console.log('Testing Subjects & Topics tab...');
    await page.locator('.admin-tab:has-text("Subjek")').click();
    await page.waitForSelector('.admin-panel', { timeout: 5000 });
    const subjSelect = page.locator('select').first();
    if (await subjSelect.isVisible()) {
      const optCount = await subjSelect.locator('option').count();
      console.log(`Subjects select has ${optCount} options`);
    }

    // Tab 3: Notes tab
    console.log('Testing Notes tab...');
    await page.locator('.admin-tab:has-text("Nota")').click();
    await page.waitForSelector('.admin-section', { timeout: 5000 });
    // Select subject in Notes tab
    const noteSubjSelect = page.locator('.admin-section select').first();
    if (await noteSubjSelect.isVisible()) {
      await noteSubjSelect.selectOption({ index: 1 });
      await page.waitForTimeout(300);
      const noteTopicSelect = page.locator('.admin-section select').nth(1);
      if (await noteTopicSelect.isVisible()) {
        await noteTopicSelect.selectOption({ index: 1 });
        await page.waitForSelector('.admin-panel', { timeout: 5000 });
        console.log('Notes admin panel loaded for selected topic.');
      }
    }

    // Tab 4: Questions tab
    console.log('Testing Questions tab...');
    await page.locator('.admin-tab:has-text("Set & Soalan")').click();
    await page.waitForSelector('.admin-section', { timeout: 5000 });

    // Tab 5: Quizzes tab
    console.log('Testing Quizzes tab...');
    await page.locator('.admin-tab:has-text("Kuiz")').click();
    await page.waitForSelector('.admin-section', { timeout: 5000 });

    // Tab 6: Flashcards tab
    console.log('Testing Flashcards tab...');
    await page.locator('.admin-tab:has-text("Kad Imbas")').click();
    await page.waitForSelector('.admin-section', { timeout: 5000 });

    // Tab 7: Tips tab
    console.log('Testing Tips tab...');
    await page.locator('.admin-tab:has-text("Tips")').click();
    await page.waitForSelector('.admin-panel', { timeout: 5000 });
    const tipsTableRows = await page.locator('.admin-table tbody tr').count();
    console.log(`Tips management table has ${tipsTableRows} rows`);

    // 7. Test Theme switch in Admin
    console.log('\n[7] Testing theme switch in Admin panel...');
    const adminThemeBtn = page.locator('.theme-switch-toggle').first();
    await adminThemeBtn.click();
    await page.waitForTimeout(300);
    const isLight = await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'light');
    console.log(`Switched admin theme to light: ${isLight}`);

    // 8. Test Admin Logout
    console.log('\n[8] Testing Admin Logout...');
    await page.locator('.admin-logout-btn').click();
    await page.waitForURL('**/login', { timeout: 8000 });
    console.log('Admin logout successful. Redirected to /login!');

    console.log('\n=== TIPS AND ADMIN TEST SUITE COMPLETE ===');
    console.log(`Errors captured: ${errors.length}`);
    console.log(`Network errors: ${networkErrors.length}`);
    if (errors.length > 0) {
      console.error('Errors encountered:', errors);
      process.exit(1);
    }
    if (networkErrors.length > 0) {
      console.error('Network errors encountered:', networkErrors);
      process.exit(1);
    }
    console.log('ALL TIPS AND ADMIN TESTS PASSED WITH 0 ERRORS!');
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();