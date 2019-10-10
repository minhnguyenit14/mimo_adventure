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
    refBody = React.createRef();
    cardAnimationTimeOut = null;

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
                pinnedProducts.push(pinnedProducts[0]);
                pinnedProducts.push(pinnedProducts[1]);
                this.setState({ pinnedProducts });
            }
        );
    }

    componentWillUnmount() {
        this.unmounted = true;
        clearTimeout(this.cardAnimationTimeOut);
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

    setUpPosition(e, ref) {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(this.cardAnimationShowOffTimeOut);
        this.cardAnimationShowOffTimeOut = setTimeout(() => {
            if (ref) {
                // if (e.target === e.currentTarget && ref.style.position === "") {
                const parent = ref.parentElement;
                if (parent) {
                    const { width: pW, height: pH } = parent.getBoundingClientRect();
                    parent.style.width = `${pW}px`;
                    parent.style.height = `${pH}px`;
                }
                ref.style.position = 'absolute';
                ref.style.maxHeight = 'inherit';
                ref.style.zIndex = '9';

                const child1 = ref.firstElementChild;
                if (child1) {
                    const child2 = child1.firstElementChild;
                    if (child2) {
                        child2.style.height = `${ref.getBoundingClientRect().height}px`;
                        const child3 = child1.lastElementChild;
                        if (child3 && parent) {
                            ref.style.height = `${parent.getBoundingClientRect().height + child3.getBoundingClientRect().height}px`;
                        }
                    }
                };
                // }
            }
        }, 300);
    }

    removePosition(e, ref) {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(this.cardAnimationShowOffTimeOut);
        if (ref) {
            // if (e.target === e.currentTarget && ref.style.position !== "") {
            ref.style.maxHeight = '';
            ref.style.height = '';
            ref.style.zIndex = '';
            const child1 = ref.firstElementChild;
            let child2 = null;
            if (child1) {
                child2 = child1.firstElementChild;
                child2.style = '';
            };

            this.cardAnimationTimeOut = setTimeout(() => {
                // if (ref.getBoundingClientRect().height === originHeight) {
                const parent = ref.parentElement;
                if (parent) {
                    parent.style = '';
                }

                ref.style = '';
                // }
            }, 200);

            // }
        }
    }

    renderPinnedProduct() {
        const pinnedProducts = [];
        let temp = [];
        let temp2 = [];

        this.state.pinnedProducts.map((product, index) => {
            temp.push(<div
                key={product.ProductID}
                className={window.classnames(cls.cardWrapper)}
            >
                <Card
                    onMouseOver={(e) => { this.setUpPosition(e, e.target) }}
                    onMouseLeave={(e) => { this.removePosition(e, e.target) }}
                    className={[window.classnames(
                        cls.card,
                        (index === 1
                            || index === 2
                            || index === 3
                            || index === 6
                        ) && cls.a
                    ), 'card_wrapper'].join(' ')}
                    contentClassName={window.classnames(cls.cardContent)}
                    title={product.ProductName}
                    src={product.ProductThumbnail}
                    subTitle={product.ProductCategoryName}
                    id={product.ProductID}
                    onClick={(id) => this.onProductClick(product.ProductSEOTitle, id)}
                /></div>)
            switch (index) {
                case 0:
                    temp2.push(<Row className={window.classnames(cls.item1, cls.noPos)} key={index}>
                        {temp}
                    </Row>);
                    temp = [];
                    break;
                case 2:
                    temp2.push(
                        <Row className={window.classnames(cls.item2, cls.noPos)} key={index}>
                            {temp}
                        </Row>
                    );
                    pinnedProducts.push(<Col className={window.classnames(cls.noPos)} key={index}>
                        {temp2}
                    </Col>)
                    temp = [];
                    temp2 = [];
                    break;
                case 4:
                    temp2.push(
                        <Col className={window.classnames(cls.item3, cls.noPos)} key={index}>
                            {temp}
                        </Col>
                    );
                    pinnedProducts.push(temp2)
                    temp = [];
                    temp2 = [];
                    break;
                case 5:
                    temp2.push(<Row className={window.classnames(cls.item4, cls.noPos)} key={index}>
                        {temp}
                    </Row>);
                    temp = [];
                    break;
                case 7:
                    temp2.push(
                        <Row className={window.classnames(cls.item5, cls.noPos)} key={index}>
                            {temp}
                        </Row>
                    );
                    pinnedProducts.push(<Col className={window.classnames(cls.noPos)} key={index}>
                        {temp2}
                    </Col>)
                    temp = [];
                    temp2 = [];
                    break;
            }

        })
        return <Row>{pinnedProducts}</Row>;
    }

    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
                slidesData={this.state.slidesData}
            >

                <Col className={window.classnames(cls.bodyContainer)}>
                    <div ref={this.refBody} className={window.classnames(cls.bodySize)}>

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
                                : this.renderPinnedProduct()}
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