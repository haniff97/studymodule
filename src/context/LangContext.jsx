import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../data/translations.js'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const url = new URLSearchParams(window.location.search).get('lang')
    if (url === 'ms' || url === 'en') return url
    return localStorage.getItem('pdgt_lang') || 'ms'
  })

  useEffect(() => {
    localStorage.setItem('pdgt_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = (key) => translations[lang]?.[key] ?? translations.ms[key] ?? key

  const value = { lang, setLang, t }
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
