import React  from 'react'
import { LapProInfo, Lable, LapProRadio, LapProContainer, LapProValue, LapProItemOrderInfo, LapProItemOrder } from '../style'; 
import { converPrice } from '../../utils';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import useSelection from 'antd/es/table/hooks/useSelection';


const OrderSuccess = () => {
  const order = useSelection((state) => state.order)
  const location = useLocation()
  console.log('location', location);
  const { state } = location
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Đơn hàng đặt thành công</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LapProContainer>
            <LapProInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <LapProValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                    {orderContant.delivery[state?.delivery]}
                  </span> Giao hàng tiết kiệm
                </LapProValue>
              </div>
            </LapProInfo>
            <LapProInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>

                <LapProValue> {orderContant.payment[state?.payment]} </LapProValue>
              </div>
            </LapProInfo>
            <LapProItemOrderInfo>
                {state.order?.map((order) => {
                  return (
                    <LapProItemOrder key={order?.name}>
                      <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',gap: '10px'}}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {converPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </LapProItemOrder>
                  )
                })}
              </LapProItemOrderInfo>
              <div>
                <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {converPrice(state?.totalPriceMemo)}</span>
              </div>
          </LapProContainer>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess