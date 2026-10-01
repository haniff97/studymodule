import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const db = new DatabaseSync(path.join(__dirname, 'data.db'))
db.exec('PRAGMA journal_mode = WAL')

export function init() {
  const hasTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get()
  if (hasTables) return
  const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  db.exec(schema)
}

export default db
