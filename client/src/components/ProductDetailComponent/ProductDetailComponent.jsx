import { Col, Image, Row } from 'antd'
import React from 'react'
import pro01 from '../../assets/images/pro01.webp'
import pro02 from '../../assets/images/pro02.webp'
import { LapProInputNumber, LapProPriceProduct, LapProPricetextProduct, LapProQualityProduct, LapProStyleColImage, LapProStyleImageSmall, LapProStyleTextSell, LapProStylenameProduct } from '../style'
import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailComponent = () => {
    const onChange = () => { }

    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: '100%' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={pro01} alt='image product' preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <LapProStyleColImage span={4}>
                        <LapProStyleImageSmall src={pro02} alt="image small" preview={false} />
                    </LapProStyleColImage>

                    <LapProStyleColImage span={4}>
                        <LapProStyleImageSmall src={pro02} alt="image small" preview={false} />
                    </LapProStyleColImage>

                    <LapProStyleColImage span={4}>
                        <LapProStyleImageSmall src={pro02} alt="image small" preview={false} />
                    </LapProStyleColImage>

                    <LapProStyleColImage span={4}>
                        <LapProStyleImageSmall src={pro02} alt="image small" preview={false} />
                    </LapProStyleColImage>

                    <LapProStyleColImage span={4}>
                        <LapProStyleImageSmall src={pro02} alt="image small" preview={false} />
                    </LapProStyleColImage>

                    <LapProStyleColImage span={4}>
                        <LapProStyleImageSmall src={pro02} alt="image small" preview={false} />
                    </LapProStyleColImage>

                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <LapProStylenameProduct>MacBook Air M1 13 inch 2020</LapProStylenameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
                    <LapProStyleTextSell> | Da ban 100+</LapProStyleTextSell>
                </div>
                <LapProPriceProduct>
                    <LapProPricetextProduct>19.999.000</LapProPricetextProduct>
                </LapProPriceProduct>
                <LapProPriceProduct>
                    <span>Giao đến</span>
                    <span className='address'>Cao đẳng FPT Polytechnic</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </LapProPriceProduct>
                <div>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <LapProQualityProduct>
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <LapProInputNumber defaultValue={3} onChange={onChange} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </LapProQualityProduct>
                    </div>
                </div>
                <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                    {/* <div> */}
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        // onClick={handleAddOrderProduct}
                        textButton={'Chọn mua'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    {/* {errorLimitOrder && <div style={{color: 'red'}}>San pham het hang</div>} */}
                    {/* </div> */}
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182)',
                            borderRadius: '4px'
                        }}
                        textButton={'Mua trả sau'}
                        styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailComponent