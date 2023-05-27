import React, { type ReactNode, useCallback } from 'react'
import { LoginContainer, LoginWrapper } from 'pages/login/style'
import LoginForm, { LoginInfo } from 'pages/login/components/login-form'
import RegisterForm, { RegisterInfo } from 'pages/login/components/register-form'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { changeIsLogin } from 'pages/profile/store'

export interface LoginProps {
  children?: ReactNode
}

const Login: React.FC<LoginProps> = (props) => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(({profile}) => profile.isLogin)

  const changeStatus = useCallback(() => {
    dispatch(changeIsLogin(!isLogin))
  }, [isLogin])

  const submit = (formInfo: LoginInfo | RegisterInfo) => {
    console.log(formInfo)
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginForm
          isLogin={isLogin} submit={submit}
          changeStatus={changeStatus}
        />
        <RegisterForm
          isLogin={isLogin} submit={submit}
          changeStatus={changeStatus}
        />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Login
