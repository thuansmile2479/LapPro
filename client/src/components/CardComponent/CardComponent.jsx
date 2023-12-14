import React from 'react'
import { StarFilled } from '@ant-design/icons';
import { StyleNameProduct, LapProCarStyle, LapProDiscountText, LapProPriceText, LapProReportText } from './../style';

const CardComponent = () => {
    return (
        <LapProCarStyle
            hoverable
            headStyle={{ width: '250px', height: '250px' }}
            style={{ width: 250 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyleNameProduct>Iphone</StyleNameProduct>
            <LapProReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} /> 
                </span>
                <span> | Da ban 1000+</span>
            </LapProReportText>
            <LapProPriceText>
                <span style={{ marginRight: '8px' }}>1.000.000 đ</span>
                <LapProDiscountText>
                    -5%
                </LapProDiscountText>
            </LapProPriceText>
        </LapProCarStyle>
    )
}

export default CardComponent