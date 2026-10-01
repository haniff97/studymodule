const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

const SUBJECTS_TO_TEST = [
  { code: '1103', name: 'HPGD1103', count: 10, route: '/notes-hpgd1103.html' },
  { code: '1203', name: 'HPGD1203', count: 10, route: '/notes-hpgd1203.html' },
  { code: '2303', name: 'HPGD2303', count: 10, route: '/notes-hpgd2303.html' },
  { code: '1303', name: 'HPGD1303', count: 9, route: '/notes-hpgd1303.html' },
  { code: '5103', name: 'HMML5103', count: 10, route: '/notes-hmml5103.html' },
  { code: '5533', name: 'HMML5533', count: 10, route: '/notes-hmml5533.html' },
];

async function run() {
  console.log('=== TEST SUITE 2: NOTES HUB & TOPIC NOTES (6 SUBJECTS) ===');
  const browser = await launchBrowser(true);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  const { errors, networkErrors } = attachErrorListeners(page, 'NotesTest');

  try {
    // 1. Log in
    console.log('[1] Logging in as demo user...');
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 8000 });

    // 2. Go to Notes Hub
    console.log('\n[2] Navigating to Notes Hub (/notes-hub.html)...');
    await page.goto(`${BASE_URL}/notes-hub.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-notes', { timeout: 5000 });

    // 3. Test each subject tab on Notes Hub
    for (const subj of SUBJECTS_TO_TEST) {
      console.log(`\nTesting subject ${subj.name} (${subj.code})...`);
      
      // Click subject tab
      const tab = page.locator(`.hub-tab-btn:has-text("${subj.name}"), button:has-text("${subj.name}")`).first();
      if (await tab.isVisible()) {
        await tab.click();
        await page.waitForTimeout(400);
      } else {
        await page.goto(`${BASE_URL}/notes-hub.html?subj=${subj.code}`, { waitUntil: 'networkidle' });
      }

      // Check topic cards rendered
      await page.waitForSelector('.topic-card-box', { timeout: 5000 });
      const cardsCount = await page.locator('.topic-card-box').count();
      console.log(`Rendered ${cardsCount} topic cards (expected ${subj.count})`);
      if (cardsCount !== subj.count) {
        throw new Error(`Expected ${subj.count} topic cards for ${subj.name}, got: ${cardsCount}`);
      }
    }

    // 4. Test TopicNotes details & interactions on HPGD1103
    console.log('\n[3] Testing Topic Notes view & interactions on HPGD1103...');
    await page.goto(`${BASE_URL}/notes-hpgd1103.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.note-section', { timeout: 5000 });

    const noteHeading = await page.locator('.page-head h2').innerText();
    console.log(`Topic title: "${noteHeading}"`);

    // Test QuizBlock interaction
    console.log('Testing QuizBlock questions & answering...');
    await page.waitForSelector('.quiz-block-card, .q-text', { timeout: 5000 });
    const qText = await page.locator('.q-text').innerText();
    console.log(`Quiz question: "${qText.substring(0, 60)}..."`);

    // Click option A
    const optA = page.locator('.opt-btn').first();
    await optA.click();
    await page.waitForTimeout(300);

    // Verify feedback appeared
    const feedback = await page.locator('.qr-feedback').innerText();
    console.log(`Quiz feedback after answer: "${feedback.substring(0, 50)}..."`);
    if (!feedback || (!feedback.includes('Betul') && !feedback.includes('Salah'))) {
      throw new Error(`Expected feedback ("Betul" or "Salah"), got: "${feedback}"`);
    }

    // Click "Seterusnya"
    const nextBtn = page.locator('.btn-nav-next');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      const q2Text = await page.locator('.q-text').innerText();
      console.log(`Navigated to question 2: "${q2Text.substring(0, 60)}..."`);
    }

    // Test Flashcard interaction
    console.log('\nTesting FlashcardCarousel...');
    await page.waitForSelector('.flashcard, .fc-card, .fc-carousel', { timeout: 5000 });
    const card = page.locator('.fc-card, .flashcard').first();
    if (await card.isVisible()) {
      // Flip card
      await card.click();
      await page.waitForTimeout(300);
      console.log('Flashcard clicked to flip successfully.');
    }

    // Test Topic Navigation chips
    console.log('\nTesting topic nav chips...');
    const chip2 = page.locator('.tn-chip:has-text("2")').first();
    if (await chip2.isVisible()) {
      await chip2.click();
      await page.waitForTimeout(500);
      const newTitle = await page.locator('.page-head h2').innerText();
      console.log(`Navigated via chip 2, title: "${newTitle}"`);
      if (!newTitle.includes('2')) {
        throw new Error(`Expected topic 2 in title, got: "${newTitle}"`);
      }
    }

    // 5. Test HMML5103 (Malay Linguistics) TopicNotes
    console.log('\n[4] Testing HMML5103 TopicNotes directly...');
    await page.goto(`${BASE_URL}/notes-hmml5103.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.note-section', { timeout: 5000 });
    const hmmlTitle = await page.locator('.page-head h2').innerText();
    console.log(`HMML5103 Topik 1 title: "${hmmlTitle}"`);

    // Test HMML5103 Quiz
    const hmmlOpt = page.locator('.opt-btn').first();
    if (await hmmlOpt.isVisible()) {
      await hmmlOpt.click();
      await page.waitForTimeout(300);
      const hmmlFeedback = await page.locator('.qr-feedback').innerText();
      console.log(`HMML5103 Quiz feedback: "${hmmlFeedback.substring(0, 50)}..."`);
    }

    // 6. Test HMML5533 (Pedagogical Innovation) TopicNotes
    console.log('\n[5] Testing HMML5533 TopicNotes directly...');
    await page.goto(`${BASE_URL}/notes-hmml5533.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.note-section', { timeout: 5000 });
    const hmml5533Title = await page.locator('.page-head h2').innerText();
    console.log(`HMML5533 Topik 1 title: "${hmml5533Title}"`);

    // 7. Test HPGD1303 (History of Edu) TopicNotes
    console.log('\n[6] Testing HPGD1303 TopicNotes directly...');
    await page.goto(`${BASE_URL}/notes-hpgd1303.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.note-section', { timeout: 5000 });
    const hpgd1303Title = await page.locator('.page-head h2').innerText();
    console.log(`HPGD1303 Topik 1 title: "${hpgd1303Title}"`);

    console.log('\n--- ERROR SUMMARY ---');
    console.log(`Page errors: ${errors.length}`);
    console.log(`Network errors: ${networkErrors.length}`);
    if (errors.length > 0) {
      console.log('Errors:', errors);
      throw new Error(`Unexpected errors during Notes testing: ${errors.join(', ')}`);
    }

    console.log('\n✅ TEST SUITE 2 PASSED WITH 0 CRITICAL FAILURES!');
  } catch (err) {
    console.error('\n❌ TEST SUITE 2 FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
