import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import pro02 from '../../assets/images/pro02.webp'
import { LapProInputNumber, LapProPriceProduct, LapProPricetextProduct, LapProQualityProduct, LapProStyleColImage, LapProStyleImageSmall, LapProStyleTextSell, LapProStylenameProduct } from '../style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const ProductDetailComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailProduct(id)
            return res.data
        }
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            setNumProduct(numProduct - 1)
        }
    }


    const { data: productDetail } = useQuery({
        queryKey: ['product-detail', idProduct],
        queryFn: fetchGetDetailProduct,
        config: { enabled: !!idProduct }
    });

    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: '100%' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={productDetail?.image} alt='image product' preview={false} />
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
                <LapProStylenameProduct>{productDetail?.name}</LapProStylenameProduct>
                <div>
                    <Rate allowHalf defaultValue={productDetail?.rating} value={productDetail?.rating}/>
                    <LapProStyleTextSell> | Da ban 100+</LapProStyleTextSell>
                </div>
                <LapProPriceProduct>
                    <LapProPricetextProduct>{productDetail?.price}</LapProPricetextProduct>
                </LapProPriceProduct>
                <LapProPriceProduct>
                    <span>Giao đến</span>
                    <span className='address'>{user?.address}</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </LapProPriceProduct>
                <div>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <LapProQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <LapProInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
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