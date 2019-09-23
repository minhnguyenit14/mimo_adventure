import React, { Component } from 'react';
import { PageLayout, Image } from 'app-commons';
import cls from './styles.module.scss';
import { GET_HOME_BANNER } from 'app-constants';
import {
    getStorage,
    setStorage,
    willUpdateState,
    addUrlToImages,
    scrollToBody
} from 'app-helpers';
import { BANNER_PATH_KEY, ADMIN_URL_KEY } from 'app-config/network';
import { default as ProductComp } from './Product';


class Product extends Component {
    state = {
        slidesData: []
    };
    unmounted = false;
    refProduct = React.createRef();

    componentDidMount() {
        scrollToBody();
        
        let cache = getStorage();
        if (cache.productBanner && cache.productBanner.length !== 0) {
            willUpdateState(
                () => this.setState({
                    slidesData: this.createSlidesData(cache.productBanner)
                })
                , this.unmounted
            )
        }
        this.getBanner().then(
            banners => {
                cache = getStorage();
                const slidesData = this.createSlidesData(banners);
                willUpdateState(
                    () => {
                        if (slidesData !== this.state.slidesData) {
                            this.setState({ slidesData })
                        }
                    }
                    , this.unmounted
                )
                setStorage({
                    ...cache,
                    productBanner: banners
                })
            }
        );
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    createSlidesData(banners) {
        return banners.map(banner => <div
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

    render() {
        return (
            <PageLayout
                slidesData={this.state.slidesData}
                bodyClassName={window.classnames(cls.productBody)}
            >
                <div ref={this.refProduct}>
                    <ProductComp />
                </div>
            </PageLayout>
        );
    }
}

export default Product;