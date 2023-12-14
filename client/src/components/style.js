import styled from "styled-components";
import { Card, Row } from "antd";



export const WrapperCarStyle = styled(Card)`
    width: 250px;
    & img {
        height: 250px;
        width: 250px;
    },
     
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500
`

export const WrapperHeader = styled(Row)`
    padding: 20px 120px;
    background-color: rgb(26, 146, 255);
    align-item: center,
    gap: 26px,
    flex-wrap: nowrap
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight:bold;
    text-aligh: left;
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-spce: nowrap;
`

export const WrapprtLableText = styled.h4`
    color: rgb(56, 56, 61);
    font-site: 14px;
    font-waight: 500;
`

export const WrapperTextValue = styled.span`
    color: rgb(56, 56, 61);
    font-size: 12px;
    font-weight: 400
`

export const WrapperContent = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column;
    gap: 12px
`