import React from 'react'
import { StarFilled } from '@ant-design/icons';
import { StyleNameProduct, WrapperCarStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './../style';

const CardComponent = () => {
    return (
        <WrapperCarStyle
            hoverable
            headStyle={{ width: '250px', height: '250px' }}
            style={{ width: 250 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} /> 
                </span>
                <span> | Da ban 1000+</span>
            </WrapperReportText>
            <WrapperPriceText>
                1.000.000 đ
                <WrapperDiscountText>
                    -5%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCarStyle>
    )
}

export default CardComponent