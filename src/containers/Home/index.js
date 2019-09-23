import React, { Component } from 'react';
import { Image, PageLayout, Row, Card, Heading, Col, Paragraph, Container, Loading } from 'app-commons';
import cls from './styles.module.scss';
import { PATH, GET_HOME_BANNER, GET_PINNED_PRODUCT, MENU } from 'app-constants';
import { ADMIN_URL_KEY, BANNER_PATH_KEY, PRODUCT_THUMBNAIL_PATH_KEY } from 'app-config/network';
import { getStorage, setStorage, willUpdateState, addUrlToImages, correctSEOTitle } from 'app-helpers';
import { connect } from 'react-redux';
import { setSelectedMenuKeys } from 'app-redux/actions/menu';

const connector = connect(
    null,
    dispatch => ({
        setSelectedMenuKeys: (selectedMenuKeys) =>
            dispatch(setSelectedMenuKeys(selectedMenuKeys))
    })
)

class Home extends Component {
    state = {
        pinnedLoading: false,
        slidesData: [],
        pinnedProducts: []
    };
    unmounted = false;

    componentDidMount() {
        let cache = getStorage();
        if (cache.homeBanner && cache.homeBanner.length !== 0) {
            willUpdateState(
                () => this.setState({
                    slidesData: this.createSlidesData(cache.homeBanner)
                }),
                this.unmounted
            )
        }
        this.getBanner().then(
            banners => {
                cache = getStorage();
                const slidesData = this.createSlidesData(banners);
                willUpdateState(
                    () => this.setState({ slidesData }),
                    this.unmounted
                )
                setStorage({
                    ...cache,
                    homeBanner: banners
                })
            }
        );
        this.getPinnedProduct().then(
            pinnedProducts => {
                this.setState({ pinnedProducts })
            }
        );
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    createSlidesData(banners) {
        return banners.map(banner =>
            <div
                key={banner.BannerID}
                className={window.classnames(cls.bannerImageWrapper)}
            >
                <div
                    className={window.classnames(cls.bannerImage)}
                    style={{ backgroundImage: `url(${banner.BannerImage})` }}
                    onClick={() => window.open(banner.BannerLink, '_blank')}
                ></div>
            </div>
        )
    }

    getBanner() {
        return window.get(GET_HOME_BANNER).then(
            res => {
                const banners = addUrlToImages(
                    JSON.parse(res.data),
                    `${res[ADMIN_URL_KEY]}${res[BANNER_PATH_KEY]}`,
                    'BannerImage'
                );
                return banners;
            }
        ).catch(
            err => {
                console.log('getBanner', err);
            }
        )
    }

    getPinnedProduct() {
        this.setState({
            pinnedLoading: true
        })
        return window.get(GET_PINNED_PRODUCT).then(
            res => {
                const pinnedProducts = addUrlToImages(
                    JSON.parse(JSON.parse(res.data).data),
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_THUMBNAIL_PATH_KEY]}`,
                    'ProductThumbnail'
                );
                willUpdateState(
                    () => this.setState({
                        pinnedLoading: false
                    }),
                    this.unmounted
                );
                return pinnedProducts;
            }
        ).catch(
            err => {
                willUpdateState(
                    () => this.setState({
                        pinnedLoading: false
                    }),
                    this.unmounted
                );
                console.log('getBanner', err);
            }
        )
    }

    onProductClick = (seoTitle, id) => {
        this.props.setSelectedMenuKeys([MENU[1].key]);
        this.props.history.push(`${PATH.PRODUCT}/${correctSEOTitle(seoTitle)}_${id}`);
    }

    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
                slidesData={this.state.slidesData}
            >

                <Col className={window.classnames(cls.bodyContainer)}>
                    <div className={window.classnames(cls.bodySize)}>

                        <Heading center className={window.classnames(cls.featuredTitle)}>
                            Sản phẩm nổi bật
                    </Heading>
                        <Row className={window.classnames(cls.cardContainer)}>
                            {this.state.pinnedLoading
                                ? (
                                    <Container>
                                        <Loading />
                                    </Container>
                                )
                                : this.state.pinnedProducts.map(product => <Card
                                    className={window.classnames(cls.card)}
                                    contentClassName={window.classnames(cls.cardContent)}
                                    title={product.ProductName}
                                    src={product.ProductThumbnail}
                                    subTitle={product.ProductCategoryName}
                                    key={product.ProductID}
                                    id={product.ProductID}
                                    onClick={(id) => this.onProductClick(product.ProductSEOTitle, id)}
                                />)}
                        </Row>
                    </div>
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

export default connector(Home);