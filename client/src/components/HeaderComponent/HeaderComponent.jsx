import React, { useEffect, useState } from 'react'
import { Badge, Col, Popover } from 'antd';
import { LapProHeader, LapProTextHeader, LapProHeaderAccout, LapProTextHeaderSmall, LapProContentPopup } from './../style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slices/useSlide.js'
import Loading from '../Loading'
import { searchProduct } from '../../redux/slices/productSlice.js';



const HeaderComponent = ({ inSearch = false, inCart = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/signin')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.loginUser()
        dispatch(resetUser())
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            {user?.isAdmin && (
                <LapProContentPopup onClick={() => navigate('/system/admin')}>Trang quản trị</LapProContentPopup>
            )}
            <LapProContentPopup onClick={() => navigate('/profile')}>Trang cá nhân</LapProContentPopup>
            <LapProContentPopup onClick={handleLogout}>Đăng xuất</LapProContentPopup>
        </div>
    );
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div style={{ width: '100%', display: 'flex', background: 'rgb(26, 148, 255)', justifyContent: 'center' }}>
            <LapProHeader style={{ justifyContent: inSearch && inCart ? 'space-between' : 'flex-end' }}>
                <Col span={5}><LapProTextHeader>LapPro</LapProTextHeader> </Col>
                {!inSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder="input search text"
                            onChange={onSearch}
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Loading isLoading={loading}>
                        <LapProHeaderAccout>
                            {userAvatar ? (
                                <img src={userAvatar} alt='avatar' style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <Popover content={content} trigger="click">
                                    <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                </Popover>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <LapProTextHeaderSmall>Đăng nhập/Đăng ký</LapProTextHeaderSmall>
                                    <div>
                                        <LapProTextHeaderSmall>Tài khoản</LapProTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </LapProHeaderAccout>
                    </Loading>
                    {!inCart && (
                        <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
                            <Badge count={4} size='small'>
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <LapProTextHeaderSmall>Giỏ hàng</LapProTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </LapProHeader>
        </div>
    )
}

export default HeaderComponent