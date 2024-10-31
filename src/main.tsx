import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Notifications } from '@mantine/notifications'
import { MantineProvider } from '@mantine/core'
import App from './app'
import { registerGlobal } from './lib'

import theme from './theme'

import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

import './globals.css'

registerGlobal()

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
      <Notifications autoClose={2000} position="top-center" />
    </MantineProvider>
  </StrictMode>
)
