import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import { Row, Card, Loading, Container, Button, Caption } from 'app-commons';
import { withRouter } from 'react-router-dom';
import { PATH, STATUS } from 'app-constants';
import { correctSEOTitle } from 'app-helpers';

class ListProduct extends PureComponent {
    state = {};

    onProductClick = (seoTitle, id) => {
        this.props.history.push(`${PATH.PRODUCT}/${correctSEOTitle(seoTitle)}_${id}`);
    }

    render() {
        const { products, searchStatus, showMoreStatus, showMore, isShowMore, gridClassName } = this.props;
        const loadingSearch = searchStatus === STATUS.loading;
        const loadingShowMore = showMoreStatus === STATUS.loading;
        return (
            <>
                {loadingSearch
                    && (
                        <Container>
                            <Loading />
                        </Container>
                    )
                }
                <Row className={window.classnames(cls.cardContainer, gridClassName)}>
                    {!loadingSearch && products.length !== 0
                        && products.map(product => <Card
                            className={window.classnames(cls.card)}
                            contentClassName={window.classnames(cls.cardContent)}
                            title={product.ProductName}
                            src={product.ProductThumbnail}
                            subTitle={product.ProductCategoryName}
                            description={`${product.ProductPrice} ₫`}
                            key={product.ProductID}
                            id={product.ProductID}
                            onClick={(id) => this.onProductClick(product.ProductSEOTitle, id)}
                        />)
                    }
                </Row>

                {!loadingSearch && products.length === 0 &&
                    <Caption style={{
                        display: 'block',
                        margin: 'auto',
                        textAlign: 'center'
                    }}>
                        Không tìm thấy sản phẩm nào.
                        </Caption>
                }

                {isShowMore && !loadingSearch && <Button
                    loading={loadingShowMore}
                    onClick={showMore}
                    className={window.classnames(cls.btnShowMore,
                        loadingShowMore && cls.btnLoading)}
                    title={"Xem thêm"} />
                }
            </>
        );
    }
}

ListProduct.defaulProps = {
    onProductClick: () => { },
    products: [],
    searchStatus: STATUS.default,
    showMoreStatus: STATUS.default,
    showMore: () => { },
    isShowMore: false
}

export default withRouter(ListProduct);