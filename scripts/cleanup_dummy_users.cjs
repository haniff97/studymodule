const Database = require('../backend/node_modules/better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../backend/data.db');
const db = new Database(dbPath);

console.log('--- Cleaning Up Dummy Users ---');
const beforeUsers = db.prepare('SELECT id, username, display_name, role FROM users').all();
console.log('Current users before cleanup:', beforeUsers);

// Delete progress records for dummy users
const dummyUsers = db.prepare("SELECT id FROM users WHERE username NOT IN ('admin', 'demo')").all();
const dummyUserIds = dummyUsers.map(u => u.id);

if (dummyUserIds.length > 0) {
  const placeholders = dummyUserIds.map(() => '?').join(',');
  const delProgress = db.prepare(`DELETE FROM progress WHERE user_id IN (${placeholders})`).run(...dummyUserIds);
  console.log(`Deleted ${delProgress.changes} progress records for dummy users.`);
  
  const delSessions = db.prepare(`DELETE FROM sessions WHERE user_id IN (${placeholders})`).run(...dummyUserIds);
  console.log(`Deleted ${delSessions.changes} sessions for dummy users.`);

  const delUsers = db.prepare("DELETE FROM users WHERE username NOT IN ('admin', 'demo')").run();
  console.log(`Deleted ${delUsers.changes} dummy users.`);
} else {
  console.log('No dummy users found to delete.');
}

const remainingUsers = db.prepare('SELECT id, username, display_name, role, xp, streak, level FROM users').all();
console.log('\nRemaining Users in Database (ONLY admin & demo):');
console.table(remainingUsers);

db.close();
console.log('✓ Cleanup complete.');
