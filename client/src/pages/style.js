import styled from "styled-components";
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import { Col, Upload, Checkbox } from "antd";

export const LapProTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start; 
    height: 44px
`

export const LapProButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #1a92ff;
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const LapProProducts = styled.div`
    display: flex;
    gap: 20px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const LapProProductCol = styled.div`
    display: flex; 
    gap: 14px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const LapProNavbar = styled(Col)`
    background: #fff; 
    margin-right: 10px; 
    padding: 10px; 
    border-radius: 6px;
    height: fit-content;
    margin-top: 20px;
    width: 200px
`

export const LapProContainerLeft = styled.div`
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
`

export const LapProContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`
export const LapProTextLight = styled.span`
    color: rgb(13, 92, 182);
    font-size: 13px;
    cursor: pointer;
`
export const LapProHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
`
export const LapProContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
`

export const LapProLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`

export const LapProInput = styled.div`
    display: flex;
    align-items: cemter;
    gap: 20px;
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
`

export const LapProStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`
export const LapProStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const LapProLeft = styled.div`
  width: 910px;
`

export const LapProListOrder = styled.div`

`

export const LapProItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`

export const LapProPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const LapProCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const LapProRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const LapProInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`

export const LapProTotal = styled.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
    padding: 17px 20px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #9255FD;
    border-color: #9255FD;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #9255FD;
  }
`