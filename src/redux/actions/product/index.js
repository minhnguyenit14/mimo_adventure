import types from "./types";
import { STATUS } from 'app-constants';

export const queryExecutor = (url, whereClause, page, rows, setStatus, callbackSuccess, method) => {
    return dispatch => {
        let body = {
            where: whereClause,
            page,
            rows
        }

        dispatch(setStatus(STATUS.loading));
        window[method](url, body).then(
            res => {
                if (res.data.Error) {
                    dispatch(setStatus(STATUS.error))
                }
                else {
                    callbackSuccess(res);
                    dispatch(setStatus(STATUS.success));
                }
            },
            rej => {
                dispatch(setStatus(STATUS.error))
            }
        )
    }
}

export const searchProducts = (url, whereClause, indexPage, rows, callbackSuccess, method = "post") => {
    return dispatch => {
        dispatch(queryExecutor(url, whereClause, indexPage, rows, setSearchStatus, callbackSuccess, method));
    }
}

export const getProducts = (url, whereClause, indexPage, rows, callbackSuccess, method = "post") => {
    return dispatch => {
        dispatch(queryExecutor(url, whereClause, indexPage, rows, setSearchStatus, callbackSuccess, method));
    }
}

export const showMoreProduct = (url, whereClause, indexPage, rows, callbackSuccess, method = "post") => {
    return dispatch => {
        dispatch(queryExecutor(url, whereClause, indexPage, rows, setShowMoreStatus, callbackSuccess, method));
    }
}

export const setProducts = (products) => ({
    type: types.SET_PRODUCTS,
    products
})

export const setSearchStatus = (status) => ({
    type: types.SET_SEARCH_PRODUCT_STATUS,
    status
})

export const setShowMoreStatus = (status) => ({
    type: types.SET_SHOW_MORE_PRODUCT_STATUS,
    status
})