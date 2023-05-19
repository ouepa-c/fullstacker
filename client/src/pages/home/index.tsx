import React, { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { increment } from 'pages/home/store'

export interface HomeProps {
  children?: ReactNode
}

const Home: React.FC<HomeProps> = React.memo((props) => {
  const counter = useAppSelector(state => state.home.counter)
  const dispatch = useAppDispatch()
  const incre = () => {
    dispatch(increment(5))
  }
  return <>
    <h1>Home</h1>
    <p>{counter}</p>
    <button onClick={incre}>increment</button>
  </>
})
Home.displayName = 'Home'

export default Home
