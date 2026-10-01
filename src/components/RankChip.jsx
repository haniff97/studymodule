export function RankChip({ items = [] }) {
  if (!items.length) return null
  return (
    <div className="rank-chips">
      {items.map((item, i) => (
        <span key={i} className={`rank-chip ${item.hot ? 'hot' : ''}`}>
          <i className="material-symbols-rounded">{item.icon}</i>
          {item.label && <span>{item.label}</span>}
        </span>
      ))}
    </div>
  )
}
