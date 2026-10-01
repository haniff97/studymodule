import { useCallback, useEffect, useState } from 'react'

// Single-card flashcard carousel mirroring the real notes page: one card at a
// time with Soalan/Jawapan faces, flip on click, and Sebelum/Seterusnya controls.
export function FlashcardCarousel({ items }) {
  const cards = items.map((fc) => ({ front: fc.q ?? fc.front, back: fc.a ?? fc.back }))
  const total = cards.length
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [shake, setShake] = useState(false)

  const current = cards[idx] || { front: '', back: '' }

  const go = useCallback((dir) => {
    setFlipped(false)
    setIdx((i) => {
      const next = i + dir
      if (next < 0 || next >= total) {
        if (total > 1) {
          setShake(true)
          setTimeout(() => setShake(false), 280)
        }
        return i
      }
      return next
    })
  }, [total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  if (total === 0) return null

  return (
    <div className="fc-carousel">
      <div className={`fc-stage ${shake ? 'shake' : ''}`}>
        <div
          className={`flashcard fc-card ${flipped ? 'flipped' : ''}`}
          onClick={() => setFlipped((f) => !f)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-face fc-front">
              <span className="fc-label">Soalan</span>
              <span className="fc-text">{current.front}</span>
            </div>
            <div className="flashcard-face fc-back">
              <span className="fc-label">Jawapan</span>
              <span className="fc-text">{current.back}</span>
            </div>
          </div>
        </div>
        <span className="fc-counter">{idx + 1} / {total}</span>
      </div>

      <div className="fc-controls">
        <button className="fc-btn" onClick={() => go(-1)}>← Sebelum</button>
        <button className="fc-btn" onClick={() => go(1)}>Seterusnya →</button>
      </div>
    </div>
  )
}
