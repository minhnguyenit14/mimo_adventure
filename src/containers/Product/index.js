import React, { Component } from 'react';
import { PageLayout, Image, Row, Col, Menu, Input, Heading, Card } from 'app-commons';
import cls from './styles.module.scss';
import { PRODUCT, PATH } from 'app-constants';
const products = [
    {
        id: 1,
        src: require('assets/images/slick/1.jpg'),
        title: 'Tượng phật Quan Âm',
        subTitle: '$199'
    },
    {
        id: 2,
        src: require('assets/images/slick/2.jpg'),
        title: 'Bàn gỗ sồi',
        subTitle: '$25'
    },
    {
        id: 3,
        src: require('assets/images/slick/3.jpg'),
        title: 'Bình ngũ sắc',
        subTitle: '$15.5'
    },
    {
        id: 4,
        src: require('assets/images/slick/1.jpg'),
        title: 'Tượng phật Quan Âm',
        subTitle: '$199'
    },
    {
        id: 5,
        src: require('assets/images/slick/2.jpg'),
        title: 'Bàn gỗ sồi',
        subTitle: '$25'
    },
    {
        id: 6,
        src: require('assets/images/slick/3.jpg'),
        title: 'Bình ngũ sắc',
        subTitle: '$15.5'
    },
]
class Product extends Component {
    state = {
        selectedMenuKey: '0',
        searchValue: '',
        slidesData: [
            <Image key={1} src={require('app-assets/images/slick/1.jpg')} />,
            <Image key={2} src={require('app-assets/images/slick/2.jpg')} />,
            <Image key={3} src={require('app-assets/images/slick/3.jpg')} />,
        ]
    };

    hanldeMenuClick = (e) => this.setState({
        selectedMenuKey: e
    })

    onProductClick = (id) => {
        this.props.history.push(`${PATH.PRODUCT}/${id}`);
    }

    onChangeSearch = (searchValue) => { this.setState({ searchValue }) }

    render() {
        const { selectedMenuKey } = this.state;
        return (
            <PageLayout
                slidesData={this.state.slidesData}
                bodyClassName={window.classnames(cls.productBody)}
            >
                <Row className={window.classnames(cls.bodyContainer)}>
                    <Col className={window.classnames(cls.filter)}>
                        {/* <Input
                            className={window.classnames(cls.searchLaptop)}
                            search
                            value={this.state.searchValue}
                            onChange={this.onChangeSearch} /> */}
                        <Menu
                            menu={PRODUCT}
                            containerClassName={window.classnames(cls.menuContainer)}
                            className={window.classnames(cls.menu)}
                            mode={'inline'}
                            selectedKeys={[selectedMenuKey]}
                            onClick={this.hanldeMenuClick.bind(this)}
                        />
                    </Col>
                    <Col className={window.classnames(cls.product)}>
                        <Heading type={2} className={window.classnames(cls.productHeading)}>
                            {`Đồ gỗ > Ghế > Ghế đẩu`}
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
                </Row>
            </PageLayout>
        );
    }
}

export default Product;