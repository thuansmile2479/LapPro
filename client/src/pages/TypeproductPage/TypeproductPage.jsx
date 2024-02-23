import { Col, Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { LapProNavbar, LapProProductCol } from '../style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const TypeproductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 100)
  const { state } = useLocation()
  const [products, setProducts] = useState([])
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  })
  const fetchProductType = async (type, page, limit) => {
    const res = await ProductService.getProductType(type, page, limit)
    if (res?.status === 'OK') {
      setProducts(res?.data)
      setPanigate({ ...panigate, total: res?.total })
    } else {

    } 
  }

  // useEffect(() => {
  //   let newProduct = []
  //   if (searchDebounce) {
  //     newProduct = products?.filter((pro) => pro?.name === searchDebounce)
  //     setProducts(newProduct)
  //   }
  // }, [searchDebounce])

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit)
    }
  }, [state, panigate.page, panigate.limit])


  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize })
  }
  return (
    <div style={{ width: '100%', background: '#f5f5fa', height: 'calc(100vh - 64px' }}>
      <div style={{ width: '1330px', margin: '0 auto', height: '100%' }}>
        <Row style={{ flexWrap: 'nowrap', paddingTop: '15px', height: 'calc(100% - 20px' }}>
          <LapProNavbar span={4}  >
            <NavbarComponent />
          </LapProNavbar>
          <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <LapProProductCol>
              {products?.filter((pro) => {
                if(searchDebounce === ''){
                  return pro
                }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                  return pro
                }
              })?.map((product) => {
                return (
                  <CardComponent
                    key={product.id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    discount={product.discount}
                    selled={product.selled}
                    id={product._id}
                  />
                )
              })}
            </LapProProductCol>
            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', margin: '15px' }} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TypeproductPage