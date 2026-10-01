const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function run() {
  console.log('=== TEST SUITE 3: EXAM SIMULATOR AND QUIZ RUNNER ===');
  const browser = await launchBrowser(true);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  const { errors, networkErrors } = attachErrorListeners(page, 'ExamTest');

  try {
    // 1. Log in
    console.log('[1] Logging in as demo user...');
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 8000 });

    // 2. Go to Exam Lobby
    console.log('\n[2] Navigating to Exam Hub (/Study_hub_exam_full.html)...');
    await page.goto(`${BASE_URL}/Study_hub_exam_full.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-exam', { timeout: 5000 });

    // Check lobby components
    const modeCards = await page.locator('.mode-card-styled').count();
    console.log(`Found ${modeCards} mode cards (expected 2)`);
    if (modeCards !== 2) throw new Error(`Expected 2 mode cards, found ${modeCards}`);

    const subjCards = await page.locator('.subj-row-card').count();
    console.log(`Found ${subjCards} subject cards (expected 6)`);
    if (subjCards !== 6) throw new Error(`Expected 6 subject cards, found ${subjCards}`);

    // 3. Test subject switching in lobby
    console.log('\n[3] Testing subject switching and set selection...');
    const subjects = ['1103', '1203', '2303', '1303', '5103', '5533'];
    for (const sCode of subjects) {
      const card = page.locator(`.subj-row-card:has(.src-code:has-text("${sCode}"))`).first();
      await card.click();
      await page.waitForTimeout(300);
      const setCount = await page.locator('.set-tile').count();
      const activeSets = await page.locator('.set-tile.active').count();
      console.log(`Subject ${sCode}: loaded ${setCount} sets, active sets: ${activeSets}`);
      if (setCount === 0) throw new Error(`No sets found for subject ${sCode}`);
      if (activeSets === 0) throw new Error(`No active set highlighted for subject ${sCode}`);
    }

    // Switch back to 1103 for Learn Mode test
    await page.locator('.subj-row-card:has(.src-code:has-text("1103"))').first().click();
    await page.waitForTimeout(300);

    // 4. Test Learn mode (instant feedback)
    console.log('\n[4] Testing Learn mode...');
    await page.locator('.mode-card-styled').first().click();
    await page.waitForTimeout(200);

    // Click Start Exam
    const startBtn = page.locator('.exam-start-btn, .hero-white-btn').first();
    await startBtn.click();
    await page.waitForSelector('.quiz-session', { timeout: 6000 });
    console.log('Exam session started successfully.');

    // Verify question 1
    const qTitle = await page.locator('.q-title').innerText();
    const qText = await page.locator('.q-text').innerText();
    const optCount = await page.locator('.opt-btn').count();
    console.log(`Question: ${qTitle} - "${qText.slice(0, 40)}..." with ${optCount} options`);
    if (optCount !== 4) throw new Error(`Expected 4 options, got ${optCount}`);

    // Click option A
    console.log('Selecting option A...');
    await page.locator('.opt-btn').first().click();
    await page.waitForSelector('.qr-feedback', { timeout: 4000 });
    const feedbackText = await page.locator('.qr-feedback span').innerText();
    console.log(`Feedback received: "${feedbackText.slice(0, 50)}..."`);

    // Test Question Palette in Learn mode
    console.log('Toggling question grid/palette...');
    await page.locator('.pw-palette-toggle').click();
    await page.waitForSelector('.q-palette-grid', { timeout: 3000 });
    const paletteButtons = await page.locator('.palette-btn').count();
    console.log(`Palette shows ${paletteButtons} questions`);
    if (paletteButtons === 0) throw new Error('Palette buttons not rendered');

    // Click next button
    await page.locator('.btn-nav-next').click();
    await page.waitForTimeout(300);
    const q2Title = await page.locator('.q-title').innerText();
    console.log(`Navigated to: ${q2Title}`);
    if (!q2Title.includes('2')) throw new Error(`Expected Question 2, got: ${q2Title}`);

    // Click back to selection
    console.log('Returning to lobby...');
    await page.locator('.session-back').click();
    await page.waitForSelector('.exam-lobby-page', { timeout: 5000 });
    console.log('Returned to lobby successfully.');

    // 5. Test Final Exam mode (timed mode + submit + review)
    console.log('\n[5] Testing Final Exam simulation mode...');
    await page.locator('.mode-card-styled').nth(1).click();
    await page.waitForTimeout(200);

    // Start exam
    await page.locator('.exam-start-btn').first().click();
    await page.waitForSelector('.quiz-session', { timeout: 6000 });

    // Verify timer is running
    const timerVal1 = await page.locator('.timer-value').innerText();
    await page.waitForTimeout(1100);
    const timerVal2 = await page.locator('.timer-value').innerText();
    console.log(`Timer test: ${timerVal1} -> ${timerVal2}`);

    // Answer Q1
    await page.locator('.opt-btn').first().click();
    // Verify NO instant feedback in Final Exam mode
    const hasFeedback = await page.locator('.qr-feedback').isVisible();
    console.log(`Instant feedback in Final Exam mode: ${hasFeedback} (expected false)`);
    if (hasFeedback) throw new Error('Final Exam mode should NOT show instant feedback before submitting');

    // Jump to last question using palette
    await page.locator('.pw-palette-toggle').click();
    await page.waitForSelector('.q-palette-grid', { timeout: 3000 });
    const lastPalBtn = page.locator('.palette-btn').last();
    await lastPalBtn.click();
    await page.waitForTimeout(300);

    // Check we are on the last question and submit button is available
    const lastQTitle = await page.locator('.q-title').innerText();
    console.log(`Jumped to last question: ${lastQTitle}`);
    const submitBtn = page.locator('.btn-nav-next').first();
    await submitBtn.click();

    // Confirm submission modal
    console.log('Verifying submission confirmation modal...');
    await page.waitForSelector('.modal-backdrop', { timeout: 4000 });
    const modalText = await page.locator('.modal-body').innerText();
    console.log(`Modal prompt: "${modalText.replace(/\n/g, ' ').slice(0, 60)}..."`);
    await page.locator('.modal-actions button.btn-primary').click();

    // 6. Verify Results Screen
    console.log('\n[6] Verifying Results Screen...');
    await page.waitForSelector('.quiz-result-card', { timeout: 6000 });
    const resultPct = await page.locator('.qr-pct-big').innerText();
    const verdictTitle = await page.locator('.qr-verdict-title').innerText();
    console.log(`Results displayed: Score ${resultPct}, Verdict: "${verdictTitle}"`);

    // 7. Verify Review Screen
    console.log('\n[7] Verifying Answer Review...');
    await page.locator('.btn-review').click();
    await page.waitForSelector('.review-section', { timeout: 4000 });
    const reviewItemsCount = await page.locator('.review-item').count();
    console.log(`Review items rendered: ${reviewItemsCount}`);
    if (reviewItemsCount === 0) throw new Error('No review items rendered');

    // Check for any 'undefined. undefined' in review items
    const reviewContent = await page.locator('.review-section').innerText();
    if (reviewContent.includes('undefined. undefined')) {
      throw new Error(`Found 'undefined. undefined' in review content: ${reviewContent.slice(0, 200)}`);
    }
    console.log('Review items verified: NO "undefined. undefined" found!');

    // 8. Test Bilingual Switch (English)
    console.log('\n[8] Testing bilingual language switch (English)...');
    const langBtn = page.locator('.tb-lang-btn, button:has-text("BM"), button:has-text("EN")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(400);
      const retryBtnText = await page.locator('.btn-retry').innerText();
      console.log(`Switched language. Retry button text: "${retryBtnText}"`);
    }

    // 9. Test Theme Switch (Light Theme)
    console.log('\n[9] Testing theme switch (Light theme)...');
    const themeBtn = page.locator('.tb-theme-btn, button:has(.material-symbols-rounded:has-text("light_mode")), button:has(.material-symbols-rounded:has-text("dark_mode"))').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(400);
      const isLight = await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'light' || document.body.classList.contains('theme-light'));
      console.log(`Switched to light theme: ${isLight}`);
    }

    // 10. Test Retry Button
    console.log('\n[10] Testing Retry ("Cuba Lagi" / "Try Again")...');
    await page.locator('.btn-retry').click();
    await page.waitForSelector('.q-card', { timeout: 5000 });
    const resetQTitle = await page.locator('.q-title').innerText();
    console.log(`Reset successfully. Question title: ${resetQTitle}`);

    console.log('\n=== EXAM TEST SUITE COMPLETE ===');
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
    console.log('ALL EXAM SIMULATOR TESTS PASSED WITH 0 ERRORS!');
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();