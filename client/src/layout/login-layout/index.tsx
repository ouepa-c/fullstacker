import React, { type ReactNode } from 'react'
import { LoginLayoutWrapper } from '@/layout/login-layout/style'

export interface LoginLayoutProps {
  children?: ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = (props) => {
  const {children} = props

  return <LoginLayoutWrapper>
    {children}
  </LoginLayoutWrapper>
}

export default LoginLayout
