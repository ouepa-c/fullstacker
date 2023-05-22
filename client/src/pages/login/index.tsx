import React, { type ReactNode } from 'react'
import useClientWidth from '@/hooks/useClientWidth'

export interface LoginProps {
  children?: ReactNode
}

const Login: React.FC<LoginProps> = (props) => {
  const clientW = useClientWidth()

  return <>
    <h1>Login</h1>
    <p>{clientW}</p>
  </>
}

export default Login
