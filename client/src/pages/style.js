import styled from "styled-components";
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import { Col } from "antd";

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
        background: fgb(13, 92, 182);
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align: center;
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