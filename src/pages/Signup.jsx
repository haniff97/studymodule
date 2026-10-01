import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { LangToggle } from '../components/LangToggle.jsx'
import './auth.css'

export default function Signup() {
  const { register } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { lang } = useLang()
  const isEn = lang === 'en'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError(isEn ? 'Username and password are required.' : 'Nama pengguna dan kata laluan diperlukan.')
      return
    }
    if (username.trim().length < 3) {
      setError(isEn ? 'Username must be at least 3 characters.' : 'Nama pengguna mestilah sekurang-kurangnya 3 aksara.')
      return
    }
    if (password.length < 4) {
      setError(isEn ? 'Password must be at least 4 characters.' : 'Kata laluan mestilah sekurang-kurangnya 4 aksara.')
      return
    }

    setError('')
    setLoading(true)
    try {
      await register(username.trim(), password, email.trim())
      navigate('/home')
    } catch (err) {
      setError(err.message || (isEn ? 'Registration failed. Please try again.' : 'Pendaftaran gagal. Sila cuba lagi.'))
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
            <i className="material-symbols-rounded">school</i>
            <span>SmartBrain DPLI · OUM</span>
          </div>
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

        <div className="auth-card">
          <div className="auth-neon-logo">
            <i className="material-symbols-rounded">school</i>
          </div>
          <h2 className="auth-brand-title">SmartBrain DPLI</h2>
          <div className="auth-tagline">{isEn ? 'New Student Registration' : 'Daftar Akaun Baru'}</div>

          <div className="auth-heading-wrap">
            <h3>{isEn ? 'Unlock Full Access Today' : 'Buka akses penuh hari ini'}</h3>
            <p>
              {isEn
                ? 'Complete the details below to create your SmartBrain DPLI study account.'
                : 'Selesaikan butiran di bawah untuk membuka akaun SmartBrain DPLI anda.'}
            </p>
          </div>

          <form className="auth-form" onSubmit={submit}>
            {error && <div className="auth-error">{error}</div>}

            <div className="auth-form-group">
              <label>{isEn ? 'Username' : 'Nama Pengguna'}</label>
              <div className="field">
                <i className="material-symbols-rounded">person</i>
                <input
                  name="username"
                  placeholder={isEn ? 'Username' : 'Nama pengguna'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
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
                  autoComplete="new-password"
                  required
                />
                <button type="button" className="field-eye" onClick={() => setShowPw((s) => !s)}>
                  <i className="material-symbols-rounded">{showPw ? 'visibility_off' : 'visibility'}</i>
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label>{isEn ? 'Student Email (Optional)' : 'Emel Pelajar (Pilihan)'}</label>
              <div className="field">
                <i className="material-symbols-rounded">mail</i>
                <input
                  name="email"
                  type="email"
                  placeholder="nama@oum.edu.my"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading
                ? (isEn ? 'Creating account...' : 'Mendaftar akaun...')
                : (<>{isEn ? 'Register Now' : 'Daftar Sekarang'} <i className="material-symbols-rounded">arrow_forward</i></>)}
            </button>
          </form>

          <p className="auth-muted auth-gap" style={{ fontSize: 12, marginTop: 14 }}>
            {isEn
              ? 'One-time payment · Lifetime access · No monthly subscription.'
              : 'Bayar sekali · Akses kekal · Tiada langganan.'}
          </p>

          <div className="auth-sublinks">
            <Link to="/login" className="as-back">
              <i className="material-symbols-rounded">arrow_back</i> {isEn ? 'Back to Log In' : 'Kembali ke Log Masuk'}
            </Link>
          </div>
        </div>

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

