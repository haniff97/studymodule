import Database from 'better-sqlite3'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const db = new Database(path.join(__dirname, 'data.db'))
db.pragma('journal_mode = WAL')

export function init() {
  const hasTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get()
  if (hasTables) return
  const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  db.exec(schema)
}

export default db
