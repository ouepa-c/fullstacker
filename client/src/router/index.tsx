import { Navigate, RouteObject } from 'react-router-dom'
import React from 'react'

export const lazyload = (cpn: () => Promise<any>) => {
    const Cpn = React.lazy(cpn)
    return <Cpn/>
}

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/home"/>
    },
    {
        path: '/home',
        element: lazyload(() => import('pages/home'))
    }
]
