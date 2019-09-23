import React, { Component } from 'react';
import { Row, Col, Menu, Heading } from 'app-commons';
import cls from './styles.module.scss';
import { PATH, POST_PAGING_PRODUCT, MENU, MENU_PRODUCT_ID } from 'app-constants';
import {
    getStorage,
    willUpdateState,
    addUrlToImages,
    toMoneyFormat,
} from 'app-helpers';
import { ADMIN_URL_KEY, PRODUCT_THUMBNAIL_PATH_KEY } from 'app-config/network';
import { connect } from "react-redux";
import { getProducts, showMoreProduct, setProducts } from 'app-redux/actions/product';
import { setSelectedMenuKeys } from 'app-redux/actions/menu';
import { withRouter } from 'react-router-dom';
import ListProduct from './ListProduct';

const ROWS_PER_PAGE = 10;
const ALL_PRODUCT_SHORCUT = 'Tất cả sản phẩm';

const connector = connect(
    state => {
        return {
            product: state.product,
            menuRedux: state.menu
        }
    },
    dispatch => {
        return {
            setProducts: (products) => {
                dispatch(setProducts(products))
            },
            getProducts: (url, whereClause, indexPage, rowsPerPage, callbackSuccess) => {
                dispatch(getProducts(url, whereClause, indexPage, rowsPerPage, callbackSuccess))
            },
            showMoreProduct: (url, whereClause, indexPage, rowsPerPage, callbackSuccess) => {
                dispatch(showMoreProduct(url, whereClause, indexPage, rowsPerPage, callbackSuccess))
            },
            setSelectedMenuKeys: (selectedMenuKeys) => {
                dispatch(setSelectedMenuKeys(selectedMenuKeys))
            }
        }
    }
);

class Product extends Component {
    state = {
        searchValue: '',
        productCategories: [],
        totalProducts: 0,
        products: [],
        openKeys: []
    };
    getProductCategoriesInterval = null;
    unmounted = false;
    gotProducts = false;
    pageNumber = 0;

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.menuRedux.selectedMenuKeys !== this.props.menuRedux.selectedMenuKeys
            || !this.gotProducts) {
            this.getDefaultOpenMenuKeys(nextProps.menuRedux);

            const productCategoryKey = Number(nextProps.menuRedux.selectedMenuKeys[0]);
            this.getProducts(productCategoryKey || "");
            this.gotProducts = true;
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.getProductCategoriesInterval = setInterval(() => this.getProductCategories(), 200);
        this.getProducts();
    }

    componentWillUnmount() {
        this.unmounted = true;
        clearInterval(this.getProductCategoriesInterval);
    }

    getProductCategories() {
        if (this.unmounted) {
            clearInterval(this.getProductCategoriesInterval);
            return;
        }
        let cache = getStorage();
        if (cache.productCategories && cache.productCategories.length !== 0) {
            willUpdateState(
                () => {
                    let productCategories = [...cache.productCategories]
                    productCategories.unshift({
                        key: MENU_PRODUCT_ID,
                        seoTitle: PATH.LIST_PRODUCTS,
                        title: "Tất cả",
                        children: []
                    });
                    this.setState({
                        productCategories
                    });
                    this.getDefaultOpenMenuKeys(this.props.menuRedux);
                },
                this.unmounted
            )
            clearInterval(this.getProductCategoriesInterval);
        }
    }

    getProducts(whereClause = "", showMore = false) {
        this.props[showMore ? "showMoreProduct" : "getProducts"](POST_PAGING_PRODUCT, whereClause, this.pageNumber, ROWS_PER_PAGE,
            (res) => {
                let ProductData = JSON.parse(res.data);
                let products = addUrlToImages(
                    JSON.parse(ProductData.data),
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_THUMBNAIL_PATH_KEY]}`,
                    ['ProductThumbnail', 'ProductImages']
                );
                products.forEach(product =>
                    product.ProductPrice = toMoneyFormat(product.ProductPrice)
                );

                if (showMore) {
                    products = [...this.state.products.concat(products)];
                }

                willUpdateState(
                    () => this.setState({
                        products,
                        totalProducts: ProductData.totalRecords
                    })
                    , this.unmounted
                );
                this.props.setProducts(products);
            }
        )
    }

    hanldeMenuClick(item) {
        this.props.setSelectedMenuKeys([item.key]);

        if (item.key === MENU_PRODUCT_ID) {
            this.props.history.push(PATH.LIST_PRODUCTS);
        } else {
            this.props.history.push(`${PATH.LIST_PRODUCTS}/${item.seoTitle}`);
        }
    }

    onChangeSearch = (searchValue) => { this.setState({ searchValue }) }

    getDefaultOpenMenuKeys = (menuRedux) => {
        let { selectedMenuKeys, smartPath } = menuRedux;
        let openKeys = [];
        if (smartPath) {
            smartPath.forEach(paths => {
                if (paths.length > 1) {
                    paths.forEach(path => {
                        selectedMenuKeys.forEach(key => {
                            if (path.key === key) {
                                openKeys = paths.map(path => {
                                    return path.key
                                });
                                return;
                            }
                        })
                    });
                }
            })
        }

        willUpdateState(
            () => this.setState({
                openKeys
            }),
            this.unmounted
        )
    }

    getShortCut(selectedMenuKeys, smartPath) {
        if (Array.isArray(smartPath) && smartPath.length !== 0) {
            let shortCut = [];
            smartPath.forEach(paths => {
                paths.forEach((path, index) => {
                    if (path.key === selectedMenuKeys[0]) {
                        shortCut = paths.slice(0, index + 1).map(path => path.title);
                        return;
                    }
                })
            });
            if (shortCut.length !== 0) {
                return shortCut.join(' > ');
            }
        }
        return ALL_PRODUCT_SHORCUT;
    }

    showMore = () => {
        this.pageNumber++;
        this.getProducts(Number(this.props.menuRedux.selectedMenuKeys[0]), true);
    }

    render() {
        const { openKeys, productCategories, products } = this.state;
        const {
            selectedMenuKeys,
            smartPath
        } = this.props.menuRedux;
        const {
            searchStatus,
            showMoreStatus
        } = this.props.product;
        const shortcut = this.getShortCut(selectedMenuKeys, smartPath);
        const isGetFullProducts = this.state.products.length === this.state.totalProducts;

        return (
            <>
                <Row className={window.classnames(cls.container)}>
                    <Col className={window.classnames(cls.filter)}>
                        <Menu
                            menu={productCategories}
                            containerClassName={window.classnames(cls.menuContainer)}
                            className={window.classnames(cls.menu)}
                            mode={'inline'}
                            selectedKeys={selectedMenuKeys}
                            onMenuClick={this.hanldeMenuClick.bind(this)}
                            openKeys={openKeys}
                        />
                    </Col>
                    <Col className={window.classnames(cls.product)}>
                        <Heading type={2} className={window.classnames(cls.productHeading)}>
                            {shortcut}
                        </Heading>
                        <ListProduct
                            searchStatus={searchStatus}
                            showMoreStatus={showMoreStatus}
                            products={products}
                            isShowMore={!isGetFullProducts}
                            showMore={this.showMore}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

export default withRouter(connector(Product));