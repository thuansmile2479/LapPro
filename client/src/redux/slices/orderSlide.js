import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
  orderItemSelected: [],
  shippingAddress: {
  },
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isErrorOrder: false,
  isSucessOrder: false,
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
      if (itemOrder) {
        if (itemOrder.amount <= itemOrder.countInstock) {
          itemOrder.amount += orderItem?.amount
          state.isSucessOrder = true
          state.isErrorOrder = false
        } else {
          state.isErrorOrder = true
        }
      } else {
        state.orderItems.push(orderItem)
      }
    },
    resetOrder: (state) => {
      state.isSucessOrder = false
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct)
      itemOrder.amount++
      if (itemOrderSelected) {
        itemOrderSelected.amount++
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct)
      itemOrder.amount--
      if (itemOrderSelected) {
        itemOrderSelected.amount--
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
      const itemOrderSelected = state?.orderItemSelected?.filter((item) => item?.product !== idProduct)
      state.orderItems = itemOrder
      state.orderItemSelected = itemOrderSelected
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload
      const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
      const itemOrderSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
      state.orderItems = itemOrders
      state.orderItemSelected = itemOrderSelected
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload
      const orderSelected = []
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order)
        }
      })
      state.orderItemSelected = orderSelected
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions

export default orderSlide.reducer