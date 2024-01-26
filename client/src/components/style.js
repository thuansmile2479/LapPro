import styled from "styled-components";
import { Card, Row, Image, Col, InputNumber, Input, Upload, Steps } from "antd";
import Slider from "react-slick";
const { Step } = Steps;


export const LapProCarStyle = styled(Card)`
    width: 250px;
    & img {
        height: 250px;
        width: 250px;
    },
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    
`

export const LapProReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`

export const LapProPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const LapProDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500
`

export const LapProHeader = styled(Row)`
    background-color: rgb(26, 146, 255);
    align-item: center,
    gap: 26px,
    flex-wrap: nowrap;
    width: 1330px;
    padding: 10px 0
`

export const LapProTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight:bold;
    text-aligh: left;
`

export const LapProHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`

export const LapProTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-spce: nowrap;
`

export const LapProLableText = styled.h4`
    color: rgb(56, 56, 61);
    font-site: 14px;
    font-waight: 500;
`

export const LapProTextValue = styled.span`
    color: rgb(56, 56, 61);
    font-size: 12px;
    font-weight: 400
`

export const LapProContent = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column;
    gap: 12px
`

export const LapProStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const LapProStyleColImage = styled(Col)`
    flex-basics: unset
    display: flex
`

export const LapProStylenameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    line-geight: 32px;
    word-break: break-word;
`

export const LapProStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`

export const LapProPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const LapProPricetextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-height: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px
`

export const LapProAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl
    };
    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`

export const LapProQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const LapProInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`

export const LapProInputStyle = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    outline: none;
    &:focus {
        background-color: rgb(232, 240, 254);
    }
`

export const LapProSliderStyle = styled(Slider)`
    & .slick-arrow.slick-prev {
        left: 12px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-arrow.slick-next {
        right: 28px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-dots {
        z-index: 10;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: rgb(255, 255, 0.5);
                }
            }
        }
        li.active {
            button {
                &::before {
                    color: #fff;
                }
            }
        }
    }
`

export const LapProContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`

export const LapProHeader02 = styled.h1`
    color: #000;
    font-size: 14px;
`

export const LapProUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`

export const CustomStep = styled(Step)`
  .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-icon {
    background: #9255FD
  }
`