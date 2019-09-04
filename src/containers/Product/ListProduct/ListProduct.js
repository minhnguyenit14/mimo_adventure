import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import { Row, Card } from 'app-commons';
import { withRouter } from 'react-router-dom';
import { PATH } from 'app-constants';

class ListProduct extends PureComponent {
    state = {};

    onProductClick = (seoTitle, id) => {
        this.props.history.push(`${PATH.PRODUCT}/${seoTitle}_${id}`);
    }

    render() {
        const { products } = this.props;
        return (
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
                    onClick={(id) => this.onProductClick(product.ProductSEOTitle, id)}
                />)}
            </Row>
        );
    }
}

ListProduct.defaulProps = {
    onProductClick: () => { },
    products: []
}

export default withRouter(ListProduct);