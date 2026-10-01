import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { LangToggle } from '../components/LangToggle.jsx'
import './auth.css'

export default function AdminLogin() {
  const { isDark, toggleTheme } = useTheme()
  const { lang } = useLang()
  const isEn = lang === 'en'
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return
    setError('')
    setLoading(true)
    try {
      const u = await login(username.trim(), password.trim())
      if (u.role === 'admin') {
        navigate('/admin.html')
      } else {
        setError(isEn ? 'Access denied: Admin privileges required.' : 'Akses ditolak: Memerlukan kelayakan pentadbir.')
      }
    } catch (err) {
      setError(err.message || (isEn ? 'Login failed' : 'Log masuk gagal'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="aurora" aria-hidden="true">
        <div className="aurora-band b1" />
        <div className="aurora-band b2" />
        <div className="aurora-band b3" />
      </div>

      <div className="auth-window">
        <div className="auth-window-topbar">
          <div className="auth-platform-tag">
            <i className="material-symbols-rounded">admin_panel_settings</i>
            <span>SmartBrain DPLI · Portal Admin</span>
          </div>
          <div className="auth-tb-actions">
            <LangToggle />
            <button
              className="btn-icon theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={isDark ? 'Tukar ke mod cerah' : 'Tukar ke mod gelap'}
            >
              <i className="material-symbols-rounded">{isDark ? 'dark_mode' : 'light_mode'}</i>
            </button>
          </div>
        </div>


        <div className="auth-card">
          <div className="auth-neon-logo">
            <i className="material-symbols-rounded">admin_panel_settings</i>
          </div>
          <h2 className="auth-brand-title">Portal Admin</h2>
          <div className="auth-tagline">Kawalan Akses Pentadbir</div>

          <div className="auth-heading-wrap">
            <h3>{isEn ? 'Administrator Login' : 'Log Masuk Pentadbir'}</h3>
            <p>{isEn ? 'Enter your admin credentials for full portal management access.' : 'Sila masukkan kelayakan pentadbir anda untuk akses penuh pengurusan.'}</p>
          </div>

          {error && (
            <div style={{ color: 'var(--danger)', background: 'rgba(255, 95, 87, 0.1)', border: '1px solid rgba(255, 95, 87, 0.25)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={submit}>
            <div className="auth-form-group">
              <label>{isEn ? 'Admin Username' : 'Nama Pengguna Admin'}</label>
              <div className="field">
                <i className="material-symbols-rounded">person</i>
                <input
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label>{isEn ? 'Password' : 'Kata Laluan'}</label>
              <div className="field">
                <i className="material-symbols-rounded">lock</i>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="field-eye" onClick={() => setShowPw((s) => !s)}>
                  <i className="material-symbols-rounded">{showPw ? 'visibility_off' : 'visibility'}</i>
                </button>
              </div>
            </div>

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              <i className="material-symbols-rounded">verified_user</i>
              {loading ? (isEn ? 'Verifying...' : 'Mengesahkan...') : (isEn ? 'Sign In as Admin' : 'Log Masuk Pentadbir')}
            </button>
          </form>

          <div className="auth-sublinks">
            <Link to="/login" className="as-back">
              <i className="material-symbols-rounded">arrow_back</i> {isEn ? 'Back to Student Login' : 'Kembali ke Log Masuk Pelajar'}
            </Link>
          </div>
        </div>

        <div className="auth-footer-bar">
          <div className="af-left">
            <i className="material-symbols-rounded" style={{ fontSize: 15, color: '#34d399' }}>security</i>
            <span>Sistem Pentadbiran Selamat</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>v2.5.0</span>
        </div>
      </div>
    </div>
  )
}

