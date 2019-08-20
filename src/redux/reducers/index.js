import { combineReducers } from 'redux';
import product from './product';
import menu from './menu';

export default combineReducers({
    product,
    menu
})