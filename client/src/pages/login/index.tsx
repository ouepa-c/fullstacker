import React, { type ReactNode, useCallback } from 'react'
import { LoginContainer, LoginWrapper } from 'pages/login/style'
import LoginForm from 'pages/login/components/login-form'
import RegisterForm from 'pages/login/components/register-form'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { changeIsLoading, changeIsLogin, fetchUserProfile } from 'pages/profile/store'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import _ from 'classnames'

export interface LoginProps {
  children?: ReactNode
}

const Login: React.FC<LoginProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {isLogin, isLoading} = useAppSelector(({profile}) => ({
    isLogin: profile.isLogin,
    isLoading: profile.isLoading
  }), shallowEqual)

  const changeStatus = useCallback(() => {
    dispatch(changeIsLogin(!isLogin))
  }, [isLogin])

  const submit = async (formInfo: LoginInfo | RegisterInfo) => {
    dispatch(changeIsLoading(true))
    await dispatch(fetchUserProfile({
      isLogin,
      info: formInfo
    }))
    return navigate({
      pathname: '/'
    })
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <div className={_('login-wrapper', isLogin ? 'trans' : '')}>
          <LoginForm
            isLogin={isLogin}
            isLoading={isLoading}
            submit={submit}
            changeStatus={changeStatus}
          />
          <RegisterForm
            isLogin={isLogin}
            isLoading={isLoading}
            submit={submit}
            changeStatus={changeStatus}
          />
        </div>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Login
