import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Gates account-only pages. Redirects to /login when there is no session.
export function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="shell-viewport">
        <div className="shell-loading-shell">
          <i className="material-symbols-rounded pulsing-icon">school</i>
          <span>Memuatkan...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
