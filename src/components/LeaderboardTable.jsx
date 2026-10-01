export function LeaderboardTable({ data = [], full = false }) {
  const rows = full ? data : data.slice(0, 5)
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
  return (
    <div className="leaderboard-table">
      <div className="ldr-head">
        <span className="ldr-col-rank">#</span>
        <span className="ldr-col-name">NAMA</span>
        <span className="ldr-col-badge">PANGKAT</span>
        <span className="ldr-col-streak">STREAK</span>
        <span className="ldr-col-xp">XP</span>
      </div>
      {rows.map((row) => (
        <div className="ldr-row" key={row.rank}>
          <div className="ldr-rank ldr-col-rank">
            {medals[row.rank] ? (
              <span className="ldr-medal">{medals[row.rank]}</span>
            ) : (
              <span className="ldr-num">{row.rank}</span>
            )}
          </div>
          <div className="ldr-user-cell ldr-col-name">
            <span className="ldr-name">{row.name}</span>
            <div className="ldr-mobile-sub">
              <span className="ldr-mobile-badge">{row.badge}</span>
              {row.chip && <span className="ldr-chip">{row.chip}</span>}
            </div>
          </div>
          <span className="ldr-badge ldr-col-badge">{row.badge}</span>
          <div className="ldr-streak ldr-col-streak">
            <span>🔥 {row.streak}</span>
            {row.chip && <span className="ldr-chip ldr-desktop-chip">{row.chip}</span>}
          </div>
          <div className="ldr-xp ldr-col-xp">
            <strong>{row.xp.toLocaleString()}</strong>
            <i className="material-symbols-rounded">bolt</i>
          </div>
        </div>
      ))}
    </div>
  )
}

