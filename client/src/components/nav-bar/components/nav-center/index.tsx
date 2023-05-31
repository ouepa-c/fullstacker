import React, { type ReactNode } from 'react'
import NavBarItem from 'components/nav-bar-item'
import { NavCenterWrapper } from 'components/nav-bar/components/nav-center/style'

export interface NavCenterProps {
  children?: ReactNode
}

const NavCenter: React.FC<NavCenterProps> = React.memo((props) => {

  return <NavCenterWrapper>
    <ul className="section">
      <NavBarItem to="/home" sign="home">首页</NavBarItem>
      <NavBarItem to="/123" sign="orange">橘子</NavBarItem>
      <NavBarItem to="/5" sign="banana">香蕉榴莲</NavBarItem>
      <NavBarItem to="/ho232me" sign="apple">苹果</NavBarItem>
      <NavBarItem to="/hom2e" sign="pineapple">大菠萝</NavBarItem>
      <NavBarItem sign="ok">
      </NavBarItem>
    </ul>
  </NavCenterWrapper>
})

NavCenter.displayName = 'NavCenter'

export default NavCenter
