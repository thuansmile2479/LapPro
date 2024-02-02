import React, { useEffect } from 'react';
import * as OrderService from '../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import { LapProContainers, LapProFooterItem, LapProHeaderItem, LapProItemOrders, LapProListOrders, LapProStatus } from './style';
import { converPrice } from '../utils';
import { useMutationHook } from '../hooks/useMutationHook';
import * as message from '../components/Message/Message'

const MyOrderPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.token)
        return res.data
    }
    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrder,
        enabled: Boolean(state?.id && state?.token)
    });


    const { data } = queryOrder

    const handledetailOrder = (id) => {
        navigate(`/details_order/${id}`, {
            state: {
                token: state?.token
            }
        })
    }

    const mutation = useMutationHook(
        (data) => {
            const { id, token, orderItems } = data
            const res = OrderService.cancelOrder(id, token, orderItems)
            return res
        }
    )

    const handleCanceOrder = (order) => {
        mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems }, {
            onSuccess: () => {
                queryOrder.refetch()
            }
        })
    }
    const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
            message.success()
        } else if (isErrorCancle) {
            message.error()
        }
    }, [isErrorCancle, isSuccessCancel])

    const renderProduct = (data) => {
        return data?.map((order) => {
            return <LapProHeaderItem>
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
                    marginLeft: '10px'
                }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{converPrice(order?.price)}</span>
            </LapProHeaderItem>
        })
    }

    return (
        <LapProContainers>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h4>Đơn hàng của tôi</h4>
                <LapProListOrders>
                    {data?.map((order) => {
                        return (
                            <LapProItemOrders key={order?._id}>
                                <LapProStatus>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                    <div><span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</div>
                                    <div><span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán:</span>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</div>
                                </LapProStatus>
                                {renderProduct(order?.orderItems)}
                                <LapProFooterItem>
                                    <div>
                                        <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                        <span
                                            style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                        >{converPrice(order?.totalPrice)}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <ButtonComponent
                                            onClick={() => handleCanceOrder(order)}
                                            size={40}
                                            styleButton={{
                                                height: '36px',
                                                border: '1px solid rgb(11, 116, 229)',
                                                borderRadius: '4px'
                                            }}
                                            textButton={'Hủy đơn hàng'}
                                            styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                        >
                                        </ButtonComponent>
                                        <ButtonComponent
                                            onClick={() => handledetailOrder(order?._id)}
                                            size={40}
                                            styleButton={{
                                                height: '36px',
                                                border: '1px solid rgb(11, 116, 229)',
                                                borderRadius: '4px'
                                            }}
                                            textButton={'Xem chi tiết'}
                                            styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                        >
                                        </ButtonComponent>
                                    </div>
                                </LapProFooterItem>
                            </LapProItemOrders>
                        )
                    })
                    }
                </LapProListOrders>
            </div>
        </LapProContainers>
    );
};

export default MyOrderPage;
