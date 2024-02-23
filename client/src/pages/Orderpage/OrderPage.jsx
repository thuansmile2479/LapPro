import { Checkbox, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { WrapperCountOrder, LapProInfo, LapProItemOrder, LapProLeft, LapProListOrder, WrapperRight, LapProStyleHeader, LapProTotal, LapProStyleHeaderStep } from '../style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { LapProInputNumber } from '../../components/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slices/orderSlide';
import { converPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../InputComponent/InputComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slices/useSlide';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent';


const OrderPage = () => {
  const navigate = useNavigate()
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase') {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }))
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }))
      }
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  } 

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

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
    if (priceMemo >= 20000 && priceMemo < 500000) {
      return 10000
    } else if (priceMemo >= 500000 || order?.orderItemSelected?.length === 0) {
      return 0
    } else {
      return 20000
    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleAddCard = () => { 
    if (!order?.orderItemSelected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      setIsOpenModalUpdateInfo(true)
    } else {
      navigate('/payment')
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
  );

  const { data } = mutationUpdate

  const handleCancelUpdate = () => {
    setStateUserDetail({
      name: '',
      email: '',
      phone: '',
      isAdmin: false
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
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

  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến dưới 500.000 VND',
    },
    {
      title: 'Free ship',
      description: 'Trên 500.000 VND',
    },
  ]


  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LapProLeft>
            <LapProStyleHeaderStep>
              <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000
                ? 2 : diliveryPriceMemo === 20000 ? 1
                  : order.orderItemSelected.length === 0 ? 0 : 3} />
            </LapProStyleHeaderStep>
            <LapProStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
              </div>
            </LapProStyleHeader>
            <LapProListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <LapProItemOrder key={order?.product}>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{
                        width: 260,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{converPrice(order?.price)}</span>
                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <LapProInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order.countInStock, order?.amount === 1)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{converPrice(order?.price * order?.amount)}</span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </LapProItemOrder>
                )
              })}
            </LapProListOrder>
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
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px'
              }}
              textbutton={'Mua hàng'}
              styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title='Cập nhật thông tin giao hàng'
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateUserDetail.name} onChange={handleOnchangeDetail} name="name" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <InputComponent value={stateUserDetail.city} onChange={handleOnchangeDetail} name="city" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <InputComponent value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
          </Form.Item>

        </Form>
      </ModalComponent>
    </div>
  )
}

export default OrderPage