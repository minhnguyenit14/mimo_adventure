import types from 'app-redux/actions/menu/types';

const initState = {
    selectedMenuKeys: [],
    smartPath: [],
}

const menu = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SELECTED_MENU_KEYS:
            return {
                ...state,
                selectedMenuKeys: action.selectedMenuKeys,
            }
        case types.SET_SMART_PATH:
            return {
                ...state,
                smartPath: action.smartPath,
            }
        default:
            return state
    }
}

export default menu