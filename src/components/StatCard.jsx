export function StatCard({ icon, value, label, sub, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className="material-symbols-rounded">{icon}</i>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
      {accent && <div className="stat-accent">{accent}</div>}
    </div>
  )
}
