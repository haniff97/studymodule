const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function runMobileTests() {
  console.log('=== STARTING MOBILE RESPONSIVE TEST SUITE (375x812) ===');
  const browser = await launchBrowser(true);
  
  // Create mobile context with 375x812 viewport
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();
  const { errors, networkErrors } = attachErrorListeners(page, 'MobileSuite');

  try {
    // 1. Log in
    console.log('\n[1/6] Logging in on mobile viewport...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 10000 });
    console.log('✓ Successfully logged in and redirected to /home');

    // Helper to check horizontal overflow
    async function checkNoHorizontalOverflow(pageName) {
      const overflow = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        const clientWidth = Math.max(docEl.clientWidth, body.clientWidth);
        return {
          scrollWidth,
          clientWidth,
          hasOverflow: scrollWidth > clientWidth + 2 // allow 2px subpixel rounding tolerance
        };
      });
      if (overflow.hasOverflow) {
        console.warn(`⚠️ Warning: Horizontal overflow on ${pageName}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
      } else {
        console.log(`✓ No horizontal overflow on ${pageName} (${overflow.scrollWidth}px <= ${overflow.clientWidth}px)`);
      }
      return !overflow.hasOverflow;
    }

    // 2. Check Home page layout & Hamburger Menu
    console.log('\n[2/6] Testing Hamburger Menu and Sidebar Drawer...');
    await page.waitForSelector('.hamburger', { state: 'visible', timeout: 5000 });
    await checkNoHorizontalOverflow('Home (/home)');

    // Click hamburger button to open drawer
    console.log('Opening hamburger drawer...');
    await page.click('.hamburger');
    await page.waitForSelector('.sidebar.open', { state: 'visible', timeout: 5000 });
    await page.waitForSelector('.sidebar-backdrop.show', { state: 'visible', timeout: 5000 });
    console.log('✓ Sidebar drawer opened with backdrop');

    // Click backdrop to close drawer
    console.log('Closing drawer via backdrop click...');
    await page.click('.sidebar-backdrop.show', { position: { x: 350, y: 100 } });
    await page.waitForSelector('.sidebar.open', { state: 'detached', timeout: 5000 });
    console.log('✓ Sidebar drawer closed cleanly');

    // 3. Test Mobile Bottom Navigation
    console.log('\n[3/6] Testing Bottom Navigation Bar across pages...');
    await page.waitForSelector('.bottom-nav', { state: 'visible', timeout: 5000 });

    const bottomNavRoutes = [
      { label: 'Notes', selector: '.bottom-nav-item[href*="notes-hub"]', expectedUrl: '/notes-hub.html' },
      { label: 'Exam', selector: '.bottom-nav-item[href*="Study_hub_exam_full"]', expectedUrl: '/Study_hub_exam_full.html' },
      { label: 'Games', selector: '.bottom-nav-item[href*="arcade-lobby"]', expectedUrl: '/arcade-lobby.html' },
      { label: 'Assignments', selector: '.bottom-nav-item[href*="assignments"]', expectedUrl: '/assignments.html' },
      { label: 'Profile', selector: '.bottom-nav-item[href*="profile"]', expectedUrl: '/profile.html' },
      { label: 'Home', selector: '.bottom-nav-item[href*="home"]', expectedUrl: '/home' }
    ];

    for (const nav of bottomNavRoutes) {
      console.log(`Clicking Bottom Nav -> ${nav.label}...`);
      await page.click(nav.selector);
      await page.waitForURL(`**${nav.expectedUrl}*`, { timeout: 10000 });
      await page.waitForTimeout(500);
      await checkNoHorizontalOverflow(nav.label);
      console.log(`✓ Navigated to ${nav.label} (${page.url()})`);
    }

    // 4. Notes Hub mobile interaction
    console.log('\n[4/6] Testing Notes Hub interactive elements on mobile...');
    await page.click('.bottom-nav-item[href*="notes-hub"]');
    await page.waitForURL('**/notes-hub.html*', { timeout: 10000 });
    await page.waitForSelector('.hero-notes', { state: 'visible', timeout: 8000 });
    await page.waitForSelector('.topic-card-box', { state: 'visible', timeout: 8000 });
    await checkNoHorizontalOverflow('Notes Hub Page');
    
    // Tap on first topic card
    console.log('Navigating to subject notes...');
    await page.click('.topic-card-box');
    await page.waitForURL('**/notes-*.html*', { timeout: 10000 });
    await page.waitForSelector('.note-section', { state: 'visible', timeout: 8000 });
    await checkNoHorizontalOverflow('Topic Notes Page');

    // Tap second topic pill if available
    const topicChips = await page.$$('.topic-chip, .topic-btn');
    if (topicChips.length > 1) {
      await topicChips[1].click();
      await page.waitForTimeout(300);
      console.log('✓ Successfully selected Topic 2 on mobile');
    }

    // 5. Exam Lobby mobile interaction
    console.log('\n[5/6] Testing Exam Simulator on mobile...');
    await page.click('.bottom-nav-item[href*="Study_hub_exam_full"]');
    await page.waitForURL('**/Study_hub_exam_full.html*', { timeout: 10000 });
    await page.waitForSelector('.hero-exam', { state: 'visible', timeout: 8000 });
    await checkNoHorizontalOverflow('Exam Lobby');

    // Tap "Mula Ulangkaji" (Practice mode)
    const practiceBtn = await page.$('.mode-card-styled');
    if (practiceBtn) {
      await practiceBtn.click();
      await page.waitForTimeout(300);
      const startBtn = await page.$('.exam-start-btn, .hero-white-btn');
      if (startBtn) {
        await startBtn.click();
        await page.waitForSelector('.quiz-session', { state: 'visible', timeout: 10000 });
        console.log('✓ Exam Practice mode launched on mobile');
        await checkNoHorizontalOverflow('Quiz Runner');

        // Test mobile question palette toggle
        const paletteToggle = await page.$('.pw-palette-toggle');
        if (paletteToggle) {
          await paletteToggle.click();
          await page.waitForSelector('.q-palette-grid', { state: 'visible', timeout: 3000 });
          console.log('✓ Question palette toggled on mobile');
          await paletteToggle.click();
        }

        // Exit exam back to lobby
        const backBtn = await page.$('.session-back');
        if (backBtn) {
          await backBtn.click();
          await page.waitForSelector('.hero-exam', { state: 'visible', timeout: 8000 });
          console.log('✓ Returned to Exam lobby from Quiz session');
        }
      }
    }

    // 6. Profile & Settings mobile interaction
    console.log('\n[6/6] Testing Profile page and theme toggle on mobile...');
    await page.click('.bottom-nav-item[href*="profile"]');
    await page.waitForURL('**/profile.html*', { timeout: 10000 });
    await page.waitForSelector('.profile-page-container', { state: 'visible', timeout: 8000 });
    await page.waitForSelector('.prof-kpi-grid', { state: 'visible', timeout: 8000 });
    await checkNoHorizontalOverflow('Profile Page');

    // Test Theme toggle on mobile TopBar
    const themeBtn = await page.$('.theme-toggle-btn, [aria-label*="theme" i]');
    if (themeBtn) {
      await themeBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Toggled theme on mobile');
      await themeBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Toggled theme back on mobile');
    }

    console.log('\n=== MOBILE RESPONSIVE TEST RESULTS ===');
    console.log(`Total Errors Detected: ${errors.length}`);
    console.log(`Total Network Failures: ${networkErrors.length}`);

    if (errors.length > 0 || networkErrors.length > 0) {
      console.error('FAILURES FOUND IN MOBILE SUITE:');
      errors.forEach(e => console.error(e));
      networkErrors.forEach(e => console.error(e));
      process.exit(1);
    } else {
      console.log('ALL MOBILE TESTS PASSED WITH ZERO ERRORS!');
      process.exit(0);
    }

  } catch (err) {
    console.error('Mobile test suite crashed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runMobileTests();
