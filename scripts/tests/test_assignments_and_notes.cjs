const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function run() {
  console.log('=== TEST SUITE 7: ASSIGNMENTS MODULE & INTERACTIVE NOTES ===');
  const browser = await launchBrowser(true);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  const { errors, warnings, networkErrors } = attachErrorListeners(page, 'AssignmentsAndNotes');

  try {
    // 1. Login as demo student
    console.log('\n[1] Logging in as demo user...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL(url => url.pathname === '/home', { timeout: 8000 });
    console.log('Logged in successfully! Landed on /home');

    // 2. Check Home page navigation card to Assignments
    console.log('\n[2] Checking Dashboard navigation card to Assignments...');
    const assignmentDashboardCard = await page.$('a[href="/assignments.html"], a[href="/assignments"]');
    if (assignmentDashboardCard) {
      console.log('Found Assignments card on dashboard. Clicking...');
      await assignmentDashboardCard.click();
      await page.waitForURL(url => url.pathname.includes('assignments'), { timeout: 8000 });
      console.log('Navigated to Assignments from Home:', page.url());
    } else {
      console.log('Navigating directly to /assignments.html...');
      await page.goto(`${BASE_URL}/assignments.html`, { waitUntil: 'networkidle' });
    }

    // 3. Verify Assignments Hub elements
    console.log('\n[3] Verifying Assignments Hub content and stats...');
    await page.waitForSelector('.assign-grid, .assign-card', { timeout: 8000 });
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);

    const initialCards = await page.$$('.assign-card');
    console.log(`Rendered cards on Page 1: ${initialCards.length} (expected 24)`);

    // Verify stats cards
    const statCards = await page.$$('.assign-stat-card');
    console.log(`Found ${statCards.length} stat cards`);

    // 4. Test Subject Filter Tabs
    console.log('\n[4] Testing Subject filter tabs...');
    const filterTabs = await page.$$('.assign-tab-btn');
    console.log(`Found ${filterTabs.length} filter tabs`);

    // Click HPGD1303
    const hpgdTab = await page.$('.assign-tab-btn:has-text("HPGD1303")');
    if (hpgdTab) {
      await hpgdTab.click();
      await page.waitForTimeout(600);
      const hpgdCards = await page.$$('.assign-card');
      console.log(`HPGD1303 cards rendered: ${hpgdCards.length}`);
      const firstBadge = await page.$eval('.assign-card .assign-code-badge', el => el.innerText);
      console.log('First card badge:', firstBadge);
    }

    // Click HMML5533
    const hmml5533Tab = await page.$('.assign-tab-btn:has-text("HMML5533")');
    if (hmml5533Tab) {
      await hmml5533Tab.click();
      await page.waitForTimeout(600);
      const hmmlCards = await page.$$('.assign-card');
      console.log(`HMML5533 cards rendered: ${hmmlCards.length}`);
      const firstBadge = await page.$eval('.assign-card .assign-code-badge', el => el.innerText);
      console.log('First card badge:', firstBadge);
    }

    // Click "Semua" / ALL
    const allTab = await page.$('.assign-tab-btn:has-text("Semua"), .assign-tab-btn:has-text("All")');
    if (allTab) {
      await allTab.click();
      await page.waitForTimeout(600);
      const allCards = await page.$$('.assign-card');
      console.log(`Reset to all subjects: ${allCards.length} cards`);
    }

    // 5. Test Search (including padded set numbers)
    console.log('\n[5] Testing Search functionality...');
    const searchInput = await page.$('.assign-search-input');
    if (searchInput) {
      // Test search with author/topic
      await searchInput.fill('Barnes');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
      const searchCards = await page.$$('.assign-card');
      console.log(`Search for "Barnes" returned: ${searchCards.length} cards`);
      if (searchCards.length === 0) {
        errors.push('Search for "Barnes" returned 0 results');
      }

      // Test search with padded set number "set 01"
      await searchInput.fill('set 01');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
      const setCards = await page.$$('.assign-card');
      console.log(`Search for "set 01" returned: ${setCards.length} cards (expected >= 3)`);
      if (setCards.length < 3) {
        errors.push(`Search for "set 01" returned only ${setCards.length} cards, expected >= 3`);
      }

      // Clear search
      const clearBtn = await page.$('.assign-search-clear');
      if (clearBtn) {
        await clearBtn.click();
        await page.waitForTimeout(600);
        const resetCards = await page.$$('.assign-card');
        console.log(`Cleared search, cards count: ${resetCards.length}`);
      }
    }

    // 5b. Test Case-Insensitive Detail API Endpoint
    console.log('\n[5b] Testing case-insensitive assignment detail endpoint...');
    const lowerCaseRes = await page.request.get(`${BASE_URL}/api/assignments/hpgd1303_set_01`);
    if (lowerCaseRes.ok()) {
      const itemData = await lowerCaseRes.json();
      console.log(`Successfully loaded assignment using lowercase ID: ${itemData.id} (${itemData.courseCode})`);
      if (itemData.id !== 'HPGD1303_Set_01') {
        errors.push(`Expected ID HPGD1303_Set_01 but got ${itemData.id}`);
      }
    } else {
      errors.push(`Failed to load lowercase assignment ID: status ${lowerCaseRes.status()}`);
    }

    // 6. Test Pagination
    console.log('\n[6] Testing Pagination controls...');
    const nextBtn = await page.$('.assign-pagination .page-btn:has-text("Seterusnya"), .assign-pagination .page-btn:has-text("Next")');
    if (nextBtn && !(await nextBtn.isDisabled())) {
      await nextBtn.click();
      await page.waitForTimeout(600);
      const p2Cards = await page.$$('.assign-card');
      console.log(`Page 2 rendered cards: ${p2Cards.length}`);

      const prevBtn = await page.$('.assign-pagination .page-btn:has-text("Sebelum"), .assign-pagination .page-btn:has-text("Prev")');
      if (prevBtn) {
        await prevBtn.click();
        await page.waitForTimeout(600);
        console.log('Navigated back to Page 1');
      }
    }

    // 7. Test Assignment Reader Modal & Scroll Lock
    console.log('\n[7] Testing Assignment Reader View Modal & Scroll Lock...');
    const firstReadBtn = await page.$('.btn-read-assign');
    if (firstReadBtn) {
      await firstReadBtn.click();
      await page.waitForSelector('.assign-modal-container', { timeout: 6000 });
      console.log('Reader modal opened successfully!');

      // Check body scroll lock
      const bodyOverflowLocked = await page.evaluate(() => document.body.style.overflow);
      console.log('Body overflow with modal open:', bodyOverflowLocked);
      if (bodyOverflowLocked !== 'hidden') {
        errors.push(`Expected body overflow to be 'hidden', but got '${bodyOverflowLocked}'`);
      }

      // Test closing via Escape key
      console.log('Testing Escape key to close modal...');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const modalAfterEsc = await page.$('.assign-modal-overlay');
      console.log('Modal after pressing Escape:', modalAfterEsc ? 'Still Open' : 'Closed');
      if (modalAfterEsc) {
        errors.push('Pressing Escape did not close the reader modal');
      }

      // Check body scroll restored
      const bodyOverflowRestored = await page.evaluate(() => document.body.style.overflow);
      console.log('Body overflow after closing modal:', bodyOverflowRestored);
      if (bodyOverflowRestored === 'hidden') {
        errors.push('Body overflow still locked as hidden after closing modal');
      }

      // Reopen modal to test tabs and close button
      await firstReadBtn.click();
      await page.waitForSelector('.assign-modal-container', { timeout: 6000 });

      // Check modal header details
      const modalTitle = await page.$eval('.modal-title', el => el.innerText);
      console.log('Modal title:', modalTitle);

      // Verify tabs inside modal
      const readerTabs = await page.$$('.modal-tab-item');
      console.log(`Found ${readerTabs.length} tabs in reader modal`);

      // Switch to Jadual Kandungan tab
      const tocTab = await page.$('.modal-tab-item:has-text("Jadual"), .modal-tab-item:has-text("Kandungan")');
      if (tocTab) {
        await tocTab.click();
        await page.waitForTimeout(400);
        console.log('Switched to Jadual Kandungan tab');
      }

      // Switch to OCP Forum tab
      const ocpTab = await page.$('.modal-tab-item:has-text("Forum"), .modal-tab-item:has-text("OCP")');
      if (ocpTab) {
        await ocpTab.click();
        await page.waitForTimeout(400);
        const posts = await page.$$('.ocp-card');
        console.log(`OCP forum posts found: ${posts.length} (expected 5)`);
      }

      // Switch to References tab
      const refTab = await page.$('.modal-tab-item:has-text("Rujukan"), .modal-tab-item:has-text("References")');
      if (refTab) {
        await refTab.click();
        await page.waitForTimeout(400);
        const refs = await page.$$('.ref-item');
        console.log(`References rendered: ${refs.length}`);
      }

      // Switch back to Esei tab
      const essayTab = await page.$('.modal-tab-item:has-text("Esei")');
      if (essayTab) {
        await essayTab.click();
        await page.waitForTimeout(400);
      }

      // Test copy text button
      const copyBtn = await page.$('.hero-btn-secondary:has-text("Salin")');
      if (copyBtn) {
        await copyBtn.click();
        await page.waitForTimeout(300);
        console.log('Clicked "Salin Teks" button');
      }

      // Test download docx button (verify link href)
      const downloadBtn = await page.$('a.modal-btn-download');
      if (downloadBtn) {
        const href = await downloadBtn.getAttribute('href');
        console.log(`Download link href: ${href}`);
        if (!href || !href.includes('/download')) {
          errors.push(`Download link does not contain /download: ${href}`);
        }
      }

      // Close modal via close button
      const closeBtn = await page.$('.modal-btn-close');
      if (closeBtn) {
        await closeBtn.click();
        await page.waitForTimeout(400);
        const modalOpen = await page.$('.assign-modal-overlay');
        console.log('Reader modal closed via X button, overlay still present:', !!modalOpen);
      }
    }

    // 7b. Test Deep Linking via URL Query Parameters
    console.log('\n[7b] Testing direct URL deep-linking (?subject=HMML5533&id=HMML5533_Set_02)...');
    await page.goto(`${BASE_URL}/assignments.html?subject=HMML5533&id=HMML5533_Set_02`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.assign-modal-container', { timeout: 8000 });
    const deepModalTitle = await page.$eval('.modal-title', el => el.innerText);
    const setChip = await page.$eval('.assign-modal-header .assign-set-chip', el => el.innerText);
    console.log(`Deep linked assignment loaded title: "${deepModalTitle}", set chip: "${setChip}"`);
    if (!setChip.includes('SET 02') && !setChip.includes('SET 2')) {
      errors.push(`Expected deep link to load Set 02, but set chip was: ${setChip}`);
    }
    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // 8. Test Interactive Topic 1 Notes Formatting
    console.log('\n[8] Testing Interactive Topic 1 notes formatting on /notes-hpgd1103.html...');
    await page.goto(`${BASE_URL}/notes-hpgd1103.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.page-head, .notes-container', { timeout: 6000 });

    // Verify accordion elements on Topik 1
    const accordions = await page.$$('details.edu-accordion');
    console.log(`Found ${accordions.length} accordion details on Topik 1`);

    if (accordions.length > 0) {
      // Test opening an accordion
      const firstAccordion = accordions[0];
      const isOpenBefore = await firstAccordion.getAttribute('open');
      console.log('First accordion initially open:', isOpenBefore !== null);

      // Click summary to toggle
      const summary = await firstAccordion.$('summary.accordion-summary');
      if (summary) {
        await summary.click();
        await page.waitForTimeout(300);
        const isOpenAfter = await firstAccordion.getAttribute('open');
        console.log('First accordion open after click:', isOpenAfter !== null);
      }

      // Test font size controls in notes toolbar
      const fontBtns = await page.$$('.nt-btn');
      console.log(`Found ${fontBtns.length} reading toolbar buttons`);
      for (const btn of fontBtns) {
        await btn.click();
        await page.waitForTimeout(200);
      }
      console.log('Reading toolbar buttons clicked successfully');
    }

    // 9. Test other subjects notes (HMML5103, HPGD1303)
    console.log('\n[9] Checking notes on other subjects for layout issues...');
    await page.goto(`${BASE_URL}/notes-hmml5103.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.page-head, .note-section', { timeout: 6000 });
    const hmmlTitle = await page.$eval('.page-head h1, .page-head .uppercase', el => el.innerText).catch(() => 'found');
    console.log('HMML5103 loaded, title:', hmmlTitle);

    await page.goto(`${BASE_URL}/notes-hpgd1303.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.page-head, .note-section', { timeout: 6000 });
    const hpgd1303Title = await page.$eval('.page-head h1, .page-head .uppercase', el => el.innerText).catch(() => 'found');
    console.log('HPGD1303 loaded, title:', hpgd1303Title);

    // 10. Test Mobile Responsive for Assignments page (375x812)
    console.log('\n[10] Testing Mobile Responsive on /assignments.html (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/assignments.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.assign-grid', { timeout: 6000 });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile viewport: scrollWidth=${scrollWidth}px, clientWidth=${clientWidth}px`);
    if (scrollWidth > clientWidth + 2) {
      errors.push(`Horizontal overflow detected on mobile Assignments page: ${scrollWidth} > ${clientWidth}`);
    } else {
      console.log('✓ No horizontal overflow on mobile Assignments page!');
    }

    // Check BottomNav items count on mobile
    const bottomNavItems = await page.$$('.bottom-nav .bottom-nav-item');
    console.log(`Mobile BottomNav items count: ${bottomNavItems.length}`);

    // Check if bottom nav items overlap or wrap
    const bottomNavHeight = await page.$eval('.bottom-nav', el => el.getBoundingClientRect().height);
    console.log(`BottomNav height: ${bottomNavHeight}px`);

    // 11. Test Theme switch on Assignments page
    console.log('\n[11] Testing Theme switch to Light on /assignments.html...');
    const themeBtn = await page.$('.theme-switch-toggle');
    if (themeBtn) {
      await themeBtn.click();
      await page.waitForTimeout(400);
      const isLight = await page.evaluate(() => document.body.classList.contains('theme-light') || document.documentElement.getAttribute('data-theme') === 'light');
      console.log('Switched to Light theme:', isLight);

      // Verify text contrast/color is readable
      const cardBg = await page.$eval('.assign-card', el => window.getComputedStyle(el).backgroundColor);
      console.log('Assignment card background in Light mode:', cardBg);

      // Switch back
      await themeBtn.click();
      await page.waitForTimeout(300);
    }

  } catch (err) {
    console.error('Fatal error during test suite:', err);
    errors.push(`Test Suite Fatal: ${err.message}`);
  } finally {
    console.log('\n--- ERROR AUDIT SUMMARY ---');
    console.log(`Page & Console Errors: ${errors.length}`);
    errors.forEach(e => console.log('  ❌', e));
    console.log(`Network Failures: ${networkErrors.length}`);
    networkErrors.forEach(e => console.log('  ⚠️', e));

    await browser.close();

    if (errors.length > 0 || networkErrors.length > 0) {
      process.exit(1);
    } else {
      console.log('\n✅ TEST SUITE 7 PASSED WITH 0 ERRORS!');
      process.exit(0);
    }
  }
}

run();
