export function XPToast({ visible, xp = 0 }) {
  if (!visible) return null
  return (
    <div className="xp-toast">
      <i className="material-symbols-rounded">bolt</i>
      +{xp} XP · Kemajuan dikemas kini
    </div>
  )
}
