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
    Contact
} from 'app-containers';

// constants
import { PATH } from 'app-constants';

const Routers = () => {
    return (
        <Switch>
            <Route exact path={PATH.HOME} component={Home} />
            <Route exact path={PATH.PRODUCT} component={Product} />
            <Route exact path={`${PATH.PRODUCT}/:id`} component={ProductDetail} />
            <Route exact path={PATH.ABOUT_US} component={AboutUs} />
            <Route exact path={PATH.CONTACT} component={Contact} />
        </Switch>
    )
}

export default Routers;