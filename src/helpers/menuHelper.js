let temp = {};
let smartTemp = [];
let smartPath = [];
let selectedKey = "";

export const formatMenuFromApi = (menu) => {
    const formattedMenu = [];
    menu.forEach(item => {
        if (item.ParentID === 0) {
            temp = {
                key: String(item.ProductCategoryID),
                title: item.ProductCategoryName,
                children: []
            };
            smartTemp = [];
            smartTemp.push({
                key: String(item.ProductCategoryID),
                title: item.ProductCategoryName
            });
            if (item.NumOfChild > 0) {
                recursiveMenu(menu, temp, 1);
            } else {
                smartPath.push(smartTemp);
            }
            formattedMenu.push(temp);
        }
    })
    return { formattedMenu, smartPath };
}

const recursiveMenu = (menu, temp, level) => {
    menu.forEach(item => {
        if (item.ParentID == temp.key) {
            temp.children.push(
                {
                    key: String(item.ProductCategoryID),
                    title: item.ProductCategoryName,
                    children: []
                }
            )
            smartTemp.push({
                key: String(item.ProductCategoryID),
                title: item.ProductCategoryName
            })

            if (item.NumOfChild > 0) {
                this.recursiveMenu(menu, temp, ++level);
            } else {
                smartPath.push([...smartTemp]);
                smartTemp.splice(smartTemp.length - 1, 1);
            }
        }
    })
}

export const getSelectedKey = (menu, selectedMenuName) => {
    selectedKey = "";
    menu.forEach(item => {
        if (selectedKey) return;
        
        if (selectedMenuName.toLowerCase() === item.title.toLowerCase()) {
            selectedKey = item.key;
            return;
        }
        if (item.children.length !== 0) {
            getSelectedKeyRecursive(item.children, selectedMenuName);
        }
    })
    return selectedKey;
}

export const getSelectedKeyRecursive = (menu, selectedMenuName) => {
    menu.forEach(item => {
        if (selectedKey) return;

        if (selectedMenuName.toLowerCase() === item.title.toLowerCase()) {
            selectedKey = item.key;
            return;
        }
        if (item.children.length !== 0) {
            getSelectedKeyRecursive(item.children, selectedMenuName);
        }
    })
}