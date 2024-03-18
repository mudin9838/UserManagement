import { useState, useEffect } from 'react'

export function useTheme () {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(
      localStorage.getItem('currentMode')
        ? localStorage.getItem('currentMode')
        : ''
    )
  }, [theme])

  return theme
}
