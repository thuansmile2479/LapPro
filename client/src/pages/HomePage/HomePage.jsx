import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from '../style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider01 from '../../assets/images/slider01.webp'
import slider02 from '../../assets/images/slider02.webp'
import slider03 from '../../assets/images/slider03.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'

const HomePage = () => {
  const arr = ['TV', 'Tu lanh', 'Lapop']

  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div id='container' style={{ backgroundColor: '#f5f5fa', padding: '0 120px', height: '100%'  }}>
        <SliderComponent arrImages={[slider01, slider02, slider03]} />
        <WrapperProducts>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </WrapperProducts>
        <div style={{  display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <WrapperButtonMore textButton='Xem Thêm' type="outline" styleButton={{
            border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
            width: '240px', height: '38px', borderRadius: '4px'
          }}
            styleTextButton={{ fontWeight: 500 }}
          />
        </div>
      </div>
    </>
  )
}

export default HomePage