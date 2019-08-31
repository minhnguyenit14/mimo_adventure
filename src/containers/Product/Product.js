import React, { Component } from 'react';
import { Row, Col, Menu, Heading, Card } from 'app-commons';
import cls from './styles.module.scss';
import { PATH, QUERY, GET_PAGING_PRODUCT } from 'app-constants';
import {
    getStorage,
    willUpdateState,
    createWhereClauseCondition,
    prepareWhereClauseGroup,
    addUrlToImages,
    toMoneyFormat,
} from 'app-helpers';
import { ADMIN_URL_KEY, PRODUCT_THUMBNAIL_PATH_KEY } from 'app-config/network';
import { connect } from "react-redux";
import { getProducts, showMoreProduct, setProducts } from 'app-redux/actions/product';
import { setSelectedMenuKeys } from 'app-redux/actions/menu';
import { withRouter } from 'react-router-dom';

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
        products: [],
        openKeys: []
    };
    getProductCategoriesInterval = null;
    unmounted = false;
    gotProducts = false;

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.menuRedux.selectedMenuKeys, this.props.menuRedux.selectedMenuKeys)
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
        console.log('didmount');
    }

    componentWillUnmount() {
        this.unmounted = true;
        clearInterval(this.getProductCategoriesInterval);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('product')
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
                    this.setState({
                        productCategories: cache.productCategories
                    });
                    this.getDefaultOpenMenuKeys(this.props.menuRedux);
                },
                this.unmounted
            )
            clearInterval(this.getProductCategoriesInterval);
        }
    }

    getProducts(whereClause = "") {
        console.log()
        this.props.getProducts(GET_PAGING_PRODUCT, whereClause, 0, ROWS_PER_PAGE,
            (res) => {
                let products = addUrlToImages(
                    JSON.parse(JSON.parse(res.data).data),
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_THUMBNAIL_PATH_KEY]}`,
                    ['ProductThumbnail', 'ProductImages']
                );
                products.forEach(product =>
                    product.ProductPrice = toMoneyFormat(product.ProductPrice)
                );
                willUpdateState(
                    () => this.setState({ products })
                    , this.unmounted
                );
                this.props.setProducts(products);
            }
        )
    }

    hanldeMenuClick(item) {
        this.props.setSelectedMenuKeys([item.key]);
        this.props.history.push(`${PATH.LIST_PRODUCTS}/${item.seoTitle}`);
    }

    onProductClick = (id) => {
        this.props.history.push(`${PATH.PRODUCT}/${id}`);
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

    render() {
        const { openKeys, productCategories, products } = this.state;
        const {
            selectedMenuKeys,
            smartPath
        } = this.props.menuRedux;
        const shortcut = this.getShortCut(selectedMenuKeys, smartPath);
        return (
            <>
                <Row className={window.classnames(cls.bodyContainer)}>
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
                        <Row className={window.classnames(cls.cardContainer)}>
                            {products.map(product => <Card
                                className={window.classnames(cls.card)}
                                contentClassName={window.classnames(cls.cardContent)}
                                title={product.ProductName}
                                src={product.ProductThumbnail}
                                subTitle={product.ProductCategoryName}
                                description={`${product.ProductPrice} ₫`}
                                key={product.ProductID}
                                id={product.ProductID}
                                onClick={this.onProductClick}
                            />)}
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}

export default withRouter(connector(Product));