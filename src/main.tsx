import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { ToastContainer } from 'react-toastify'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
)
