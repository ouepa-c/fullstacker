import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import 'reset-css'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from '@/style/global'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'styled-components'
import theme from 'assets/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback="">
          <GlobalStyle/>
          <NextUIProvider>
            <ThemeProvider theme={theme}>
              <App/>
            </ThemeProvider>
          </NextUIProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
