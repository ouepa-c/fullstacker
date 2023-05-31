import React, { type ReactNode, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/router'
import { useAppSelector } from '@/hooks/app'
import gradient1 from '@/assets/svg/bg.svg'
import gradient2 from '@/assets/svg/bg2.svg'

export interface AppProps {
  children?: ReactNode
}

const App: React.FC<AppProps> = (props) => {
  const isDarkTheme = useAppSelector(({profile}) => profile.isDarkTheme)

  useEffect(() => {
    document.documentElement.setAttribute('theme', isDarkTheme ? 'dark' : '')
  })

  const outlet = useRoutes(routes)

  return <>
    <main id="entry">
      {outlet}
    </main>
    <img className="bg-gradient g01" src={gradient1} alt=""/>
    <img className="bg-gradient g02" src={gradient2} alt=""/>
  </>
}

export default App
