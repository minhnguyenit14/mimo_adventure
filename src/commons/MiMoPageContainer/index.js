import React, { Component } from 'react';
import { Container, BackTop } from 'app-commons';
import FlipMove from 'react-flip-move';
import cls from './styles.module.scss';
import { POST_HOME_INCREASE_VIEW } from 'constants/api';

class MiMoPageContainer extends Component {
    state = {};
    updateUserStatusInterval = null;


    componentDidMount() {
        this.updateUserStatus();
        this.updateUserStatusInterval = setInterval(
            () => this.updateUserStatus(),
            5 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateUserStatusInterval);
    }

    updateUserStatus = () => {
        window.post(POST_HOME_INCREASE_VIEW, {}).then(
            res => {
                // console.log('update', res)
            }
        )
    }
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