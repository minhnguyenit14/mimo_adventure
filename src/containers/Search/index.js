import React, { Component } from 'react';
import { PageLayout, Container, Heading } from 'app-commons';
import { POST_SEARCH_PRODUCT, POST_SEARCH_ARTICLE } from 'constants/api';
import { STATUS } from 'app-constants';
import ListProduct from '../Product/ListProduct';
import {
    willUpdateState,
    addUrlToImages,
    toMoneyFormat,
} from 'app-helpers';
import { ADMIN_URL_KEY, PRODUCT_THUMBNAIL_PATH_KEY, BLOG_THUMBNAIL_PATH_KEY } from 'app-config/network';
import { setSearchValue } from 'app-redux/actions/search';
import { connect } from 'react-redux';
import ListBlog from '../Blog/ListBlog';
import cls from './styles.module.scss';

const ROWS_PER_PAGE = 10;

const connector = connect(
    null,
    dispatch => ({
        setSearchValue: (searchValue) =>
            dispatch(setSearchValue(searchValue))
    })
)

class Search extends Component {
    state = {
        products: [],
        totalProducts: 0,
        blogs: [],
        totalBlogs: 0,
        searchProductStatus: STATUS.default,
        showMoreProductStatus: STATUS.default,
        searchBlogStatus: STATUS.default,
        showMoreBlogStatus: STATUS.default,
    };
    page = 0;
    unmounted = false;

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }

        if (nextProps.match.params !== this.props.match.params) {
            let { searchValue } = nextProps.match.params;
            this.props.setSearchValue(searchValue);
            this.searchProduct(searchValue);
            this.searchBlog(searchValue);
            return false;
        }
        return false;
    }

    componentDidMount() {
        let { searchValue } = this.props.match.params;
        this.props.setSearchValue(searchValue);
        this.searchProduct(searchValue);
        this.searchBlog(searchValue);
    }

    componentWillUnmount() {
        this.props.setSearchValue("");
        this.unmounted = true;
    }

    searchProduct(searchValue) {
        const body = {
            where: searchValue,
            page: this.page,
            rows: ROWS_PER_PAGE
        }
        this.setState({
            searchProductStatus: STATUS.loading
        })
        window.post(POST_SEARCH_PRODUCT, body).then(
            res => {
                const productData = JSON.parse(res.data);
                let products = productData.data;
                const totalProducts = productData.totalRecords;
                products = addUrlToImages(
                    products,
                    `${res[ADMIN_URL_KEY]}${res[PRODUCT_THUMBNAIL_PATH_KEY]}`,
                    'ProductThumbnail'
                );

                products.forEach(product =>
                    product.ProductPrice = toMoneyFormat(product.ProductPrice)
                );

                willUpdateState(
                    () => {
                        this.setState({
                            products,
                            totalProducts,
                            searchProductStatus: STATUS.success
                        })
                    },
                    this.unmounted
                );
            }
        ).catch(
            err => {
                console.log('searchProduct', err);
                this.setState({
                    searchProductStatus: STATUS.error
                })
            }
        )
    }

    searchBlog(searchValue) {
        const body = {
            where: searchValue,
            page: this.page,
            rows: ROWS_PER_PAGE
        }
        this.setState({
            loadingSearchBlog: STATUS.loading
        })
        window.post(POST_SEARCH_ARTICLE, body).then(
            res => {
                const blogData = JSON.parse(res.data);
                let blogs = blogData.data;
                const totalBlogs = blogData.totalRecords;
                blogs = addUrlToImages(
                    blogs,
                    `${res[ADMIN_URL_KEY]}${res[BLOG_THUMBNAIL_PATH_KEY]}`,
                    'ArticleImages'
                );

                willUpdateState(
                    () => this.setState({
                        blogs,
                        totalBlogs,
                        loadingSearchBlog: STATUS.success
                    }),
                    this.unmounted
                )
            }
        ).catch(
            err => {
                console.log('searchBlog', err);
                this.setState({
                    loadingSearchBlog: STATUS.error
                })
            }
        )
    }

    render() {
        return (
            <PageLayout
            >
                <Container className={window.classnames(cls.productsContainer)}>
                    <Heading type={2} className={window.classnames(cls.dot, cls.productTitle)}>
                        Sản phẩm
                    </Heading>
                    <ListProduct
                        products={this.state.products}
                        searchStatus={this.state.searchProductStatus}
                        showMoreStatus={this.state.showMoreProductStatus}
                    />
                </Container>

                <Container className={window.classnames(cls.blogsContainer)}>
                    <Heading type={2} className={window.classnames(cls.dot)}>
                        Blog
                    </Heading>
                    <ListBlog
                        blogs={this.state.blogs}
                        searchStatus={this.state.searchBlogStatus}
                        showMoreStatus={this.state.showMoreBlogStatus}
                    />
                </Container>
            </PageLayout>
        );
    }
}

export default connector(Search);