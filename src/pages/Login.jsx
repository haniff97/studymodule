import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { LangToggle } from '../components/LangToggle.jsx'
import './auth.css'

export default function Login() {
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { lang } = useLang()
  const isEn = lang === 'en'
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.classList.add('theme-violet')
    try {
      const sp = new URLSearchParams(window.location.search)
      if (sp.get('registered') === '1') {
        setInfo(isEn ? 'Account created successfully! Please log in.' : 'Akaun anda telah berjaya didaftarkan! Sila log masuk.')
      }
    } catch {}
    return () => document.body.classList.remove('theme-violet')
  }, [isEn])

  const submit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError(isEn ? 'Username and password are required.' : 'Nama pengguna dan kata laluan diperlukan.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await login(username.trim(), password)
      if (data.role === 'admin') navigate('/admin.html')
      else navigate('/home')
    } catch {
      setError(isEn ? 'Invalid username or password.' : 'Nama pengguna atau kata laluan tidak sah.')
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
        {/* Modern Portal Header */}
        <div className="auth-window-topbar">

          <div className="auth-tb-actions">
            <LangToggle />
            <button
              className="btn-icon theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={isDark ? (isEn ? 'Switch to light mode' : 'Tukar ke mod cerah') : (isEn ? 'Switch to dark mode' : 'Tukar ke mod gelap')}
            >
              <i className="material-symbols-rounded">{isDark ? 'dark_mode' : 'light_mode'}</i>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="auth-card">
          <div className="auth-neon-logo">
            <i className="material-symbols-rounded">school</i>
          </div>
          <h2 className="auth-brand-title">SmartBrain DPLI</h2>


          <form className="auth-form" onSubmit={submit}>
            {info && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34d399',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <i className="material-symbols-rounded" style={{ fontSize: 18 }}>check_circle</i>
                <span>{info}</span>
              </div>
            )}
            {error && <div className="auth-error">{error}</div>}
            
            <div className="auth-form-group">
              <label>{isEn ? 'Username' : 'Nama Pengguna'}</label>
              <div className="field">
                <i className="material-symbols-rounded">person</i>
                <input
                  name="username"
                  placeholder={isEn ? 'username' : 'nama.pengguna'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label>{isEn ? 'Password' : 'Kata Laluan'}</label>
              <div className="field">
                <i className="material-symbols-rounded">lock</i>
                <input
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="field-eye" onClick={() => setShowPw((s) => !s)}>
                  <i className="material-symbols-rounded">{showPw ? 'visibility_off' : 'visibility'}</i>
                </button>
              </div>
            </div>

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading
                ? (isEn ? 'Logging in...' : 'Sedang log masuk...')
                : (<>{isEn ? 'Log In' : 'Log Masuk'} <i className="material-symbols-rounded">arrow_forward</i></>)}
            </button>
          </form>


          <div className="auth-divider"><span>{isEn ? 'OR' : 'ATAU'}</span></div>

          <Link to="/signup.html" className="auth-reg-box">
            {isEn ? "Don't have an account? " : 'Belum ada akaun? '}
            <strong>{isEn ? 'Register now' : 'Daftar sekarang'}</strong>
          </Link>

          <div className="auth-sublinks">
            <Link to="/" className="as-back">
              <i className="material-symbols-rounded">arrow_back</i> {isEn ? 'Back to homepage' : 'Kembali ke laman utama'}
            </Link>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="auth-footer-bar">
          <div className="af-left">
            <i className="material-symbols-rounded" style={{ fontSize: 15, color: '#34d399' }}>verified_user</i>
            <span>{isEn ? 'Secured Access' : 'Akses Terkawal'}</span>
          </div>
          <Link to="/admin-login.html" className="af-right">{isEn ? 'Admin Portal' : 'Portal Admin'}</Link>
        </div>
      </div>
    </div>
  )
}

