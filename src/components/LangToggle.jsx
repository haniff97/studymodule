import { useLang } from '../context/LangContext.jsx'

export function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`lang-toggle ${className}`}>
      <button
        type="button"
        className={lang === 'ms' ? 'active' : ''}
        onClick={() => setLang('ms')}
        aria-label="Bahasa Melayu"
      >
        BM
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}

