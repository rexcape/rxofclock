import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import { LowPerformanceMode } from './contexts'
import { registerGlobal } from './lib'

import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/index.css'
import { useLowPerformanceMode } from './hooks'

import 'ldrs/ring'

const WrappedApp = () => {
  const { lowPerformanceMode, toggle } = useLowPerformanceMode()
  return (
    <LowPerformanceMode.Provider
      value={{
        active: lowPerformanceMode,
        toggle,
      }}
    >
      <App />
    </LowPerformanceMode.Provider>
  )
}

registerGlobal()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrappedApp />
    <ToastContainer position="top-center" autoClose={2000} />
  </React.StrictMode>
)
