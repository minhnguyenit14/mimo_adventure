import React, { Component } from 'react';
import { Container, BackTop } from 'app-commons';
import FlipMove from 'react-flip-move';
import cls from './styles.module.scss';

class MiMoPageContainer extends Component {
    state = {};
    
    render() {
        const { children, className, ...pageContainerProps } = this.props;
        return (
            <Container
                className={window.classnames(cls.pageContainer, className)}
                {...pageContainerProps}
            >
                <BackTop />
                <FlipMove
                    appearAnimation={'fade'}
                    enterAnimation={'fade'}
                    leaveAnimation={'fade'}
                >
                    {children}
                </FlipMove>
            </Container>
        )
    }
}

export default MiMoPageContainer;