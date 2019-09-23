import "antd/dist/antd.css";

import React from 'react';
import { render } from 'react-dom';

import * as serviceWorker from './serviceWorker';

// redux store
import configureStore from 'app-config/configureStore';

// libraries
import 'app-config/global';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'app-config/routers';
import smoothscroll from 'smoothscroll-polyfill';

// components
import { PageContainer } from 'app-commons';

// styles
import cls from 'app-config/App.module.scss';

// kick off the polyfill!
smoothscroll.polyfill();

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

const rootElement = document.getElementById("root");
const App = <Root store={store} />
// if (rootElement.hasChildNodes()) {
//     hydrate(App, rootElement);
// } else {
    render(App, rootElement);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
