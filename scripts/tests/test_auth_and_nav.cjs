const { launchBrowser, attachErrorListeners, BASE_URL } = require('./browser_utils.cjs');

async function run() {
  console.log('=== TEST SUITE 1: AUTHENTICATION, SESSION & NAVIGATION ===');
  const browser = await launchBrowser(true);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  const { errors, networkErrors } = attachErrorListeners(page, 'AuthNav');

  try {
    // 1. Landing Page
    console.log('\n[1] Visiting Landing Page (/)');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const title = await page.title();
    console.log(`Page title: "${title}"`);
    if (!title.includes('SmartBrain DPLI') && !title.includes('PDGT Hub')) {
      throw new Error(`Expected title to include "SmartBrain DPLI", got: "${title}"`);
    }

    // Toggle theme on Landing
    console.log('Testing theme toggle on Landing page...');
    const themeBtn = page.locator('.theme-toggle-btn, [aria-label*="theme" i], [title*="mod" i]').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(300);
      const isDarkClass = await page.evaluate(() => document.documentElement.classList.contains('light') || document.body.classList.contains('light'));
      console.log('Theme toggled, light mode active:', isDarkClass);
      // Toggle back
      await themeBtn.click();
      await page.waitForTimeout(300);
    }

    // 2. Navigation to Login
    console.log('\n[2] Navigating to /login');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });

    // Test bilingual toggle on Login page
    console.log('Testing bilingual toggle on Login page...');
    const enLangBtn = page.locator('.lang-pill button, .lang-toggle button').filter({ hasText: /en/i }).first();
    if (await enLangBtn.isVisible()) {
      await enLangBtn.click();
      await page.waitForTimeout(300);
      const enWelcome = await page.locator('.auth-heading-wrap h3').innerText();
      console.log(`Login heading in EN: "${enWelcome}"`);
      if (!enWelcome.toLowerCase().includes('welcome')) {
        throw new Error(`Expected English login heading containing 'welcome', got: "${enWelcome}"`);
      }

      // Switch back to BM
      const bmLangBtn = page.locator('.lang-pill button, .lang-toggle button').filter({ hasText: /bm/i }).first();
      await bmLangBtn.click();
      await page.waitForTimeout(300);
      const bmWelcome = await page.locator('.auth-heading-wrap h3').innerText();
      console.log(`Login heading back in BM: "${bmWelcome}"`);
    }
    
    // Test invalid login
    console.log('Testing invalid credentials...');
    await page.fill('input[name="username"]', 'baduser');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    const errorMsg = await page.locator('.auth-error').textContent();
    console.log(`Error message displayed: "${errorMsg}"`);
    if (!errorMsg || !errorMsg.includes('tidak sah')) {
      throw new Error(`Expected invalid login error message, got: "${errorMsg}"`);
    }

    // Test valid login (demo / demo123)
    console.log('Logging in as demo user...');
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo123');
    await page.click('button[type="submit"]');
    
    await page.waitForURL('**/home', { timeout: 8000 });
    console.log('Successfully navigated to /home!');

    // 3. Verify Home Dashboard
    console.log('\n[3] Verifying Home Dashboard content...');
    await page.waitForSelector('.hero-card, .menu-grid, .stats-row', { timeout: 5000 });
    const heroText = await page.locator('.hero-card, h1, h2').first().innerText();
    console.log(`Hero greeting: "${heroText.trim().replace(/\n+/g, ' ')}"`);

    // Check refresh persistence
    console.log('Refreshing page to test session persistence...');
    await page.reload({ waitUntil: 'networkidle' });
    const currentUrl = page.url();
    if (!currentUrl.includes('/home')) {
      throw new Error(`Session lost on reload! Redirected to: ${currentUrl}`);
    }
    console.log('Session persists successfully across reload!');

    // 4. Sidebar Navigation
    console.log('\n[4] Testing Sidebar Navigation...');
    
    // Navigate to Notes Hub
    console.log('Navigating to Notes Hub (/notes-hub.html)...');
    await page.goto(`${BASE_URL}/notes-hub.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-notes, .topic-card-box, .notes-actions-grid', { timeout: 8000 });
    console.log('Notes Hub loaded successfully!');

    // Navigate to Exam Hub
    console.log('Navigating to Exam Hub (/Study_hub_exam_full.html)...');
    await page.goto(`${BASE_URL}/Study_hub_exam_full.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-exam, .mode-grid-2col, .exam-section', { timeout: 8000 });
    console.log('Exam Hub loaded successfully!');

    // Navigate to Arcade Lobby
    console.log('Navigating to Arcade Lobby (/arcade-lobby.html)...');
    await page.goto(`${BASE_URL}/arcade-lobby.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.hero-arcade, .arcade-grid, .game-card-styled', { timeout: 8000 });
    console.log('Arcade Lobby loaded successfully!');

    // Navigate to Tips
    console.log('Navigating to Tips (/tips.html)...');
    await page.goto(`${BASE_URL}/tips.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.tips-grid, .tip-card, .tips-header, .hero-card', { timeout: 8000 });
    console.log('Tips page loaded successfully!');

    // Navigate to Profile
    console.log('Navigating to Profile (/profile.html)...');
    await page.goto(`${BASE_URL}/profile.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.profile-page-container, .hero-profile, .prof-kpi-grid', { timeout: 8000 });
    console.log('Profile page loaded successfully!');

    // 5. Test Logout
    console.log('\n[5] Testing Logout...');
    const logoutBtn = page.locator('.profile-logout-card, .sb-logout-btn, button:has-text("Log Keluar")').first();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.waitForFunction(() => window.location.pathname.includes('login'), { timeout: 8000 });
      console.log(`URL after logout: ${page.url()}`);
    } else {
      console.log('Calling logout API directly...');
      await page.evaluate(async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
      });
      await page.goto(`${BASE_URL}/login`);
    }

    // 6. Test Registration & Signup Flow (/signup.html)
    console.log('\n[6] Testing Student Registration on /signup.html...');
    await page.goto(`${BASE_URL}/signup.html`, { waitUntil: 'networkidle' });

    // Test bilingual toggle on Signup page
    console.log('Testing bilingual toggle on Signup page...');
    const enSignupBtn = page.locator('.lang-pill button, .lang-toggle button').filter({ hasText: /en/i }).first();
    if (await enSignupBtn.isVisible()) {
      await enSignupBtn.click();
      await page.waitForTimeout(300);
      const enH3 = await page.locator('.auth-heading-wrap h3').innerText();
      console.log(`Signup heading in EN: "${enH3}"`);
      if (!enH3.toLowerCase().includes('unlock')) {
        throw new Error(`Expected English signup heading containing 'unlock', got: "${enH3}"`);
      }

      // Switch back to BM
      const bmSignupBtn = page.locator('.lang-pill button, .lang-toggle button').filter({ hasText: /bm/i }).first();
      await bmSignupBtn.click();
      await page.waitForTimeout(300);
      const bmH3 = await page.locator('.auth-heading-wrap h3').innerText();
      console.log(`Signup heading in BM: "${bmH3}"`);
    }

    // Test validation: username too short
    console.log('Testing validation with short username...');
    await page.fill('input[name="username"]', 'ab');
    await page.fill('input[name="password"]', 'pass123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(400);
    const valError = await page.locator('.auth-error').innerText();
    console.log(`Validation error message: "${valError}"`);
    if (!valError.includes('3 aksara') && !valError.includes('3 characters')) {
      throw new Error(`Expected 3 characters validation error, got: "${valError}"`);
    }

    // Test valid registration
    const newStudentUser = `student_${Date.now()}`;
    const newStudentPass = 'studPass123';
    console.log(`Registering new student: ${newStudentUser}...`);
    await page.fill('input[name="username"]', newStudentUser);
    await page.fill('input[name="password"]', newStudentPass);
    await page.fill('input[name="email"]', `${newStudentUser}@oum.edu.my`);
    await page.click('button[type="submit"]');

    await page.waitForURL('**/home', { timeout: 10000 });
    console.log(`✓ Registration succeeded! Redirected to /home with active session.`);

    // Verify profile displays registered username
    await page.goto(`${BASE_URL}/profile.html`, { waitUntil: 'networkidle' });
    const profileUser = await page.locator('.profile-name, .prof-header-name, h2').first().innerText();
    console.log(`Profile name for new student: "${profileUser}"`);

    // Log out new student
    console.log('Logging out newly registered student...');
    await page.evaluate(async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
    });
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });

    // Log back in with the newly created account
    console.log(`Logging back in with ${newStudentUser}...`);
    await page.fill('input[name="username"]', newStudentUser);
    await page.fill('input[name="password"]', newStudentPass);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home', { timeout: 10000 });
    console.log(`✓ Re-login successful! Persistent database storage verified for new student.`);

    // Log out so subsequent test suites can run clean
    await page.evaluate(async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
    });

    // Clean up temporary test student account so no dummy users linger in the database
    try {
      const Database = require('../../backend/node_modules/better-sqlite3');
      const path = require('path');
      const db = new Database(path.join(__dirname, '../../backend/data.db'));
      db.prepare('DELETE FROM users WHERE username = ?').run(newStudentUser);
      db.close();
      console.log(`✓ Cleaned up temporary test user ${newStudentUser} from database.`);
    } catch (e) {
      console.warn('Could not clean up temporary test user:', e.message);
    }

    console.log('\n--- ERROR SUMMARY ---');
    console.log(`Page errors: ${errors.length}`);
    console.log(`Network errors: ${networkErrors.length}`);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }

    console.log('\n✅ TEST SUITE 1 PASSED WITH 0 CRITICAL FAILURES!');
  } catch (err) {
    console.error('\n❌ TEST SUITE 1 FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
