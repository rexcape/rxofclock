import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import { LowPerformanceMode } from './contexts'

import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/index.css'

const WrappedApp = () => {
  const [lowPerformanceMode, setLowPerformanceMode] = React.useState(false)
  return (
    <LowPerformanceMode.Provider
      value={{
        active: lowPerformanceMode,
        toggle: () => setLowPerformanceMode((val) => !val),
      }}
    >
      <App />
    </LowPerformanceMode.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WrappedApp />
    <ToastContainer />
  </React.StrictMode>
)
