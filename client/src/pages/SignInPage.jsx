import React, { useEffect, useState } from 'react'
import { LapProContainerLeft, LapProContainerRight, LapProTextLight, } from './style'
import InputForm from '../components/InputForm/InputForm'
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import login from '../assets/images/login.jpg'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../services/UserService'
import { useMutationHook } from '../hooks/useMutationHook'
// import Loading from '../components/Loading'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/useSlide'


const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const mutation = useMutationHook(
    data => UserService.loginUser(data)
  )
  const { data, isLoading, isSuccess } = mutation

  useEffect(() => {
    console.log('location', location);
    if(isSuccess) {
      if(location?.state) {
        navigate(location?.state)
      }else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if(decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token}))
  }

  // console.log('mutation', mutation);

  const handleNavigateSignUp = () => {
    navigate('/signup')
  }

  const handleEmailChange = (value) => {
    setEmail(value);
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
    // console.log('signin', email, password)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <LapProContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: '10px' }} placeholder="abc@gmail.com"
            value={email}
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
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          {/* <Loading isLoading={isLoading}> */}
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
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
          {/* </Loading> */}
          <p><LapProTextLight>Quên mật khẩu?</LapProTextLight></p>
          <p>Chưa có tài khoản? <LapProTextLight onClick={handleNavigateSignUp} > Tạo tài khoản</LapProTextLight></p>
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