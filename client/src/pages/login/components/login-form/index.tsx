import React, { ChangeEvent, type ReactNode, useState } from 'react'
import _ from 'classnames'
import { Button, FormElement, Input, Link, Tooltip } from '@nextui-org/react'
import { RegisterInfo } from 'pages/login/components/register-form'

export interface LoginFormProps {
  children?: ReactNode
  isLogin: boolean
  changeStatus: () => void
  submit: (formInfo: LoginInfo | RegisterInfo) => void
}

export interface LoginInfo {
  username: string
  password: string
}

const LoginForm: React.FC<LoginFormProps> = React.memo((props) => {
  const {isLogin, changeStatus, submit} = props

  const [forminfo, setFormInfo] = useState<LoginInfo>({
    username: '',
    password: ''
  })

  const handleFieldChange = (field: keyof LoginInfo) =>
    (e: ChangeEvent<FormElement>) => {
      setFormInfo(form => ({
        ...form,
        [field]: e.target.value
      }))
    }

  const handleLogin = () => {
    submit(forminfo)
  }

  return (
    <div className={_('login-bar', !isLogin ? 'hide' : 'show')}>
      <h2 className="title">
        SIGN IN
      </h2>
      <div className="content">
        <div className="form-item">
          <Input
            underlined
            width={'270px'} clearable
            value={forminfo.username} onChange={handleFieldChange('username')}
            helperText="" helperColor="error" labelPlaceholder="Admin"
          />
        </div>
        <div className="form-item">
          <Input.Password
            width={'270px'} underlined clearable
            value={forminfo.password} onChange={handleFieldChange('password')}
            labelPlaceholder="Password"
          />
        </div>
        <div className="form-item">
          <Button
            shadow rounded size="sm" color="success" onPress={handleLogin}
          >
            Sign in
          </Button>
          <Tooltip content="没有账号，现在去注册" placement="rightEnd" color="invert">
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
