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
    BlogDetail,
    Search
} from 'app-containers';

// constants
import { PATH } from 'app-constants';

const Routers = () => {
    return (
        <Switch>
            <Route exact path={PATH.HOME} component={Home} />
            <Route path={[`${PATH.LIST_PRODUCTS}/:menuPath`, PATH.LIST_PRODUCTS]} component={Product} />
            <Route exact path={`${PATH.PRODUCT}/:productPath`} component={ProductDetail} />
            <Route exact path={PATH.BLOG} component={Blog} />
            <Route exact path={`${PATH.BLOG}/:blogPath`} component={BlogDetail} />
            <Route exact path={PATH.ABOUT_US} component={AboutUs} />
            <Route exact path={PATH.CONTACT} component={Contact} />
            <Route exact path={PATH.SEARCH} component={Search} />
            <Route exact path={`${PATH.SEARCH}/:searchValue`} component={Search} />
            <Route path={PATH.NOT_FOUND} component={NotFound} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routers;