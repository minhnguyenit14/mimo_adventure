import React, { Component } from 'react';
import { PageLayout, Row, Col, Heading, Paragraph, Gallery } from 'app-commons';
import cls from './styles.module.scss';
import { PATH, GET_DETAIL_PRODUCT, ID_AKA } from 'app-constants';
import { addUrlToImages, toMoneyFormat, addImagesURLToHtmlContent, correctSEOTitle } from 'app-helpers';
import { PRODUCT_PATH_KEY, ADMIN_URL_KEY, PRODUCT_THUMBNAIL_PATH_KEY, IMAGE_PATH_KEY } from 'app-config/network';
import renderHtml from 'react-render-html';
import { isMobileOnly, isMobile } from 'react-device-detect';
import {
    FacebookShareButton
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
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_THUMBNAIL_PATH_KEY]}`,
                    "ProductThumbnail"
                )[0];
                product = addUrlToImages(
                    [product],
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_PATH_KEY]}`,
                    "ProductImages",
                    ","
                )[0];
                product.ProductSEOTitle = correctSEOTitle(product.ProductSEOTitle);
                product.ProductPrice = toMoneyFormat(product.ProductPrice);
                product.ProductDescription = addImagesURLToHtmlContent(
                    product.ProductDescription,
                    res[ADMIN_URL_KEY],
                    res[IMAGE_PATH_KEY]
                );
                this.setState({
                    product
                })
            }
        )
    }

    render() {
        const title = <Heading className={window.classnames(cls.title)}>
            {this.state.product.ProductName}
        </Heading>;
        const subTitle = <Paragraph className={window.classnames(cls.price)}>
            {this.state.product.ProductPrice &&
                `${this.state.product.ProductPrice} ₫`}
        </Paragraph>;

        const info = <Col className={window.classnames(cls.intro)}>
            {title}
            {subTitle}
        </Col>;

        return (
            <PageLayout bodyClassName={window.classnames(cls.body)}>
                <Col className={window.classnames(cls.introContainer)}>
                    <Paragraph className={window.classnames(cls.category)}>
                        {this.state.product.ProductCategoryName}
                    </Paragraph>
                    <Row>
                        {isMobileOnly &&
                            <Col className={window.classnames(cls.intro)}>
                                {title}
                            </Col>
                        }

                        <Col className={window.classnames(cls.imageContainer)}>
                            < Gallery
                                thumbnailPosition={!isMobile ? "left" : "bottom"}
                                images={Array.isArray(this.state.product.ProductImages)
                                    ? this.state.product.ProductImages
                                    : [this.state.product.ProductImages]
                                }
                            />

                            <FacebookShareButton
                                url={window.location.href}
                                className={window.classnames(cls.fbWraper)}
                            >
                                <div className={window.classnames(cls.fbContainer)}>
                                    Chia sẻ
                                </div>
                            </FacebookShareButton>
                        </Col>
                        {isMobileOnly &&
                            <Col className={window.classnames(cls.intro)}>
                                {subTitle}
                            </Col>
                        }
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