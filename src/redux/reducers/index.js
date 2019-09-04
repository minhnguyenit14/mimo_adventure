import { combineReducers } from 'redux';
import product from './product';
import menu from './menu';
import search from './search';

export default combineReducers({
    product,
    menu,
    search
})