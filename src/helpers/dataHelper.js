export const addUrlToImages = (images, hostUrl, imageKey) => {
    if (Array.isArray(imageKey)) {
        images.forEach(image => {
            imageKey.forEach(key => image[key] = `${hostUrl}/${image[key]}`)

        });
    } else {
        images.forEach(image => image[imageKey] = `${hostUrl}/${image[imageKey]}`);
    }
    return images;
}

export const fromMoneyFormat = (money, separate = ',', replace = '') => {
    if (typeof money !== 'string') {
        return money;
    }
    return Number(money.replace(new RegExp(separate, 'g'), replace));
}

/**
 * @param integer v: value of money
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
export const toMoneyFormat = (v, n, x) => {
    v = fromMoneyFormat(v);
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return v.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
