const { spawn } = require('child_process');
const path = require('path');

const TEST_FILES = [
  'test_auth_and_nav.cjs',
  'test_notes_and_topics.cjs',
  'test_assignments_and_notes.cjs',
  'test_exam_simulator.cjs',
  'test_arcade_games.cjs',
  'test_tips_and_admin.cjs',
  'test_mobile_responsive.cjs',
  'test_mobile_assignment_modal.cjs'
];

async function runTest(file) {
  return new Promise((resolve, reject) => {
    console.log(`\n========================================================`);
    console.log(`RUNNING SUITE: ${file}`);
    console.log(`========================================================`);

    const child = spawn('node', [path.join(__dirname, file)], {
      stdio: 'inherit',
      cwd: path.join(__dirname, '../..')
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Test suite ${file} failed with exit code ${code}`));
      }
    });
  });
}

async function runAll() {
  console.log(`STARTING FULL TEST REGRESSION RUN (${TEST_FILES.length} SUITES)\n`);
  const startTime = Date.now();

  for (const file of TEST_FILES) {
    try {
      await runTest(file);
    } catch (err) {
      console.error(`\n❌ REGRESSION FAILURE in ${file}:`, err.message);
      process.exit(1);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n========================================================`);
  console.log(`🎉 ALL ${TEST_FILES.length} TEST SUITES PASSED CLEANLY! (Elapsed: ${durationSec}s)`);
  console.log(`========================================================\n`);
  process.exit(0);
}

runAll();
