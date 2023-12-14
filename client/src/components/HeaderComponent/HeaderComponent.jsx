import React from 'react'
import { Badge, Col } from 'antd';
import { LapProHeader, LapProTextHeader, LapProHeaderAccout, LapProTextHeaderSmall } from './../style'
// import Search from 'antd/es/input/Search';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
    return (
        <div style={{  width: '100%', display: 'flex',background: 'rgb(26, 148, 255)', justifyContent: 'center' }}>
            <LapProHeader >
                <Col span={5}><LapProTextHeader>LapPro</LapProTextHeader> </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textButton="Tìm kiếm"
                        placeholder="input search text"
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '30px', alignItems: 'center' }} >
                    <LapProHeaderAccout>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div >
                            <LapProTextHeaderSmall>Đăng nhập/Đăng ký</LapProTextHeaderSmall>
                            <div>
                                <LapProTextHeaderSmall>Tài khoản</LapProTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </LapProHeaderAccout>
                    <div>
                        <Badge count={4} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <LapProTextHeaderSmall>Giỏ hàng</LapProTextHeaderSmall>
                    </div>
                </Col>
            </LapProHeader>
        </div>
    )
}

export default HeaderComponent