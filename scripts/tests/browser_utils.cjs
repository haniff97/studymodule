const { chromium } = require('playwright-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4000';

async function launchBrowser(headless = true) {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  return browser;
}

function attachErrorListeners(page, contextName = '') {
  const errors = [];
  const warnings = [];
  const networkErrors = [];

  page.on('pageerror', (err) => {
    const msg = `[PAGE ERROR ${contextName}]: ${err.message}\n${err.stack}`;
    console.error(msg);
    errors.push(msg);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = `[CONSOLE ERROR ${contextName}]: ${msg.text()}`;
      if (!text.includes('401')) {
        console.error(text);
        errors.push(text);
      }
    } else if (msg.type() === 'warning') {
      warnings.push(`[CONSOLE WARN ${contextName}]: ${msg.text()}`);
    }
  });

  page.on('response', (res) => {
    const status = res.status();
    const url = res.url();
    // 401 on /api/auth/me or /api/auth/login (bad credentials check) are expected during tests
    if (status >= 400 && !url.includes('/api/auth/me') && !(status === 401 && url.includes('/api/auth/login'))) {
      const msg = `[HTTP ${status}]: ${res.request().method()} ${url}`;
      console.error(msg);
      errors.push(msg);
    }
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    const failure = req.failure();
    const errorText = failure ? failure.errorText : 'unknown';
    if (!url.includes('favicon') && errorText !== 'net::ERR_ABORTED') {
      const msg = `[NETWORK FAILED ${contextName}]: ${req.method()} ${url} - ${errorText}`;
      console.error(msg);
      networkErrors.push(msg);
    }
  });

  return { errors, warnings, networkErrors };
}

module.exports = {
  launchBrowser,
  attachErrorListeners,
  BASE_URL
};
