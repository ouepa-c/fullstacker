import React, { ChangeEvent, type ReactNode, useRef, useState } from 'react'
import _ from 'classnames'
import { Button, FormElement, Input, Tooltip } from '@nextui-org/react'
import { LoginInfo } from 'pages/login/components/login-form'
import ArrowDown from 'assets/svg/arrow-down'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

export interface RegisterFormProps {
  children?: ReactNode
  isLogin: boolean
  changeStatus: () => void
  submit: (formInfo: LoginInfo | RegisterInfo) => void
}

export interface RegisterInfo {
  nickname: string
  username: string
  password: string
  re_password: string
  github: string
  email: string
  phone: string
}

const RegisterForm: React.FC<RegisterFormProps> = React.memo((props) => {
  const {isLogin, changeStatus, submit} = props
  const [showArrow, setShowArrow] = useState(true)

  const contentRef = useRef<HTMLDivElement>(null)

  const observeBox = useIntersectionObserver(
    (isIntersecting) => {
      setShowArrow(!isIntersecting)
    }, {root: contentRef.current}
  )

  const [formInfo, setFormInfo] = useState<RegisterInfo>({
    nickname: '',
    username: '',
    password: '',
    re_password: '',
    github: '',
    email: '',
    phone: ''
  })

  const handleFieldChange = (field: keyof RegisterInfo) =>
    (e: ChangeEvent<FormElement>) => {
      setFormInfo(prev => ({
        ...prev,
        [field]: e.target.value
      }))
    }

  const handleRegister = () => {
    submit(formInfo)
  }

  return (
    <div className={_('register-bar', isLogin ? 'hide' : 'show')}>
      <h2 className="title">
        SIGN UP
      </h2>
      <div className="content" ref={contentRef}>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="nickname"
            clearable labelLeft="Nickname*"
            placeholder="here's your nickname"
            value={formInfo.nickname}
            onChange={handleFieldChange('nickname')}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="account"
            clearable labelLeft="Account*"
            placeholder="hey there!"
            value={formInfo.username}
            onChange={handleFieldChange('username')}
          />
        </div>
        <div className="form-item">
          <Input.Password
            width={'280px'} aria-label="password"
            labelLeft="Password*"
            placeholder="password here"
            value={formInfo.password}
            onChange={handleFieldChange('password')}
          />
        </div>
        <div className="form-item">
          <Input.Password
            width={'280px'} aria-label="confirm password"
            labelLeft="Confirm*"
            placeholder="confirm password"
            value={formInfo.re_password}
            onChange={handleFieldChange('re_password')}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="email"
            clearable labelLeft="Email"
            placeholder="your email"
            value={formInfo.email}
            onChange={handleFieldChange('email')}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="github"
            clearable labelLeft="Github"
            placeholder="your github"
            value={formInfo.github}
            onChange={handleFieldChange('github')}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="phone"
            clearable labelLeft="Phone"
            placeholder="your phone"
            value={formInfo.phone}
            onChange={handleFieldChange('phone')}
          />
        </div>
        <div ref={observeBox} style={{minHeight: '4px', width: '100%'}}/>
      </div>
      <div className="arrow-down clearfix">
        {showArrow
          ? <ArrowDown/>
          : '到底啦'
        }
      </div>
      <div className="foot-ctr">
        <Button
          color="gradient"
          shadow rounded size="lg"
          onPress={handleRegister}
        >
          Sign Up!
        </Button>
        <Tooltip content="已有账号?去登陆" color="invert" placement="right">
          <Button
            light rounded
            onPress={changeStatus}
            style={{marginTop: '6px', textDecoration: 'underline'}}
            size="lg" auto>
            I have an account,login now!
          </Button>
        </Tooltip>
      </div>
    </div>
  )
})

RegisterForm.displayName = 'RegisterForm'

export default RegisterForm
