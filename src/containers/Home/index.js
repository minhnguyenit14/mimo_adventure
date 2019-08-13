import React, { Component } from 'react';
import { Image, PageLayout, Row, Card, Heading, Col, Paragraph } from 'app-commons';
import cls from './styles.module.scss';
import { PATH } from 'app-constants';

class Home extends Component {
    state = {
        slidesData: [
            <Image key={1} className={window.classnames(cls.img)} src={require('app-assets/images/slick/1.jpg')} />,
            <Image key={2} className={window.classnames(cls.img)} src={require('app-assets/images/slick/2.jpg')} />,
            <Image key={3} className={window.classnames(cls.img)} src={require('app-assets/images/slick/3.jpg')} />,
        ]
    };

    onProductClick = (id) => {
        this.props.history.push(`${PATH.PRODUCT}/${id}`);
    }

    render() {
        const products = [
            {
                id: '1',
                src: require('assets/images/slick/1.jpg'),
                title: 'Tượng phật Quan Âm',
                subTitle: 'Tượng thạch'
            },
            {
                id: '2',
                src: require('assets/images/slick/2.jpg'),
                title: 'Bàn gỗ sồi',
                subTitle: 'Đồ gỗ'
            },
            {
                id: '3',
                src: require('assets/images/slick/3.jpg'),
                title: 'Bình ngũ sắc',
                subTitle: 'Đồ gốm'
            },
            {
                id: '4',
                src: require('assets/images/slick/1.jpg'),
                title: 'Tượng phật Quan Âm',
                subTitle: 'Tượng thạch'
            },
            {
                id: '5',
                src: require('assets/images/slick/2.jpg'),
                title: 'Bàn gỗ sồi',
                subTitle: 'Đồ gỗ'
            },
            {
                id: '6',
                src: require('assets/images/slick/3.jpg'),
                title: 'Bình ngũ sắc',
                subTitle: 'Đồ gốm'
            },
        ]
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
                slidesData={this.state.slidesData}
            >
                <Col className={window.classnames(cls.bodyContainer)}>
                    {/* <Col className={window.classnames(cls.companyIntro)}>
                        <Image
                            src={require('assets/images/logo/logo.png')}
                            containerClassName={window.classnames(cls.imgContainerCompanyIntro)}
                            className={window.classnames(cls.imgCompanyIntro)}
                        />
                        <Paragraph
                            className={window.classnames(cls.sloganCompanyIntro)}
                        >
                            Some quotes or slogans....
                        </Paragraph>
                    </Col> */}
                    <Heading center className={window.classnames(cls.featuredTitle)}>
                        Sản phẩm nổi bật
                    </Heading>
                    <Row className={window.classnames(cls.cardContainer)}>
                        {products.map((product, index) => <Card
                            className={window.classnames(cls.card)}
                            contentClassName={window.classnames(cls.cardContent)}
                            title={product.title}
                            src={product.src}
                            subTitle={product.subTitle}
                            key={index}
                            id={product.id}
                            onClick={this.onProductClick}
                        />)}
                    </Row>
                </Col>
                <Row className={window.classnames(cls.parallax)}>
                    <Paragraph className={window.classnames(cls.quote)}>
                        Something motivate, something good...
                    </Paragraph>
                </Row>
            </PageLayout >
        );
    }
}

export default Home;