import React, { type ReactNode, useEffect } from 'react'
import { Button, Input, Link, Loading } from '@nextui-org/react'
import { FieldTypes } from '@/utils/form-validate'
import useFieldValidate from '@/hooks/useFieldValidate'
import { message, Tooltip } from 'antd'
import useFormChange from '@/hooks/useFormChange'
import _ from 'classnames'

export interface LoginFormProps {
  children?: ReactNode
  isLogin: boolean
  changeStatus: () => void
  submit: (formInfo: LoginInfo | RegisterInfo) => void
  isLoading: boolean
}

const LoginForm: React.FC<LoginFormProps> = React.memo((props) => {
  const {isLogin, changeStatus, submit, isLoading} = props

  const {
    formInfo,
    setFormInfo,
    handleFieldChange
  } = useFormChange({
    username: '',
    password: ''
  })

  const {
    helpText,
    handleFieldValidate,
    validate,
    reset
  } = useFieldValidate(formInfo)

  useEffect(() => {
    reset()
    setFormInfo({
      username: '',
      password: ''
    })
  }, [isLogin])

  const handleLogin = () => {
    if (!validate()) {
      message.destroy()
      message.warning('请完善登录信息')
    } else {
      submit(formInfo)
    }
  }

  return (
    <div className={_('login-bar', isLogin ? 'fade' : '')}>
      <h2 className="title">
        SIGN IN
      </h2>
      <div className="content">
        <div className="form-item">
          <Input
            underlined
            color="secondary"
            width={'270px'} clearable
            value={formInfo.username}
            onChange={handleFieldChange('username')}
            onBlur={handleFieldValidate(FieldTypes.username)}
            helperText={helpText[FieldTypes.username]}
            helperColor="error" labelPlaceholder="Admin"
          />
        </div>
        <div className="form-item">
          <Input.Password
            autoComplete="off"
            width={'270px'} underlined clearable
            value={formInfo.password}
            color="secondary"
            onChange={handleFieldChange('password')}
            onBlur={handleFieldValidate(FieldTypes.password)}
            helperText={helpText[FieldTypes.password]}
            helperColor="error"
            labelPlaceholder="Password"
          />
        </div>
        <div className="form-item">
          <Button
            shadow rounded size="sm" color="gradient" onPress={handleLogin}
          >
            {isLoading
              ? <Loading type="points-opacity" color="white"/>
              : 'Sign in'
            }
          </Button>
          <Tooltip title="没有账号，现在去注册" placement="right">
            <Button
              light rounded
              onPress={changeStatus}
              size="sm" auto>
              register
            </Button>
          </Tooltip>
        </div>
        <div className="tip">
          <Link isExternal color="text">
            忘记密码
          </Link>
        </div>
      </div>
    </div>
  )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm
