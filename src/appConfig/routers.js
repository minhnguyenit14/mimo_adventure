import React from 'react';

// routers
import {
    Switch,
    Route
} from 'react-router-dom';

// containers
import {
    Home,
    Product,
    ProductDetail,
    AboutUs,
    Contact,
    Blog,
    NotFound,
    BlogDetail
} from 'app-containers';

// constants
import { PATH } from 'app-constants';

const Routers = () => {
    return (
        <Switch>
            <Route exact path={PATH.HOME} component={Home} />
            <Route path={[`${PATH.LIST_PRODUCTS}/:menuPath`, PATH.LIST_PRODUCTS]} component={Product} />
            <Route exact path={`${PATH.PRODUCT}/:productID`} component={ProductDetail} />
            <Route exact path={PATH.BLOG} component={Blog} />
            <Route exact path={`${PATH.BLOG}/:blogID`} component={BlogDetail} />
            <Route exact path={PATH.ABOUT_US} component={AboutUs} />
            <Route exact path={PATH.CONTACT} component={Contact} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routers;