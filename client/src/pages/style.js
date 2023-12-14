import styled from "styled-components";
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import { Col } from "antd";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: 1px solid gray;
    height: 44px
`

export const WrapperButtonMore = styled(ButtonComponent)`
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

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const WrapperProductCol = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top:20px;
    flex-wrap: wrap;
`

export const WrapperNavbar = styled(Col)`
    background: #fff; 
    marginRight: 10px; 
    padding: 10px; 
    border-radius: 6px;
    height: fit-content;
    margin-top:20px;
`