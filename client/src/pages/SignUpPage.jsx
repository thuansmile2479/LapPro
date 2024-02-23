import React, { useEffect, useState } from 'react'
import { LapProContainerLeft, LapProContainerRight, LapProTextLight, } from './style'
import InputForm from '../components/InputForm/InputForm'
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import login from '../assets/images/login.jpg'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../services/UserService'
import { useMutationHook } from '../hooks/useMutationHook'
import * as message from '../components/Message/Message'


const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigete = useNavigate()
  const handleNavigateSignIn = () => {
    navigete('/signin')
  }

  const mutation = useMutationHook(
    data => UserService.signupUser(data)
  )

  const { data, isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleEmailChange = (value) => {
    setEmail(value);
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  }

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <LapProContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            placeholder="abc@gmail.com"
            value={email}
            style={{ marginBottom: '10px' }}
            onChange={handleEmailChange}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="password"
              value={password}
              style={{ marginBottom: '10px' }}
              type={isShowPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="confirm password"
              value={confirmPassword}
              type={isShowConfirmPassword ? 'text' : 'password'}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <ButtonComponent
            disabled={!email.length || !password.length || !confirmPassword.length}
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textbutton={'Đăng ký'}
            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          >
          </ButtonComponent>
          <p>Bạn đã có tài khoản ?<LapProTextLight onClick={handleNavigateSignIn}> Đăng nhập</LapProTextLight></p>
        </LapProContainerLeft>


        <LapProContainerRight>
          <Image src={login} preview={false} alt="iamge-logo" height="203px" width="203px" />
          <h4>Mua sắm tại LapPro</h4>
        </LapProContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage