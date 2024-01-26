import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//     return res.data
// }


export const createOrder = async (data, access_token ) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getOrderByUserId = async (id, access_token ) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get_all_order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getDetailOrder = async (id, access_token ) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get_detail_order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token ) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel_order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}