import types from "./types";

export const setSearchValue = (searchValue) => ({
    type: types.SET_SEARCH_VALUE,
    searchValue
})