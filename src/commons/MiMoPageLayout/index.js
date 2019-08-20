import React, { PureComponent } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { Container } from 'app-commons';
import cls from './styles.module.scss';

class MiMoPageLayout extends PureComponent {
    state = {};
    
    componentDidUpdate() {
        console.log('layout')

    }
    componentDidMount() {
        this.timeout = setTimeout(() => window.scrollTo({ top: 0 }));
    }

    render() {
        return (
            <Container className={window.classnames(cls.pageContainer)}>
                <Header slidesData={this.props.slidesData} />
                <Body className={this.props.bodyClassName}>
                    {this.props.children}
                </Body>
                <Footer />
            </Container>
        );
    }
}

MiMoPageLayout.defaultProps = {
    slidesData: []
}

export default MiMoPageLayout;