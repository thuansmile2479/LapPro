import { Radio, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { LapProInfo, LapProLeft, WrapperRight, LapProTotal, Lable, LapProRadio } from '../style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { converPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../InputComponent/InputComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slices/useSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slices/orderSlide';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'


const PaymentPage = () => {
  const navigate = useNavigate()
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const [sdkReady, setSdkReady] = useState(false)

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const [form] = Form.useForm();

  const dispatch = useDispatch()



  useEffect(() => {
    form.setFieldValue(stateUserDetail)
  }, [form, stateUserDetail])

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetail({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }


  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000
    } else if (priceMemo === 0) {
      return 0
    } else {
      return 20000
    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemSelected && user?.name
      && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemSelected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id
        }
      )
    }
  }


  const mutationUpdate = useMutationHook(
    (data) => {
      const {
        id,
        token,
        ...rests
      } = data;
      const res = UserService.updateUser(
        id,
        { ...rests }, token
      )
      return res
    }
  )


  const mutationAddOrder = useMutationHook(
    (data) => {
      const {
        token,
        ...rests
      } = data;
      const res = OrderService.createOrder(
        { ...rests }, token
      )
      return res
    }
  );

  const { data } = mutationUpdate
  const { data: dataAdd, isSuccess, isError } = mutationAddOrder

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemSelected?.forEach(element => {
        arrayOrdered.push(element.product)
      })
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
      message.success('Đặt hàng thành công')
      navigate('/orderSuccess', {
        state: {
          delivery,
          payment,
          order: order?.orderItemSelected,
          totalPriceMemo: totalPriceMemo
        }
      })
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleCancelUpdate = () => {
    setStateUserDetail({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time
      }
    )
  }

  const handleUpdateInfoUser = () => {
    const { name, address, city, phone } = stateUserDetail
    if (name && address && city && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetail }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, city, phone }))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }

  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getPayment()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [])


  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Chọn phương thức thanh toán</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LapProLeft>
            <LapProInfo>
              <div>
                <Lable>Chọn phương thức giao hàng</Lable>
                <LapProRadio onChange={handleDilivery} value={delivery}>
                  <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                  <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                </LapProRadio>
              </div>
            </LapProInfo>
            <LapProInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <LapProRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                  <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                </LapProRadio>
              </div>
            </LapProInfo>
          </LapProLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <LapProInfo>
                <div style={{ width: '100%' }}>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                  <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}>Thay đổi</span>
                </div>
              </LapProInfo>
              <LapProInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{converPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{converPrice(priceDiscountMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{converPrice(diliveryPriceMemo)}</span>
                </div>
              </LapProInfo>
              <LapProTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{converPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </LapProTotal>
            </div>
            {payment === 'paypal' && sdkReady ? (
              <div style={{ width: '320px' }}>
                <PayPalButton
                  amount={totalPriceMemo}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={onSuccessPaypal}
                  onError={() => {
                    alert('Error')
                  }}
                />
              </div>
            ) : (
              <ButtonComponent
                onClick={() => handleAddOrder()}
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '320px',
                  border: 'none',
                  borderRadius: '4px'
                }}
                textButton={'Đặt hàng'}
                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
              ></ButtonComponent>
            )
            }
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          // onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateUserDetail['name']} onChange={handleOnchangeDetail} name="name" />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <InputComponent value={stateUserDetail['city']} onChange={handleOnchangeDetail} name="city" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your  phone!' }]}
          >
            <InputComponent value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
          </Form.Item>

          <Form.Item
            label="Adress"
            name="address"
            rules={[{ required: true, message: 'Please input your  address!' }]}
          >
            <InputComponent value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default PaymentPage