import React from 'react'
import Slider from 'react-slick'
import { Image } from 'antd';
import { LapProSliderStyle } from '../style';

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500
    };
    return (
        <LapProSliderStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width='100%' height='500px'/>
                )
            })}
        </LapProSliderStyle>
    )
}

export default SliderComponent