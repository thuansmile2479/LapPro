import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { LapProButtonMore, LapProProducts, LapProTypeProduct } from '../style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider01 from '../../assets/images/slider01.webp'
import slider02 from '../../assets/images/slider02.webp'
import slider03 from '../../assets/images/slider03.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {
  const arr = ['TV', 'Tu lanh', 'Lapop']
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    // console.log('res', res)
    return res
  }

  const { isLoading, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });

  // console.log('data', products)

  return (
    <>
      <div style={{ padding: '0 auto', width: '1330px' }}>
        <LapProTypeProduct>
          {arr.map((item) => {
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
                  
                />
              )
            })}

          </LapProProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <LapProButtonMore textButton='Xem Thêm' type="outline" styleButton={{
              border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
              width: '240px', height: '38px', borderRadius: '4px'
            }}
              styleTextButton={{ fontWeight: 500 }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage