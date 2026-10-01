import { Link } from 'react-router-dom'

export function TopicCard({ topic, to, color }) {
  return (
    <Link className="topic-card-box" to={to} style={{ backgroundColor: color || 'var(--card)' }}>
      <div className="tc-top-row">
        <span className="tc-topic-label" style={{ color: color ? '#1e2227' : 'var(--muted)', opacity: color ? 0.7 : 1 }}>Topik {topic.id.replace('t', '')}</span>
        <span className="material-symbols-rounded tc-arrow" style={{ color: color ? '#1e2227' : 'var(--muted)' }}>arrow_forward</span>
      </div>
      <div className="tc-mid-row">
        <span className="tc-emoji">{topic.emoji}</span>
        <span className="tc-title" style={{ color: color ? '#1e2227' : 'var(--text)' }}>{topic.title}</span>
      </div>
      <div className="tc-keywords" style={{ color: color ? '#1e2227' : 'var(--muted)', opacity: color ? 0.8 : 1 }}>{topic.keywords}</div>
    </Link>
  )
}

