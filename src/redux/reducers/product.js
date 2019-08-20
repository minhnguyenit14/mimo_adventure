import { STATUS } from 'app-constants';
import types from 'app-redux/actions/product/types';

const initState = {
    searchStatus: STATUS.default,
    showMoreStatus: STATUS.default,
    products: []
}

const product = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SEARCH_PRODUCT_STATUS:
            return {
                ...state,
                searchStatus: action.status,
            }
        case types.SET_SHOW_MORE_PRODUCT_STATUS:
            return {
                ...state,
                showMoreStatus: action.status,
            }
        case types.SET_PRODUCT:
            return {
                ...state,
                products: action.products,
            }
        default:
            return state
    }
}

export default product