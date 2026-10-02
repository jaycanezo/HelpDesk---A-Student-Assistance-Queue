import { useTheme } from '../context/ThemeContext.jsx'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">H</span>
        <span>Student Help Desk</span>
      </div>
      <button
        className="theme-toggle"
        type="button"
        aria-pressed={theme === 'dark'}
        onClick={toggleTheme}
      >
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </header>
  )
}