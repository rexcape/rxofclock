import { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'lowPerformanceMode'

export const useLowPerformanceMode = () => {
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false)
  const toggle = () => setLowPerformanceMode((val) => !val)

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) setLowPerformanceMode(true)
  }, [])

  useEffect(() => {
    if (lowPerformanceMode) localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
    else localStorage.removeItem(LOCAL_STORAGE_KEY)
  }, [lowPerformanceMode])

  return { lowPerformanceMode, setLowPerformanceMode, toggle }
}
