import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pdgt_theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('pdgt_theme', theme)
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      document.body.classList.remove('theme-dark')
      document.body.classList.add('theme-light')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
