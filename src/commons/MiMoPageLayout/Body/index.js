import React, { Component } from 'react';
import { Container, Col } from 'app-commons';
import cls from './styles.module.scss';


class Body extends Component {
    state = {}
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.children !== this.props.children;
    }
    componentDidUpdate(){
        // console.log('body')
    }
    render() {
        const { children, className, ...bodyProps } = this.props;

        return (
            <Container
                {...bodyProps}
            >
                <Col className={window.classnames(cls.bodyContainer, className)}>
                    {children}
                </Col>

            </Container>
        );
    }
}

export default Body;