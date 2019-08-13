import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducersEnhancer from 'app-redux/enhancers/monitorReducer'
import loggerMiddleware from 'app-redux/middleware/logger'
import rootReducer from 'app-redux/reducers'

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancers
    )

    return store
}