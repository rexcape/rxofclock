import { createContext } from 'react'

export const LowPerformanceMode = createContext({
  active: false,
  toggle: () => {},
})
