export function Modal({ open, title, children, onCancel, onConfirm, confirmText = 'Hantar', cancelText = 'Batal', tone = 'primary' }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`btn btn-${tone}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
