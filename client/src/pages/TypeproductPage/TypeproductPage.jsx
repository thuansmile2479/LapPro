import { Col, Pagination, Row } from 'antd'
import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { LapProNavbar, LapProProductCol } from '../style'

const TypeproductPage = () => {
  const onChange = () => { }
  return (
    <div style={{width: '100%', background: '#f5f5fa' }}>
      <div style={{width: '1330px', margin: '0 auto' }}>
        <Row style={{ flexWrap: 'nowrap', paddingTop: '15px' }}>
          <LapProNavbar span={4}  >
            <NavbarComponent />
          </LapProNavbar>
          <Col span={20}>
            <LapProProductCol span={20}>
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </LapProProductCol>
            <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', margin: '15px' }} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TypeproductPage