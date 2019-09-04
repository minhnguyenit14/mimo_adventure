import { BACKEND_URL_AKA } from 'app-config/network';

// ID_AKA
export const ID_AKA = "{id}";

// HOME
export const GET_HOME_BANNER = `${BACKEND_URL_AKA}/home-api/get-banner`;
export const POST_HOME_INCREASE_VIEW = `${BACKEND_URL_AKA}/home-api/increase-view`;
export const GET_HOME_COMPANY_INFO = `${BACKEND_URL_AKA}/home-api/get-company-info`;
export const POST_HOME_INSERT_SEARCH_KEYWORD = `${BACKEND_URL_AKA}/home-api/insert-search-keyword`;

// ARTICLE
export const POST_SEARCH_ARTICLE = `${BACKEND_URL_AKA}/article/search-article`;
export const GET_PAGING_ARTICLE = `${BACKEND_URL_AKA}/article/get-pagging`;
export const GET_DETAIL_ARTICLE = `${BACKEND_URL_AKA}/article/detail/${ID_AKA}`;

// PRODUCT
export const POST_PAGING_PRODUCT = `${BACKEND_URL_AKA}/product/get-pagging`;
export const POST_SEARCH_PRODUCT = `${BACKEND_URL_AKA}/product/search-product`;
export const GET_PINNED_PRODUCT = `${BACKEND_URL_AKA}/product/pinned-product`;
export const GET_DETAIL_PRODUCT = `${BACKEND_URL_AKA}/product/detail/${ID_AKA}`;

// PRODUCT CATEGORY
export const GET_ALL_PRODUCT_CATEGORIES = `${BACKEND_URL_AKA}/product-category/get-all`;