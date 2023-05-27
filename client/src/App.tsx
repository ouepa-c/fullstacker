import React, { type ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/router'

export interface AppProps {
  children?: ReactNode
}

const App: React.FC<AppProps> = (props) => {

  const outlet = useRoutes(routes)

  return <>
    {outlet}
  </>
}

export default App
