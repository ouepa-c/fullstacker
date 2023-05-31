import React, { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export interface NavBarItemProps {
  children?: ReactNode
  sign: string
  to?: string
}

const NavBarItem: React.FC<NavBarItemProps> = React.memo((props) => {
  const {children, to = false, sign} = props

  return <>
    <li className="nav-item">
      {
        to
          ? <NavLink to={to}>
            {children}
          </NavLink>
          : children
      }
    </li>
  </>
})
NavBarItem.displayName = 'NavBarItem'

export default NavBarItem
