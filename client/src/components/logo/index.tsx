import React, { type ReactNode } from 'react'
import { LogoWrapper } from 'components/logo/style'
import { NavLink } from 'react-router-dom'

export interface LogoProps {
  children?: ReactNode
}

const Logo: React.FC<LogoProps> = (props) => {

  return <LogoWrapper>
    <NavLink to="/home">
      <span className="logo" title="洛克蓝">Rokerlon</span>
    </NavLink>
  </LogoWrapper>
}

export default Logo
