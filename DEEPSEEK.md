# DEEPSEEK.md — PDGT Hub Clone (OnlineStudy_Platform)

Project context for any AI harness (opencode, Codex, Claude Code, Cursor, Antigravity, or a fresh chat). Read this first; it contains everything needed to continue the work without asking the previous session.

---

## 1. What this project is

A **full-stack** pixel-faithful clone of [https://www.pdgthub.com](https://www.pdgthub.com) — the PDGT Hub study platform for OUM HPGD students. Originally a static frontend clone (15 visual-parity rounds), now evolved into an app with a **SQLite database + Express backend**: real accounts (admin-created, paid-user model), an admin panel (user management + materials editor), and learner pages wired to the API with server-side answer checking and XP/progress persistence.

- **Repo**: `D:\Tengku\OnlineStudy_Platform` (Git, branch `main`)
- **GitHub**: `https://github.com/engkufizz/OnlineStudy_Platform` (owner: engkufizz, fine-grained token — see §8)
- **Dev server**: `http://127.0.0.1:5173` (Vite, bound `0.0.0.0` — also reachable on LAN at `http://192.168.1.5:5173` for phone testing)
- **Backend API**: `http://localhost:4000` (Express; dev proxied by Vite `/api` → :4000; prod Express serves `dist/`)
- **Live reference site**: `https://www.pdgthub.com` (real content, auth-gated)

## 2. Tech stack & environment

| Item | Value |
|---|---|
| Frontend | **Vite 5.4.21** + **React 18** + React Router 6 |
| Backend | **Express + better-sqlite3 (SQLite)** — `backend/` |
| Auth | express-session (httpOnly cookie `pdgt.sid`) + bcryptjs |
| Node | **v22.14.0** at `C:\Program Files\nodejs\node.exe` ⚠️ PATH `node` is 10.9.2 (too old for Vite 5) — always invoke the full path |
| Language | JSX, bilingual **BM (default) / EN** (`lang` query param + `localStorage.pdgt_lang`) |
| Styling | Plain CSS files per page (no Tailwind) |
| PWA | `public/manifest.json` + `public/sw.js` (cache-first, `pdgt-clone-v1`), registered only in prod |
| Shell | Windows 11 + Git Bash (MSYS). Use `C:/...`-style paths for native tools |

## 3. Architecture & routes

**Backend** (`backend/` — Express, better-sqlite3, sync queries):
- `db.js` opens `backend/data.db` (WAL; **gitignored**), `schema.sql` defines tables: `users` (role admin|user, xp, streak, level), `subjects`, `topics`, `notes` (content_html + fokus flag), `sets`, `questions` (opts_json, correct, difficulty, cognitive), `quizzes`, `flashcards`, `tips` (bilingual), `progress` (user×topic completion + best_score), `sessions`
- `seed.js` — idempotent migration of `src/data/real/*` into the DB + `admin`/`admin123` + `demo`/`demo123`
- `server.js` — all routes (see API list below); `middleware.js` — `authRequired` / `adminRequired`
- Content APIs NEVER return `correct` answer indices; answering goes through `POST /api/content/check`, `/quiz-check` (server-side), or the `bank` endpoint (ids only, no answers)

**API** (`/api`): `auth/login|logout|me` · `content/subjects|topics|notes|sets|questions|quizzes|flashcards|tips|leaderboard|progress|bank|check|quiz-check|xp` · `admin/users` (GET/POST/DELETE/reset-password/progress) · `admin/materials/*` (notes/questions/quizzes/flashcards/tips CRUD) · `admin/subjects|topics|sets`

**Frontend** (React SPA):
```
src/
  main.jsx            # router + providers (Lang, Theme, Auth) + SW registration
  lib/api.js          # typed fetch client (get/post/del, credentials: 'include')
  context/            # LangContext (BM/EN, t() is a FUNCTION), ThemeContext, AuthContext
  components/         # AppShell (+ per-page sidebars), TopBar, QuizRunner, Flashcard, RankChip, LeaderboardTable...
  pages/              # per route: Landing, Login, Admin, Home, NotesHub, TopicNotes, Exam, Arcade, ArcadeLobby, Tips, Profile
  data/real/          # the REAL captured content — seeds the DB (keep in sync if content changes)
```

Routes (all served by Vite dev / static build):
- `/` landing (violet-dark theme, full-bleed, scrolls)
- `/login` (violet-dark theme + aurora), `/signup.html`, `/admin-login.html`
- `/home` dashboard (greeting, KPI strip, continue card, 3-row dash: subjects 657+missions 322 / weekly 485+arcade 485, tips)
- `/notes-hub.html` + `/notes-hpgd1103.html` / `1203` / `2303` (notes; topics are hash sections `#t1`..`#t10`, `#flashcards`, `#progress`)
- `/Study_hub_exam_full.html` (exam lobby → session → result → review)
- `/arcade-lobby.html`, `/arcade.html?game=quick|myth|sprint|blitz|boss|survival&subject=all`
- `/tips.html`, `/profile.html`

**Auth is mock**: any non-empty username/password on `/login` lands on `/home` (React state, no backend).

## 4. Content (all REAL, captured from the live site — do not replace with mock)

| Data | Volume | Module |
|---|---|---|
| Exam questions | **880** (1103: 7 sets × 40; 1203: 8 sets; 2303: 7 sets), each with `q, opts, a, exp, topic, difficulty, cognitive` | `src/data/real/real-questions.js` → `realQuestionSets` |
| Topic quizzes | 150 (5 per topic × 30) | `real-quizzes.js` |
| Flashcards | 91 (20+51+20) | `real-flashcards.js` |
| Notes content | 36 topics, 134 sections (sections, Fokus Peperiksaan, summaries) | `real-notes.js` |
| Tips | 30 bilingual | `real-tips.js` |

Derived modules (`src/data/topics.js`, `questions.js`, `program.js`) re-export/wrap these. The exam set catalog lives in the data with real titles (**Set Mudah / Set Sederhana / Set Sukar / Mock Exam N (KBAT)**).

Source URLs (public, no auth): `https://pdgthub.com/data/exam-sets/{hpgd1103|hpgd1203|hpgd2303}/{easy|medium|hard|set-1..7}.json`, `https://pdgthub.com/data/tips.json`. Notes/quizzes/flashcards were extracted from the auth-gated page DOM (see §9).

## 5. Design system (measured from the live site — keep these values)

**Shell (authenticated pages)** — a centered 1280px "app window", page never scrolls, main scrolls internally:
- `.shell`: `max-width:1280px; margin:0 auto; position:relative; z-index:10; background:rgba(22,22,26,0.984); display:flex; flex-direction:column; height:100vh`
- Topbar 50px `rgba(28,28,33,0.996)` · Sidebar **218px** `rgba(36,36,41,0.96)` · Footer 26px `rgba(28,28,33,0.996)`
- Main: `flex:1; overflow-y:auto; min-height:0; padding:28px 32px 24px; background:rgba(10,10,12,0.24)` → content column ≈ **992px**
- Content column: x=333 (of 1440), width 992

**Colors**
- App bg `rgb(28,28,33)` · Notes theme bg `rgb(20,18,24)` · Tips theme bg `rgb(5,4,16)`
- **Login + Landing**: bg `rgb(5,4,16)`, 4-layer violet aurora + 3 blurred bands (b1 `rgba(108,71,208,0.18)` 1053×376 @(-422,-298), b2 `rgba(13,148,136,0.14)` 853×311 @(932,831), b3 `rgba(180,80,220,0.10)` 623×259 @(301,239); all `filter:blur(80px)`); aurora layer `position:fixed; 2016×1260 @(-288,-180); z-index:0` (content must be z≥1/relative)
- **Teal aurora** (notes-hub, arcade-lobby, profile): 4-layer teal gradients (`rgb(20,63,88)`, `rgb(31,122,122)`, `rgb(47,154,147)`, `rgb(91,191,159)`), same layer geometry
- Primary button: `linear-gradient(135deg, rgb(162,146,255), rgb(192,178,255))`, white text, r10
- Exam "Mula": solid `rgb(155,125,245)` r12 · **Notes/arcade hero CTAs: WHITE bg, text `rgb(90,53,190)`, r12**
- Cards: `rgba(36,36,41,0.965)` r14 (home dash) · r18 (landing) · r24 (notes) · `rgba(255,255,255,0.05)` r10 (exam tiles)
- Login panel: `rgba(255,255,255,0.067)` bg, border `rgba(255,255,255,0.2)`, r20, 420px
- Option buttons (quiz): `rgba(39,39,45,0.95)` · Selected: `rgba(162,146,255,0.14)` tint
- Bottom nav (≤700px) active `rgb(162,146,255)`, inactive `rgba(255,255,255,0.45)`
- Sidebar active item: `rgba(140,120,245,0.14)` bg + `rgb(162,146,255)` text
- Verdict tiers (result screen): ≥80 "Cemerlang! 🎉" / ≥60 "Bagus! Teruskan!" / ≥40 "Boleh Lebih Baik" / else "Perlu Lebih Usaha" / timeout "Masa Tamat ⏰"
- Arcade stars: `pct>=80?3 : pct>=50?2 : 1`; messages: "Boleh lebih baik lagi! Cuba sekali lagi! 💪" / "Kerja bagus! Terus tingkatkan! 👍" / "Luar biasa! Kamu memang terbaik! 🌟"

**Mobile (≤700px)**: bottom nav 5 items (Utama/Nota/Exam/Games/Profil), sidebar off-canvas drawer (-218px, hamburger opens), mini top bar, no horizontal overflow at 390px. Stats strip = 3-col grid; dash rows stack full-width; `.shell-content` needs ~90px bottom padding for the nav.

## 6. Key mechanics to preserve

- **QuizRunner** (used by Exam + notes quizzes): session UI (timer-wrap "Masa Berbaki", mode badge, progress "Kemajuan N/M · X Betul", q-card with full-width options, Sebelumnya ghost + Seterusnya violet), result screen (big %, verdict tiers, 4-stat row Betul/Salah/Markah/Masa), review tab ("Ulangkaji Jawapan" list with badges + Anda/Betul chips + explanation). **`submit()` must NOT call `onFinish`** (that unmounts the runner and discards the result — fixed in round 12; the result screen's own back button calls it).
- **Arcade**: 6 games, counts quick 10 / myth 8 / sprint 20 / blitz 20 / boss 15 / survival 8; myth = FAKTA/MITOS buttons; sprint = "SPRINT TRACK 0/20"; boss has ⭐ score + 👾 boss 100 HP + ⚔️ player 100 HP bars; games draw from the full 880-question bank; end screen = animated % ring + stars + tiers + XP Diraih + Keputusan/Semak Jawapan tabs.
- **Flashcards**: single-card carousel (520×230, Soalan/Jawapan faces, flip on click, ← Sebelum / Seterusnya →, X/Y counter).
- **Translation `t` is a FUNCTION** (`t('key')`) — never `t.key` (classic bug; sidebar labels vanished once).
- Mock auth: any credentials work; XP/level/streak are static demo values.

## 7. Working workflow (the refinement loop)

1. **Measure** the live site (CDP on headless Chrome, port 9333 — helper: `C:\Users\Administrator\AppData\Local\Temp\cdp-help.js`; login: MuhdAdi/tZHOpq, see §8) or pixel-sample screenshots with PIL.
2. **Write `REFINE.md`** (or REFINE-N.md) with exact measured values (colors, sizes, text). Keep one concern per round; include a Verification section.
3. **Execute code changes through a harness CLI** — this user's standing rule: code writes/modifies go through `opencode run '<prompt>' -f REFINE.md` (default model `deepseek/deepseek-chat`, config at `C:\Users\Administrator\.config\opencode\opencode.json`). With other harnesses, use that harness's CLI the same way (spec-first, file-backed).
4. **Verify independently** — NEVER trust the agent's self-report: `npm run build`, then browser/CDP checks (computed styles, DOM structure, console errors), pixel sampling where colors matter. Fix regressions found.
5. **Commit locally**; **push to GitHub ONLY when the user explicitly asks** (standing rule).

15 refinement rounds completed this way (shell → tokens → content → arcade → mobile → landing → colors/auroras → buttons → quiz session → result → review → arcade results → flashcards/boss/PWA).

## 8. Credentials & access (do not leak into commits)

- **pdgthub.com** (reference site, read-only): username `MuhdAdi`, password `tZHOpq` — **case-sensitive** (`tzHOpq` is rejected). Sessions expire; re-login via CDP when a page dumps empty (`bodyLen` ≈ 145 or redirect to /login).
- **App accounts** (SQLite, seeded): admin `admin` / `admin123` (role admin → `/admin.html`), demo user `demo` / `demo123`. New users are created by the admin via the panel (paid-user model).
- **GitHub**: repo `engkufizz/OnlineStudy_Platform`. Fine-grained `GITHUB_TOKEN` lives in `C:\Users\Administrator\AppData\Local\hermes\profiles\coder\.env` (93-char PAT). Git credential store configured (helper scoped to github.com + `credential.interactive never`) — plain `git push` works non-interactively. **Never put the token in URLs/output.**

## 9. Reusable tooling (in `%LOCALAPPDATA%\Temp\`)

- `cdp-help.js` — CDP helper for headless Chrome at `http://127.0.0.1:9333` (`withPage`, `send`, `evaluate`). Launch headless browser: `chrome.exe --headless=new --remote-debugging-port=9333 --user-data-dir=C:\Users\Administrator\AppData\Local\Temp\pdgt-headless`
- `cdp-login2.js` — logs into pdgthub via CDP (use after session expiry)
- `cdp-*.js` — verification probes (styles, flows, captures); `pdgt-*.py` — PIL montages, block-diffs, pixel sampling
- **Moondream vision** (Ollama, local): `POST http://127.0.0.1:11434/api/generate` with `{"model":"moondream","images":[b64]}` — use to "see" screenshots when no vision model is configured. It's coarse; combine with DOM/pixel measurements.
- Reference captures: `%LOCALAPPDATA%\Temp\pdgt-ref2\` (real site screenshots + style fingerprints per page); montages in `D:\Tengku\OnlineStudy_Platform\docs\compare\` (incl. `final\` — the full 9-page set).

## 10. Commands

```bash
# backend (SQLite) — run FIRST in dev
cd /d/Tengku/OnlineStudy_Platform/backend
node seed.js                    # rebuild data.db from src/data/real (idempotent)
node server.js                  # API on :4000

# dev (bind all interfaces for phone testing)
cd /d/Tengku/OnlineStudy_Platform
"/c/Program Files/nodejs/node.exe" node_modules/vite/bin/vite.js --host 0.0.0.0 --port 5173
# or: npx vite --host 0.0.0.0 --port 5173

npm run build        # prod build (Express serves dist/ in production)
git add -A && git commit -m "..."   # commit locally — fine
git push             # ONLY when the user asks
```

## 11. Known remaining gaps (honest status)

- **Live data**: the original site's leaderboard/XP are live (Firebase); the clone's are its own SQLite data — a fresh app with its own users, by design now.
- **Production hardening**: session store is MemoryStore (swap to a persistent store + HTTPS cookie settings before real deployment); default admin password `admin123` must change; content admin UI is functional but not mobile-optimized.
- **Animation easing** curves / transition timings are approximated, not measured.
- Real site occasionally changes (content updates, notices) — a future pass may need re-capture of §4 data (then re-run `node seed.js`).

## 12. Pitfalls learned (avoid repeating)

- PATH `node` is 10.9.2 — always use `C:\Program Files\nodejs\node.exe` for Vite/builds.
- opcode default model needs `deepseek/deepseek-chat` (Ollama qwen default requires paid sub) — config already set in `~/.config/opencode/opencode.json`.
- Harness agents often stall trying to self-verify in-browser (no browser/permissions; they also can't write to their `/tmp` sandbox on this Windows box). Let them build; **you verify** with CDP + curl (cookie jars in YOUR writable temp, not /tmp).
- Git Bash `taskkill //PID` breaks (slash translation) — use PowerShell `Stop-Process`.
- Do not push unless asked (the user has corrected this before).
- The live site's notes topic route is hash-based (`notes-hpgd1203.html#t1`), not `/t1` paths.
- `.aurora` must stay OUTSIDE the raised content container (body-level sibling, z-index 0; content z ≥ 1/10) or it paints over the page.
- Express production serving: after `npm run build`, restart `node server.js` so it serves the new `dist/`.
