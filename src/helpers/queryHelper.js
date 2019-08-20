export const createWhereClauseCondition = (name, value, operator, tableAlias) => {
    return {
        ConditionName: name,
        ConditionValue: value,
        ConditionOperation: operator,
        TableAlias: tableAlias
    };
}

export const prepareWhereClauseGroup = (params) => {
    params.forEach(p => {
        p.Conditions = JSON.stringify(p.Conditions);
    });
    return JSON.stringify(params);
}

export const createPostQueryUrl = (url, body) => {
    Object.keys(body).forEach((key, index) => {
        const operator = index === 0 ? '?' : '&';
        url += `${operator}${key}=${body[key]}`;
    })
    return url.replace(/ /g, '_');
}
