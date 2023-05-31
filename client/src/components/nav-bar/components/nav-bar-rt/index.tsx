import React, { type ReactNode } from 'react'
import { changeTheme } from 'pages/profile/store'
import { Avatar } from 'antd'
import avatar from 'assets/img/normal.jpg'
import { Heart } from 'components/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { NavBarRtWrapper } from 'components/nav-bar/components/nav-bar-rt/style'

export interface NavBarRtProps {
  children?: ReactNode
}

const NavBarRt: React.FC<NavBarRtProps> = (props) => {

  const isDarkTheme = useAppSelector(({profile}) => profile.isDarkTheme)
  const dispatch = useAppDispatch()
  return <NavBarRtWrapper>
    <div className="tools">

    </div>
    <span onClick={() => {
      dispatch(changeTheme())
    }} className="login-info" style={{cursor: 'pointer'}}>
       <span className="avatar" style={{
         transform: `translateX(${!isDarkTheme ? '40px' : '0px'})`
       }}>
            <Avatar size="default" shape="circle" src={avatar}/>
      </span>
        </span>
    <span className="other">
          <a className="heart" href="#!">
            <Heart/>
          </a>
    </span>
  </NavBarRtWrapper>
}

export default NavBarRt
