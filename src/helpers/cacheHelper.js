
import secureLs from "secure-ls";
import {
    LS_KEY
} from 'app-config/network';

const ls = new secureLs();


export const getStorage = () => {
    return ls.get(LS_KEY);
}

export const setStorage = (value) => {
    return ls.set(LS_KEY, value);
}

export const removeStorage = () => {
    return ls.remove(LS_KEY);
}