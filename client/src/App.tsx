import React, { type ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/router'

export interface AppProps {
    children?: ReactNode
}

const App: React.FC<AppProps> = (props) => {

    return <>
        <main>
            {useRoutes(routes)}
        </main>
    </>
}

export default App
