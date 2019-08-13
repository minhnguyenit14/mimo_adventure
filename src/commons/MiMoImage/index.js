import React, { PureComponent } from 'react';
import Img from 'react-image';
import { Container } from 'app-commons';
import cls from './styles.module.scss';

class MiMoImage extends PureComponent {
    state = {}
    render() {
        const { containerClassName, className, onClick, ...imageProps } = this.props;
        return (
            <Container onClick={onClick} contentCenter className={window.classnames(containerClassName)}>
                <Img
                    className={window.classnames(cls.img, className)}
                    {...imageProps}
                />
            </Container>
        );
    }
}

export default MiMoImage;