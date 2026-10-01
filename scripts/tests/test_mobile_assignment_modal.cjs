const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function testMobileAssignmentModal() {
  console.log('=== TESTING MOBILE ASSIGNMENT MODAL RESPONSIVENESS ===');
  const browser = await launchBrowser(true);

  try {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();
    const { errors, networkErrors } = attachErrorListeners(page, 'MobileAssignmentModal');

    // 1. Log in
    console.log('\n[1] Logging in...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 10000 });
    console.log('✓ Logged in');

    // 2. Open assignments page directly with specific assignment ID from user screenshot
    console.log('\n[2] Opening assignment reader modal for HMML5533_Set_01...');
    await page.goto(`${BASE_URL}/assignments.html?id=HMML5533_Set_01`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.assign-modal-container', { state: 'visible', timeout: 8000 });
    console.log('✓ Modal container appeared');

    // Wait for reading data to load
    await page.waitForSelector('.modal-title', { state: 'visible', timeout: 8000 });

    // 3. Measure dimensions of modal elements on 375px viewport
    const metrics = await page.evaluate(() => {
      const header = document.querySelector('.assign-modal-header');
      const title = document.querySelector('.modal-title');
      const badgesRow = document.querySelector('.modal-badges-row');
      const actions = document.querySelector('.modal-head-actions');
      const closeBtn = document.querySelector('.modal-btn-close');
      const copyBtn = document.querySelector('.modal-btn-copy');
      const dlBtn = document.querySelector('.modal-btn-download');

      const headerRect = header ? header.getBoundingClientRect() : null;
      const titleRect = title ? title.getBoundingClientRect() : null;
      const badgesRect = badgesRow ? badgesRow.getBoundingClientRect() : null;
      const closeRect = closeBtn ? closeBtn.getBoundingClientRect() : null;
      const copyRect = copyBtn ? copyBtn.getBoundingClientRect() : null;
      const dlRect = dlBtn ? dlBtn.getBoundingClientRect() : null;

      return {
        header: headerRect,
        title: {
          text: title ? title.innerText : '',
          width: titleRect ? titleRect.width : 0,
          height: titleRect ? titleRect.height : 0,
          left: titleRect ? titleRect.left : 0,
          right: titleRect ? titleRect.right : 0,
        },
        badges: {
          width: badgesRect ? badgesRect.width : 0,
          height: badgesRect ? badgesRect.height : 0,
        },
        closeBtn: {
          top: closeRect ? closeRect.top : 0,
          right: closeRect ? closeRect.right : 0,
          width: closeRect ? closeRect.width : 0,
          height: closeRect ? closeRect.height : 0,
        },
        copyBtn: {
          width: copyRect ? copyRect.width : 0,
          height: copyRect ? copyRect.height : 0,
        },
        dlBtn: {
          width: dlRect ? dlRect.width : 0,
          height: dlRect ? dlRect.height : 0,
        }
      };
    });

    console.log('\n[3] Inspection metrics on 375px viewport:');
    console.log(`- Modal Title: "${metrics.title.text}"`);
    console.log(`- Title Box: width=${metrics.title.width.toFixed(1)}px, height=${metrics.title.height.toFixed(1)}px`);
    console.log(`- Close Button: ${metrics.closeBtn.width}x${metrics.closeBtn.height}px`);
    console.log(`- Action Buttons: Copy=${metrics.copyBtn.width.toFixed(1)}px, Download=${metrics.dlBtn.width.toFixed(1)}px`);

    // Assert title width is healthy (> 250px on 375px screen, NOT 20px squashed)
    if (metrics.title.width < 250) {
      throw new Error(`FAIL: Title width is too narrow (${metrics.title.width}px), expected >= 250px!`);
    }
    console.log('✓ PASS: Title width is generous and readable (not squashed letter-by-letter)');

    // Assert title height is normal (< 80px, not hundreds of pixels high)
    if (metrics.title.height > 80) {
      throw new Error(`FAIL: Title height is abnormal (${metrics.title.height}px), indicates vertical wrapping!`);
    }
    console.log('✓ PASS: Title height is compact and wraps in 1-2 clean lines');

    // Assert action buttons are rendered properly in 2 columns
    if (metrics.copyBtn.width < 100 || metrics.dlBtn.width < 100) {
      throw new Error(`FAIL: Action buttons are too small (Copy: ${metrics.copyBtn.width}px, DL: ${metrics.dlBtn.width}px)`);
    }
    console.log('✓ PASS: Action buttons form a well-proportioned 2-column touch grid');

    // 4. Test tabs switching inside modal
    console.log('\n[4] Testing tabs switching...');
    await page.click('.modal-tab-item:has-text("Jadual Kandungan")');
    await page.waitForSelector('.toc-list', { state: 'visible', timeout: 5000 });
    console.log('✓ Switched to Jadual Kandungan');

    await page.click('.modal-tab-item:has-text("Forum OCP")');
    await page.waitForSelector('.ocp-posts-list', { state: 'visible', timeout: 5000 });
    console.log('✓ Switched to Forum OCP');

    await page.click('.modal-tab-item:has-text("Senarai Rujukan")');
    await page.waitForSelector('.references-list', { state: 'visible', timeout: 5000 });
    console.log('✓ Switched to Senarai Rujukan');

    await page.click('.modal-tab-item:has-text("Kandungan Esei")');
    await page.waitForSelector('.reader-section-block', { state: 'visible', timeout: 5000 });
    console.log('✓ Switched back to Kandungan Esei & Slaid');

    // 5. Test Close Button
    console.log('\n[5] Testing Close Button tap...');
    await page.click('.modal-btn-close');
    await page.waitForSelector('.assign-modal-overlay', { state: 'hidden', timeout: 5000 });
    console.log('✓ Modal closed successfully');

    // 6. Test on extra small screen (320x568 - iPhone SE 1st gen)
    console.log('\n[6] Testing on 320x568 extra-small viewport...');
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(`${BASE_URL}/assignments.html?id=HMML5533_Set_01`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.assign-modal-container', { state: 'visible', timeout: 8000 });

    const smallMetrics = await page.evaluate(() => {
      const title = document.querySelector('.modal-title');
      const docEl = document.documentElement;
      const modalCont = document.querySelector('.assign-modal-container');
      return {
        titleWidth: title ? title.getBoundingClientRect().width : 0,
        modalWidth: modalCont ? modalCont.getBoundingClientRect().width : 0,
        hasDocOverflow: docEl.scrollWidth > docEl.clientWidth + 1
      };
    });
    console.log(`- 320px Viewport: Modal width = ${smallMetrics.modalWidth.toFixed(1)}px, Title width = ${smallMetrics.titleWidth.toFixed(1)}px`);
    if (smallMetrics.titleWidth < 200) {
      throw new Error(`FAIL: Title too squashed on 320px viewport (${smallMetrics.titleWidth}px)`);
    }
    console.log('✓ PASS: Modal layout remains pristine even on 320px viewport');

    console.log('\n=== ALL MOBILE ASSIGNMENT MODAL TESTS PASSED! ===');
    await browser.close();
    process.exit(0);

  } catch (err) {
    console.error('\n❌ Test Error:', err.message);
    await browser.close();
    process.exit(1);
  }
}

testMobileAssignmentModal();
