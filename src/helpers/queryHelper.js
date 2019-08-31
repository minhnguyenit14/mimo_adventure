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
