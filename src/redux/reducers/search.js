import types from 'app-redux/actions/search/types';

const initState = {
    searchValue: ""
}

const search = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.searchValue,
            }
        default:
            return state
    }
}

export default search