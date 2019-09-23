
import {
    LS_KEY
} from 'app-config/network';

let ls = null;
if (typeof window !== 'undefined') {
    const secureLs = require('secure-ls');
    ls = new secureLs();
}

export const getStorage = () => {
    if (typeof window !== 'undefined') {
        return ls.get(LS_KEY);
    }
    return {};
}

export const setStorage = (value) => {
    if (typeof window !== 'undefined') {
        return ls.set(LS_KEY, value);
    }
    return false;
}

export const removeStorage = () => {
    if (typeof window !== 'undefined') {
        return ls.remove(LS_KEY);
    }
    return false;
}