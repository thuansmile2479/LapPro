import React from 'react'
import { StarFilled } from '@ant-design/icons';
import { StyleNameProduct, LapProCarStyle, LapProDiscountText, LapProPriceText, LapProReportText } from './../style';

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled} = props 
    return (
        <LapProCarStyle
            hoverable
            headStyle={{ width: '250px', height: '250px' }}
            style={{ width: 250 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <LapProReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
                </span>
                <span> | Da ban {selled || 1000}+</span>
            </LapProReportText>
            <LapProPriceText>
                <span style={{ marginRight: '8px' }}>{price} đ</span>
                <LapProDiscountText>
                    {discount || 5}%
                </LapProDiscountText>
            </LapProPriceText>
        </LapProCarStyle>
    )
}

export default CardComponent