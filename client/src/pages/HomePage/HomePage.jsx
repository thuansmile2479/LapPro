import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { LapProButtonMore, LapProProducts, LapProTypeProduct } from '../style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider01 from '../../assets/images/slider01.webp'
import slider02 from '../../assets/images/slider02.webp'
import slider03 from '../../assets/images/slider03.webp'
import CardComponent from '../../components/CardComponent/CardComponent'

const HomePage = () => {
  const arr = ['TV', 'Tu lanh', 'Lapop']

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