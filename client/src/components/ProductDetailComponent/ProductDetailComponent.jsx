import { Col, Image, Rate, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import pro02 from '../../assets/images/pro02.webp'
import { LapProInputNumber, LapProPriceProduct, LapProPricetextProduct, LapProQualityProduct, LapProStyleColImage, LapProStyleImageSmall, LapProStyleTextSell, LapProStylenameProduct } from '../style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct, resetOrder } from '../../redux/slices/orderSlide';
import { converPrice } from '../../utils';
// import * as message from '../Message/Message'

const ProductDetailComponent = ({ idProduct }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
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

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetail?._id)
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetail?.countInStock > 0)) {
            setErrorLimitOrder(false) 
        } else if(productDetail?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [numProduct])

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        // else {
        //     message.success('Sản phẩm đã hết hàng')
        // }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1)
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const { data: productDetail } = useQuery({
        queryKey: ['product-detail', idProduct],
        queryFn: fetchGetDetailProduct,
        config: { enabled: !!idProduct }
    });

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/signin', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetail?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetail?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetail?.name,
                        amount: numProduct,
                        image: productDetail?.image,
                        price: productDetail?.price,
                        product: productDetail?._id,
                        discount: productDetail?.discount,
                        countInstock: productDetail?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
 


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
                    <Rate allowHalf defaultValue={productDetail?.rating} value={productDetail?.rating} />
                    <LapProStyleTextSell> | Da ban 100+</LapProStyleTextSell>
                </div>
                <LapProPriceProduct>
                    <LapProPricetextProduct>{converPrice(productDetail?.price)}</LapProPricetextProduct>
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
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <LapProInputNumber onChange={onChange} defaultValue={1} max={productDetail?.countInStock} min={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetail?.countInStock)}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </LapProQualityProduct>
                    </div>
                </div>
                <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                    <div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            onClick={handleAddOrderProduct}
                            textbutton={'Chọn mua'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                        {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
                    </div>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182)',
                            borderRadius: '4px'
                        }}
                        textbutton={'Mua trả sau'}
                        styletextbutton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailComponent