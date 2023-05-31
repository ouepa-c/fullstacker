import React, { type ReactNode, useEffect, useState } from 'react'
import { NavBarWrapper } from 'components/nav-bar/style'
import _ from 'classnames'
import Logo from 'components/logo'
import NavBarRt from 'components/nav-bar/components/nav-bar-rt'
import NavCenter from 'components/nav-bar/components/nav-center'

export interface NavBarProps {
  children?: ReactNode
}

const NavBar: React.FC<NavBarProps> = React.memo((props) => {
  const [hide, setHide] = useState(false)
  const [isTop, setIsTop] = useState(window.scrollY === 0)


  useEffect(() => {
    function handler(evt: WheelEvent) {
      const flag = evt.deltaY >= 0
      if (window.scrollY <= 60) return
      setHide(flag)
    }

    window.addEventListener('wheel', handler)
    return () => {
      window.removeEventListener('wheel', handler)
    }
  }, [])

  useEffect(() => {
    function handler() {
      const flag = window.scrollY === 0
      setIsTop(flag)
    }

    window.addEventListener('scroll', handler)
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  return <NavBarWrapper className={_({hide: hide, showblur: !isTop})}>
    <div className="nav-bar-container wrapper">
      <Logo/>
      <NavCenter/>
      <NavBarRt/>
    </div>
  </NavBarWrapper>
})

NavBar.displayName = 'NavBar'

export default NavBar
