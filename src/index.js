import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

// redux store
import configureStore from 'app-config/configureStore';

// libraries
import 'app-config/global';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'app-config/routers';

// components
import { PageContainer } from 'app-commons';

// styles
import "antd/dist/antd.css";
import cls from 'app-config/App.module.scss';


function noop() { }

if (process.env.NODE_ENV !== 'development') {
    // console.log = noop;
    console.warn = noop;
    // console.error = noop;
    // console.group = noop;
    // console.info = noop;
}

const store = configureStore();

const Root = ({ store }) => (
    // isMobileOnly ?
    //     <MobileRedirect />
    //     :
    <Provider store={store}>
        <PageContainer>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </PageContainer>
    </Provider>
)
// );

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
