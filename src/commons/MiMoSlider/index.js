import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import Slider from "react-slick";
import { Image } from 'app-commons';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
};

class MiMoSlider extends PureComponent {
    state = {};

    renderSlideItem = () => {
        return this.props.data.map((item, index) => {
            return item
        })
    }

    render() {
        const { ...sliderProps } = this.props;
        return (
            <Slider
                {...sliderProps}
                {...settings}
            >
                {this.renderSlideItem()}
            </Slider>
        );
    }
}

export default MiMoSlider;