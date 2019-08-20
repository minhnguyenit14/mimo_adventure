import axios from 'axios';
import {
    CONFIG_PATH,
    BACKEND_URL_AKA,
    ADMIN_URL_KEY,
    BANNER_PATH_KEY,
    BLOG_THUMBNAIL_PATH_KEY,
    PRODUCT_PATH_KEY,
    PRODUCT_THUMBNAIL_PATH_KEY
} from 'app-config/network';

export const getConfig = () => {
    return axios.get(CONFIG_PATH).then(
        res => {
            return handleRespond(res)
        }
    ).catch(err => handleRej(err))
}

export const post = (url, body) => {
    return getConfig().then(
        res => {
            let { BACKEND_URL } = res.data;
            url = url.replace(BACKEND_URL_AKA, BACKEND_URL);
            console.log('url', String(url));
            console.log('body', body);
            return axios(url, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json"
                },
                data: JSON.stringify(body)
            }).then(
                res => {
                    return handleRespond(res);
                }
            ).catch(err => {
                return handleRej(err);
            });
        }
    )
}

export const get = (url, params = {}) => {
    return getConfig().then(
        res => {
            let {
                BACKEND_URL,
                ADMIN_URL,
                BANNER_PATH,
                PRODUCT_THUMBNAIL_PATH,
                PRODUCT_PATH,
                BLOG_THUMBNAIL_PATH
            } = res.data;
            url = url.replace(BACKEND_URL_AKA, BACKEND_URL);
            return axios(url, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json"
                },
                params
            }).then(
                res => {
                    res[ADMIN_URL_KEY] = ADMIN_URL;
                    res[BANNER_PATH_KEY] = BANNER_PATH;
                    res[PRODUCT_THUMBNAIL_PATH_KEY] = PRODUCT_THUMBNAIL_PATH;
                    res[PRODUCT_PATH_KEY] = PRODUCT_PATH;
                    res[BLOG_THUMBNAIL_PATH_KEY] = BLOG_THUMBNAIL_PATH;
                    return handleRespond(res);
                }
            ).catch(err => {
                return handleRej(err);
            });
        }
    )
}

const handleRespond = (res, isImg = false) => {
    return new Promise((resolve, reject) => {
        switch (res.status) {
            case 400:
                console.log(res)
                reject()
                break;
            case 401:
                console.log(res)
                reject()
                break;
            case 415:
                console.log(res)
                reject()
                break;
            case 500:
                console.log(res)
                reject()
                break;
            case 200:
                if (isImg) {
                    resolve(res)
                } else {
                    resolve(res)
                }
                break;
            default:
                res.json().then(json => {
                    reject()
                    return json;
                }).catch(err => {
                    reject()
                    return err;
                })

        }
    })
}

const handleRej = (err) => {
    return new Promise((resolve, reject) => {
        // window.location.href = `${PATH.BASE_NAME}${PATH.ERROR_PAGE}?err=${err}`;
        console.log(err);
        reject(err);
        return err.message;
    })
}
