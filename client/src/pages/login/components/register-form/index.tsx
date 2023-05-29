import React, { type ReactNode, useEffect, useRef, useState } from 'react'
import { Button, Input, Loading } from '@nextui-org/react'
import ArrowDown from 'assets/svg/arrow-down'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import useFieldValidate from '@/hooks/useFieldValidate'
import { FieldTypes } from '@/utils/form-validate'
import { message, Tooltip } from 'antd'
import useFormChange from '@/hooks/useFormChange'
import _ from 'classnames'

export interface RegisterFormProps {
  children?: ReactNode
  isLogin: boolean
  changeStatus: () => void
  submit: (formInfo: LoginInfo | RegisterInfo) => void
  isLoading: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = React.memo((props) => {
  const {isLogin, changeStatus, submit, isLoading} = props
  const [showArrow, setShowArrow] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const observeBox = useIntersectionObserver(
    (isIntersecting) => {
      setShowArrow(!isIntersecting)
    }, {
      root: contentRef.current
    }
  )

  const {
    formInfo,
    setFormInfo,
    handleFieldChange
  } = useFormChange({
    nickname: '',
    username: '',
    password: '',
    re_password: '',
    github: '',
    email: '',
    phone: ''
  })

  const {
    helpText,
    handleFieldValidate,
    reset,
    validate
  } = useFieldValidate(formInfo)

  useEffect(() => {
    reset()
    setFormInfo({
      nickname: '',
      username: '',
      password: '',
      re_password: '',
      github: '',
      email: '',
      phone: ''
    })
  }, [isLogin])

  const handleRegister = () => {
    message.destroy()
    if (!validate()) {
      message.warning('请完善注册信息')
    } else {
      const {password, re_password} = formInfo
      if (password !== re_password) {
        return message.error('两次密码不一致')
      }
      const deep = JSON.parse(JSON.stringify(formInfo))
      for (const key in deep) {
        !deep[key] && (delete deep[key])
        delete deep['re_password']
      }
      submit(deep)
    }
  }

  return (
    <div className={_('register-bar', isLogin ? '' : 'fade')}>
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
            helperText={helpText[FieldTypes.nickname]}
            helperColor="error"
            onChange={handleFieldChange('nickname')}
            onBlur={handleFieldValidate(FieldTypes.nickname)}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="account"
            clearable labelLeft="Account*"
            placeholder="hey there!"
            value={formInfo.username}
            helperText={helpText[FieldTypes.username]}
            helperColor="error"
            onChange={handleFieldChange('username')}
            onBlur={handleFieldValidate(FieldTypes.username)}
          />
        </div>
        <div className="form-item">
          <Input.Password
            width={'280px'} aria-label="password"
            labelLeft="Password*"
            placeholder="password here"
            helperText={helpText[FieldTypes.password]}
            helperColor="error"
            onBlur={handleFieldValidate(FieldTypes.password)}
            onChange={handleFieldChange(FieldTypes.password)}
            value={formInfo.password}
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
            helperText={helpText[FieldTypes.email]}
            helperColor="error"
            onBlur={handleFieldValidate(FieldTypes.email)}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="github"
            clearable labelLeft="Github"
            placeholder="your github"
            value={formInfo.github}
            onChange={handleFieldChange('github')}
            helperText={helpText[FieldTypes.github]}
            helperColor="error"
            onBlur={handleFieldValidate(FieldTypes.github)}
          />
        </div>
        <div className="form-item">
          <Input
            width={'280px'} aria-label="phone"
            clearable labelLeft="Phone"
            placeholder="your phone"
            value={formInfo.phone}
            onChange={handleFieldChange('phone')}
            helperText={helpText[FieldTypes.phone]}
            helperColor="error"
            onBlur={handleFieldValidate(FieldTypes.phone)}
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
          {isLoading
            ? <Loading type="points-opacity" color="white"/>
            : 'Sign up!'
          }
        </Button>
        <Tooltip title="已有账号?去登陆" placement="right">
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
