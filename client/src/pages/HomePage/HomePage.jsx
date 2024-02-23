import React, { useEffect, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { LapProButtonMore, LapProProducts, LapProTypeProduct } from '../style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider01 from '../../assets/images/slider01.webp'
import slider02 from '../../assets/images/slider02.webp'
import slider03 from '../../assets/images/slider03.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 100)
  const [limit, setLimit] = useState(5)
  const [typeProducts, setTypeProducts] = useState([])

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const { data: products, isPreviousData } = useQuery({
    queryKey: ['products', limit, searchDebounce],
    queryFn: fetchProductAll,
    config: { retry: 3, retryDelay: 1000, keepPreviousData: true }
  });

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  return (
    <>
      <div style={{ padding: '0 auto', width: '1330px' }}>
        <LapProTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </LapProTypeProduct>
      </div>
      <div className='body' style={{ width: '100%', backgroundColor: '#f5f5fa', }}>
        <div id="container" style={{ height: '1000px', width: '1330px', margin: '0 auto' }}>
          <SliderComponent arrImages={[slider01, slider02, slider03]} />
          <LapProProducts>
            {products?.data?.map((product) => {
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

          </LapProProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <LapProButtonMore
              textbutton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
                border: '1px solid rgb(11, 116, 229)', color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11, 116, 229)'}`,
                width: '240px', height: '38px', borderRadius: '4px'
              }}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styletextbutton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
              onClick={() => setLimit((prev) => prev + 5)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage