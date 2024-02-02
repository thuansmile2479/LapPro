import axios from "axios"

export const getPayment = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/config`)
    return res.data
}

