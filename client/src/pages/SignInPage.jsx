import React, { useState } from 'react'
import { LapProContainerLeft, LapProContainerRight, LapProTextLight, } from './style'
import InputForm from '../components/InputForm'
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import login from '../assets/images/login.jpg'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <LapProContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" /> 
          <div style={{ position: 'relative' }}>
            <span
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
              type={isShowPassword ? "text" : "password"} 
            />
          </div>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={'Đăng nhập'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          >
          </ButtonComponent>
          <p><LapProTextLight>Quên mật khẩu?</LapProTextLight></p>
          <p>Chưa có tài khoản? <LapProTextLight  > Tạo tài khoản</LapProTextLight></p>
        </LapProContainerLeft>

        
        <LapProContainerRight>
          <Image src={login} preview={false} alt="iamge-logo" height="203px" width="203px" />
          <h4>Mua sắm tại LapPro</h4>
        </LapProContainerRight>
      </div>
    </div>
  )
}

export default SignInPage