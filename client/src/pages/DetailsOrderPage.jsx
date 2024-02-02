import React, { useMemo } from 'react'
import * as OrderService from '../services/OrderService';
import { LapProAllPrice, LapProContentInfo, LapProHeaderUser, LapProInfoUser, LapProItem, LapProItemLabel, LapProLabelDetail, LapProNameProduct, LapProProduct, LapProStyleContent } from './style'
import { converPrice } from '../utils';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { orderContant } from '../contant'

const DetailsOrderPage = () => { 
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const fetchDetailOrder = async () => {
    const res = await OrderService.getDetailOrder(id, state?.token)
    return res.data
  }
  const queryOrder = useQuery({
    queryKey: ['orders-details'],
    queryFn: fetchDetailOrder,
    enabled: Boolean(id)
  });


  const { data } = queryOrder
  console.log('dada', data);

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [data])

  return (
    <div style={{ width: '100%', height: '100vh', background: '#f5f5fa' }}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <h4>Chi tiết đơn hàng</h4>
        <LapProHeaderUser>
          <LapProInfoUser>
            <LapProLabelDetail>Địa chỉ người nhận</LapProLabelDetail>
            <LapProContentInfo>
              <div className='name-info'> {data?.shippingAddress?.fullName} </div>
              <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`} </div>
              <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone} </div>
            </LapProContentInfo>
          </LapProInfoUser>
          <LapProInfoUser>
            <LapProLabelDetail>Hình thức giao hàng</LapProLabelDetail>
            <LapProContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
              <div className='delivery-fee'><span>Phí giao hàng: </span> {data?.shippingPrice} </div>
            </LapProContentInfo>
          </LapProInfoUser>
          <LapProInfoUser>
            <LapProLabelDetail>Hình thức thanh toán</LapProLabelDetail>
            <LapProContentInfo>
              <div className='payment-info'> {orderContant.payment[data?.paymentMethod]} </div>
              <div className='status-payment'> {data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'} </div>
            </LapProContentInfo>
          </LapProInfoUser>
        </LapProHeaderUser>
        <LapProStyleContent>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '670px' }}>Sản phẩm</div>
            <LapProItemLabel>Giá</LapProItemLabel>
            <LapProItemLabel>Số lượng</LapProItemLabel>
            <LapProItemLabel>Giảm giá</LapProItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <LapProProduct>
                <LapProNameProduct>
                  <img src={order?.image}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px',
                    height: '70px',
                  }}>Điện thoại</div>
                </LapProNameProduct>
                <LapProItem>{converPrice(order?.price)}</LapProItem>
                <LapProItem>{order?.amount}</LapProItem>
                <LapProItem>{order?.discount ? converPrice(priceMemo * order?.discount / 100) : '0 VND'}</LapProItem>


              </LapProProduct>
            )
          })}

          <LapProAllPrice>
            <LapProItemLabel>Tạm tính</LapProItemLabel>
            <LapProItem>{converPrice(priceMemo)}</LapProItem>
          </LapProAllPrice>
          <LapProAllPrice>
            <LapProItemLabel>Phí vận chuyển</LapProItemLabel>
            <LapProItem>{converPrice(data?.shippingPrice)}</LapProItem>
          </LapProAllPrice>
          <LapProAllPrice>
            <LapProItemLabel>Tổng cộng</LapProItemLabel>
            <LapProItem><LapProItem>{converPrice(data?.totalPrice)}</LapProItem></LapProItem>
          </LapProAllPrice>
        </LapProStyleContent>
      </div>
    </div>
  )
}

export default DetailsOrderPage