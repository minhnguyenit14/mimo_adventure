import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Container } from 'app-commons';
import { isMobileOnly } from 'react-device-detect';

const ERROR_IMAGE = require("../../assets/images/error/error.png");

class MiMoGallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderImgData = (images) => {
        let temp = [];
        if (images.length === 0) {
            temp.push({
                original: ERROR_IMAGE,
                thumbnail: ERROR_IMAGE
            })
        } else {
            images.forEach((img) => {
                temp.push(
                    {
                        original: img,
                        thumbnail: img
                    }
                )
            })
        }
        return temp;
    }
    render() {
        let { images, className, ...galleryProps } = this.props;
        images = this.renderImgData(images);
        return (
            <Container className={className}>
                <ImageGallery
                    items={images}
                    // showBullets
                    autoPlay={false}
                    showPlayButton={false}
                    showFullscreenButton={!isMobileOnly}
                    defaultImage={ERROR_IMAGE}
                    {...galleryProps}
                // slideDuration={500}
                />
            </Container>

        );
    }
}

MiMoGallery.defaultProps = {
    className: null,
    images: []
}

export default MiMoGallery;