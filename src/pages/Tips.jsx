import { useEffect, useState } from 'react'
import { AppShell } from '../components/AppShell.jsx'
import { useLang } from '../context/LangContext.jsx'
import { getRandomTipSubset, getRandomTip } from '../data/program.js'
import { apiTips } from '../lib/api.js'
import './app.css'
import './tips.css'

export default function Tips() {
  const { lang, t } = useLang()
  const [tips, setTips] = useState(() => getRandomTipSubset(6))
  const [tipOfDay, setTipOfDay] = useState(() => getRandomTip())

  useEffect(() => {
    document.body.classList.add('theme-tips')
    return () => document.body.classList.remove('theme-tips')
  }, [])

  useEffect(() => {
    let cancelled = false
    apiTips()
      .then((rows) => {
        if (cancelled) return
        const mapped = rows.map((r) => ({
          id: r.id,
          ms: { title: r.titleMs, message: r.bodyMs },
          en: { title: r.titleEn, message: r.bodyEn },
        }))
        if (mapped.length) {
          const shuffled = mapped.slice().sort(() => Math.random() - 0.5)
          setTips(shuffled.slice(0, 6))
          setTipOfDay(mapped[Math.floor(Math.random() * mapped.length)])
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const shuffle = () => {
    const chosen = tips.slice().sort(() => Math.random() - 0.5)
    setTips(chosen)
    setTipOfDay(chosen[Math.floor(Math.random() * chosen.length)] || getRandomTip())
  }

  const tod = tipOfDay ? (tipOfDay[lang] || tipOfDay.ms) : null

  return (
    <AppShell
      icon="lightbulb"
      title="Tip"
      subBadge="Strategi & Panduan"
      theme="theme-tips"
      aurora="violet"
    >
      {/* Top Hero Banner */}
      <div className="hero-card hero-tips">
        <div className="hero-card-body">
          <div className="hero-status-pill">
            <span className="pulse-dot" />
            <span>PANDUAN &amp; STRATEGI PEPERIKSAAN</span>
          </div>
          <h2>Sedikit dorongan untuk hari ini ✨</h2>
          <p>
            Strategi bijak untuk menguasai soalan peperiksaan MCQ, mengenal pasti kata kunci perangkap, dan teknik menyingkir jawapan salah.
          </p>
          <div className="hero-chips-row">
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">psychology</i> 30 Koleksi Tip
            </span>
            <span className="hero-badge-chip">
              <i className="material-symbols-rounded">school</i> Format MCQ
            </span>
          </div>
          <button className="hero-white-btn" onClick={shuffle} type="button">
            <i className="material-symbols-rounded">refresh</i> {t('refreshTips')}
          </button>
        </div>
      </div>

      {/* Tip of the Day Featured Card */}
      {tod && (
        <div className="tip-featured-card">
          <div className="tfc-badge">
            <i className="material-symbols-rounded">star</i>
            <span>TIP PILIHAN HARI INI</span>
          </div>
          <div className="tfc-body">
            <div className="tfc-icon-wrap">
              <i className="material-symbols-rounded">lightbulb</i>
            </div>
            <div className="tfc-content">
              <h3 className="tfc-title">{tod.title}</h3>
              <p className="tfc-message">{tod.message}</p>
              {tod.action && (
                <div className="tfc-action">
                  <i className="material-symbols-rounded">tips_and_updates</i>
                  <span><strong>Tindakan:</strong> {tod.action}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6 Tips Section */}
      <section className="tips-section">
        <div className="section-head">
          <h3 className="uppercase">6 Tip Peperiksaan</h3>
          <button className="link-link tips-shuffle-link" onClick={shuffle} type="button">
            Kocok Semula <i className="material-symbols-rounded">autorenew</i>
          </button>
        </div>

        <div className="tips-grid">
          {tips.map((tip, idx) => {
            const t = tip[lang] || tip.ms
            return (
              <div className="tip-card-styled" key={tip.id || idx}>
                <div className="tc-header">
                  <div className="tc-icon-wrap">
                    <i className="material-symbols-rounded">lightbulb</i>
                  </div>
                  <span className="tc-idx">#{idx + 1}</span>
                </div>
                <h4 className="tc-card-title">{t.title}</h4>
                <p className="tc-card-message">{t.message}</p>
                {t.action && (
                  <div className="tc-action-tip">
                    <i className="material-symbols-rounded">bolt</i>
                    <span>{t.action}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </AppShell>
  )
}

