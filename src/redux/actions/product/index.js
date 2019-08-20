import types from "./types";
import { STATUS } from 'app-constants';

export const queryExecutor = (url, whereClause, pageNumber, rowsPerPage, setStatus, callbackSuccess) => {
    return dispatch => {
        let body = {
            entityName: 'Product',
            where: whereClause,
            order: 'LastModified desc',
            pageNumber,
            rowsPerPage
        }

        dispatch(setStatus(STATUS.loading));
        window.get(url, body).then(
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

export const searchProduct = (url, whereClause, indexPage, rowsPerPage, callbackSuccess) => {
    return dispatch => {
        dispatch(queryExecutor(url, whereClause, indexPage, rowsPerPage, setSearchStatus, callbackSuccess));
    }

}

export const showMoreProduct = (url, whereClause, indexPage, rowsPerPage, callbackSuccess) => {
    return dispatch => {
        dispatch(queryExecutor(url, whereClause, indexPage, rowsPerPage, setShowMoreStatus, callbackSuccess));
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