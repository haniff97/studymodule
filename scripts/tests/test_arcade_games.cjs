const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function run() {
  console.log('=== TEST SUITE 4: ARCADE GAMES AND LOBBY ===');
  const browser = await launchBrowser(true);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  const { errors, networkErrors } = attachErrorListeners(page, 'ArcadeTest');

  try {
    // 1. Log in
    console.log('[1] Logging in as demo user...');
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 8000 });

    // 2. Go to Arcade Lobby
    console.log('\n[2] Navigating to Arcade Lobby (/arcade-lobby.html)...');
    await page.goto(`${BASE_URL}/arcade-lobby.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-arcade', { timeout: 5000 });

    // Check game cards
    const gameCards = await page.locator('.game-card-styled').count();
    console.log(`Found ${gameCards} game cards (expected 6)`);
    if (gameCards !== 6) throw new Error(`Expected 6 game cards, found ${gameCards}`);

    // Check subject filter tabs
    const filterTabs = await page.locator('.nth-tab').count();
    console.log(`Found ${filterTabs} filter tabs (expected 7: all + 6 subjects)`);
    if (filterTabs !== 7) throw new Error(`Expected 7 filter tabs, found ${filterTabs}`);

    // Click subject filter tab HMML5103
    const hmmlTab = page.locator('.nth-tab:has-text("HMML5103")').first();
    await hmmlTab.click();
    await page.waitForTimeout(200);
    const badgeText = await page.locator('.nth-right-badge').innerText();
    console.log(`Filter badge updated to: ${badgeText}`);

    // 3. Test Full Leaderboard View
    console.log('\n[3] Testing Leaderboard View (/arcade.html?view=leaderboard)...');
    await page.goto(`${BASE_URL}/arcade.html?view=leaderboard`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.leaderboard-table', { timeout: 5000 });
    const lbRows = await page.locator('.ldr-row').count();
    console.log(`Leaderboard table rendered ${lbRows} players`);
    if (lbRows === 0) throw new Error('Leaderboard table has 0 rows');

    // 4. Test Game 1: Quick Quiz (/arcade.html?game=quick&subject=all)
    console.log('\n[4] Testing Quick Quiz...');
    await page.goto(`${BASE_URL}/arcade.html?game=quick&subject=all`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.quiz-runner', { timeout: 6000 });

    // Verify question and options
    const qText = await page.locator('.qr-question h4').innerText();
    const optCount = await page.locator('.qr-option').count();
    console.log(`Quick Quiz Q1: "${qText.slice(0, 40)}..." (${optCount} options)`);
    if (optCount !== 4) throw new Error(`Expected 4 options, got ${optCount}`);

    // Answer Q1
    await page.locator('.qr-option').first().click();
    await page.waitForSelector('.qr-feedback', { timeout: 4000 });
    const fbText = await page.locator('.qr-feedback span').innerText();
    console.log(`Quick Quiz feedback received: "${fbText.slice(0, 40)}..."`);

    // Verify option highlighted (either .correct or .wrong exists)
    const hasHighlight = await page.locator('.qr-option.correct, .qr-option.wrong').count();
    console.log(`Option highlight count: ${hasHighlight}`);
    if (hasHighlight === 0) throw new Error('Option was not highlighted after answering');

    // Wait for auto advance
    await page.waitForTimeout(700);
    const qCountText = await page.locator('.arcade-game-head .af-left').innerText();
    console.log(`Current position: ${qCountText}`);

    // 5. Test Game 2: Myth or Fact (/arcade.html?game=myth&subject=all)
    console.log('\n[5] Testing Myth or Fact mode...');
    await page.goto(`${BASE_URL}/arcade.html?game=myth&subject=all`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.qr-myth-actions', { timeout: 6000 });
    const statement = await page.locator('.qr-question h4').innerText();
    console.log(`Myth statement: "${statement.slice(0, 50)}..."`);
    // Click FAKTA
    await page.locator('.qr-myth-btn.myth-fakta').click();
    await page.waitForSelector('.qr-feedback', { timeout: 4000 });
    console.log('Myth answered and feedback displayed successfully.');

    // 6. Test Game 3: Boss Battle (/arcade.html?game=boss&subject=all)
    console.log('\n[6] Testing Boss Battle mode...');
    await page.goto(`${BASE_URL}/arcade.html?game=boss&subject=all`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.boss-hud', { timeout: 6000 });
    const bossHpText = await page.locator('.bh-boss .bh-num').innerText();
    const playerHpText = await page.locator('.bh-player .bh-num').innerText();
    console.log(`Boss HP: ${bossHpText}, Player HP: ${playerHpText}`);
    // Answer Q1
    await page.locator('.qr-option').first().click();
    await page.waitForSelector('.qr-feedback', { timeout: 4000 });
    console.log('Boss battle Q1 answered.');

    // 7. Test Game 4: Survival mode (/arcade.html?game=survival&subject=all)
    console.log('\n[7] Testing Survival mode...');
    await page.goto(`${BASE_URL}/arcade.html?game=survival&subject=all`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.ag-stat.lives', { timeout: 6000 });
    const livesText = await page.locator('.ag-stat.lives').innerText();
    console.log(`Survival lives display: ${livesText}`);

    // 8. Test Game Results & Review Screen via Myth mode
    console.log('\n[8] Navigating to Myth mode and playing through 8 questions to test Results and Review screens...');
    await page.goto(`${BASE_URL}/arcade.html?game=myth&subject=all`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.qr-myth-actions', { timeout: 6000 });

    for (let i = 0; i < 9; i++) {
      const isGameOver = await page.locator('.arcade-result').isVisible();
      if (isGameOver) break;
      const btn = page.locator('.qr-myth-btn').first();
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(650);
      }
    }

    // Wait for arcade result
    await page.waitForSelector('.arcade-result', { timeout: 8000 });
    const arPct = await page.locator('.ar-ring-center').innerText();
    const arScore = await page.locator('.ar-score').innerText();
    console.log(`Arcade game completed: Ring ${arPct}, Score: ${arScore}`);

    // Test Review tab
    console.log('Testing Answer Review tab...');
    await page.locator('.ar-tab:has-text("Semak Jawapan"), .ar-tab:has-text("Review")').click();
    await page.waitForSelector('.ar-review', { timeout: 4000 });
    const revItems = await page.locator('.ar-review .review-item').count();
    console.log(`Arcade review items rendered: ${revItems}`);
    if (revItems === 0) throw new Error('Arcade review items not rendered');

    const revText = await page.locator('.ar-review').innerText();
    if (revText.includes('undefined. undefined')) {
      throw new Error(`Found 'undefined. undefined' in arcade review: ${revText.slice(0, 200)}`);
    }
    console.log('Arcade review verified: NO "undefined. undefined" found!');

    console.log('\n=== ARCADE TEST SUITE COMPLETE ===');
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
    console.log('ALL ARCADE TESTS PASSED WITH 0 ERRORS!');
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();