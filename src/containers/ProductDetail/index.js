import React, { Component } from 'react';
import { PageLayout, Row, Col, Heading, Paragraph, Container, Gallery } from 'app-commons';
import cls from './styles.module.scss';
import { PATH, GET_DETAIL_PRODUCT, ID_AKA } from 'app-constants';
import { addUrlToImages, toMoneyFormat, addImagesURLToHtmlContent } from 'app-helpers';
import { PRODUCT_PATH_KEY, ADMIN_URL_KEY } from 'app-config/network';
import renderHtml from 'react-render-html';
import { isMobileOnly } from 'react-device-detect';
import {
    FacebookShareButton,
    FacebookShareCount
} from 'react-share';

class ProductDetail extends Component {
    state = {
        product: {}
    };

    componentDidMount() {
        let { productPath } = this.props.match.params;
        let productId = undefined;
        if (productPath) {
            const pathArray = productPath.split("_");
            if (pathArray.length > 1) {
                productId = pathArray[pathArray.length - 1];
                this.getProduct(productId)
            } else {
                this.goToNotFound();
            }
        }
    }

    goToNotFound() {
        this.props.history.push(PATH.NOT_FOUND);
    }

    getProduct(productId) {
        window.get(GET_DETAIL_PRODUCT.replace(ID_AKA, productId)).then(
            res => {
                let product = JSON.parse(res.data);
                product = addUrlToImages(
                    [product],
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_PATH_KEY]}`,
                    "ProductImages",
                    ","
                )[0];
                product.ProductPrice = toMoneyFormat(product.ProductPrice);
                product.ProductDescription = addImagesURLToHtmlContent(product.ProductDescription);
                this.setState({
                    product
                })
            }
        )
    }

    render() {
        const info = <Col className={window.classnames(cls.intro)}>
            <Heading className={window.classnames(cls.title)}>
                {this.state.product.ProductName}
            </Heading>
            <Paragraph className={window.classnames(cls.price)}>
                {this.state.product.ProductPrice &&
                    `${this.state.product.ProductPrice} ₫`}
            </Paragraph>
        </Col>;

        return (
            <PageLayout bodyClassName={window.classnames(cls.body)}>
                <Col className={window.classnames(cls.introContainer)}>
                    <Paragraph className={window.classnames(cls.category)}>
                        {this.state.product.ProductCategoryName}
                    </Paragraph>
                    <Row>
                        {isMobileOnly && info}

                        <Col className={window.classnames(cls.imageContainer)}>
                            {Array.isArray(this.state.product.ProductImages) &&
                                <Gallery
                                    images={this.state.product.ProductImages}
                                />}

                            <FacebookShareButton
                                url={window.location.href}
                                className={window.classnames(cls.fbWraper)}
                            >
                                <div className={window.classnames(cls.fbContainer)}>
                                    Chia sẻ
                                    <div className={window.classnames(cls.fbShareCount)}>
                                        <FacebookShareCount url={window.location.href}>
                                            {shareCount => (
                                                <div>
                                                    {shareCount}
                                                </div>
                                            )}
                                        </FacebookShareCount>
                                    </div>
                                </div>
                            </FacebookShareButton>
                        </Col>

                        {!isMobileOnly && info}
                    </Row>
                </Col>
                <div className={window.classnames(cls.longDes)}>
                    {this.state.product.ProductDescription &&
                        renderHtml(this.state.product.ProductDescription)}
                </div>
            </PageLayout>
        );
    }
}

export default ProductDetail;