import types from "./types";

export const setSmartPath = (smartPath) => ({
    type: types.SET_SMART_PATH,
    smartPath
})

export const setSelectedMenuKeys = (selectedMenuKeys) => ({
    type: types.SET_SELECTED_MENU_KEYS,
    selectedMenuKeys
})