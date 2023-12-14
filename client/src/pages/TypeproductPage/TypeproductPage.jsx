import { Col, Pagination, Row } from 'antd'
import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { WrapperNavbar, WrapperProductCol } from '../style'

const TypeproductPage = () => {
  const onChange = () => { }
  return (
    <div style={{ padding: '0 120px', background: '#f5f5fa' }}>
      <Row style={{ flexWrap: 'nowrap', paddingTop: '15px' }}>
        <WrapperNavbar span={4}  >
          <NavbarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProductCol span={20}>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProductCol>
          <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', margin: '15px' }} />
        </Col>
      </Row>
    </div>
  )
}

export default TypeproductPage