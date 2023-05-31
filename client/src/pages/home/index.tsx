import React, { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { increment } from 'pages/home/store'
import { HomeWrapper } from 'pages/home/style'
import NavBar from 'components/nav-bar'
import { changeTheme } from 'pages/profile/store'

export interface HomeProps {
  children?: ReactNode
}

const Home: React.FC<HomeProps> = React.memo((props) => {
  const counter = useAppSelector(state => state.home.counter)
  const dispatch = useAppDispatch()
  const incre = () => {
    dispatch(increment(5))
  }
  return <HomeWrapper>
    <NavBar/>
    <h1>Home</h1>
    <p>{counter}</p>
    <button onClick={incre}>increment</button>
    <button onClick={() => {
      dispatch(changeTheme())
    }}>theme
    </button>
  </HomeWrapper>
})

Home.displayName = 'Home'

export default Home
