import React, { Component } from 'react';
import { PageLayout, Image, Row, Col, Heading, Paragraph, Caption } from 'app-commons';
import cls from './styles.module.scss';

class ProductDetail extends Component {
    state = {};
    render() {
        // alert(this.props.match.params.id);
        return (
            <PageLayout bodyClassName={window.classnames(cls.body)}>
                <Col className={window.classnames(cls.introContainer)}>
                    <Paragraph className={window.classnames(cls.category)}>
                        Đồ gỗ
                    </Paragraph>
                    <Row>
                        <Col className={window.classnames(cls.imageContainer)}>
                            <Image
                                className={window.classnames(cls.image)}
                                src={require('assets/images/slick//3.jpg')} />
                        </Col>
                        <Col className={window.classnames(cls.intro)}>
                            <Heading>
                                Tên sản phẩm
                            </Heading>
                            <Paragraph>
                                $199
                            </Paragraph>
                            <Caption className={window.classnames(cls.caption)}>
                                Description
                            </Caption>
                            
                        </Col>
                    </Row>
                </Col>
                <Row className={window.classnames(cls.longDes)}>
                    <Paragraph>
                        Long Description
                    </Paragraph>
                </Row>
            </PageLayout>
        );
    }
}

export default ProductDetail;