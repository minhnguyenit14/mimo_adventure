import React, { Component, Fragment } from 'react';
import { Container, Menu, Row, Image, Button, Input, Slider } from 'app-commons';
import cls from './styles.module.scss';
import { withRouter } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import styles from 'app-config/app_vars.scss';
import { FaAlignJustify, FaSearch } from 'react-icons/fa';
import { MENU, PATH, GET_ALL_PRODUCT_CATEGORIES, MENU_PRODUCT_ID, MENU_HOME_ID, MENU_ABOUT_US_ID, MENU_CONTACT_ID, MENU_BLOG_ID } from 'app-constants';
import { getStorage, setStorage, formatMenuFromApi, willUpdateState, getSelectedKey, scrollToBody } from 'app-helpers';
import { connect } from 'react-redux';
import { setSelectedMenuKeys, setSmartPath } from 'app-redux/actions/menu';
import { setSearchValue } from 'app-redux/actions/search';
import qs from 'querystring';

const smallDevice = parseInt(styles.smallDevice);
const connector = connect(
    state => ({
        menu: state.menu,
        search: state.search
    }),
    dispatch => ({
        setSelectedMenuKeys: (selectedMenuKeys) =>
            dispatch(setSelectedMenuKeys(selectedMenuKeys)),
        setSmartPath: (smartPath) =>
            dispatch(setSmartPath(smartPath)),
        setSearchValue: (searchValue) =>
            dispatch(setSearchValue(searchValue))
    })
)

class Header extends Component {

    state = {
        inlineCollapsed: this.initIsCollapsable,
        isMenuCollapsable: this.initIsCollapsable,
        showSearchBar: false,
        searchValue: '',
        menu: []
    };
    toggleMenuBtn = null;
    searchBarMobile = null;
    toggleSearchBarBtn = null;
    unmounted = false;

    get initIsCollapsable() {
        return isMobileOnly || window.innerWidth < smallDevice;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mousedown', this.checkClickOutSide);
        let cache = getStorage();
        const menu = MENU;

        if (cache.productCategories && cache.productCategories.length !== 0) {
            this.updateProductCategoriesOfMenu(menu, cache.productCategories);
            this.setState({ menu })
        }
        if (cache.smartPath && cache.smartPath !== 0) {
            this.props.setSmartPath(cache.smartPath);
            this.determineSelectedMenuKeys(menu, this.props);
        }

        this.getProductCategories().then(
            productCategories => {
                cache = getStorage();
                const {
                    formattedMenu: formattedProductCategories,
                    smartPath
                } = formatMenuFromApi([...productCategories]);
                this.updateProductCategoriesOfMenu(menu, formattedProductCategories);
                willUpdateState(
                    () => {
                        if (menu !== this.state.menu) {
                            this.setState({ menu });
                            this.props.setSmartPath(smartPath);
                            this.determineSelectedMenuKeys(menu, this.props);
                        }
                    }
                    , this.unmounted
                )
                setStorage({
                    ...cache,
                    productCategories: formattedProductCategories,
                    smartPath
                })
            }
        );
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousedown', this.checkClickOutSide);

        this.unmounted = true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        }
        if (nextProps.match.params.menuPath !== this.props.match.params.menuPath) {
            this.determineSelectedMenuKeys(nextState.menu, nextProps);
            return false;
        }
        if (nextProps.search !== this.props.search) {
            return true
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('header')
    }

    determineSelectedMenuKeys(menu, props) {
        let { menuPath } = props.match.params;
        let selectedKey = "";

        if (menuPath) {
            menuPath = Object.keys(qs.parse(menuPath))[0];
            selectedKey = getSelectedKey(menu, menuPath);
        }

        if (!selectedKey) {
            let { pathname } = props.location;
            if (pathname.includes(PATH.PRODUCT)) {
                selectedKey = MENU[1].key
            }
        }

        if (!selectedKey) {
            let { pathname } = props.location;
            menu.forEach(item => {
                if (pathname.includes(item.seoTitle)) {
                    if (item.seoTitle === MENU[0].seoTitle) {
                        if (pathname === item.seoTitle) {
                            selectedKey = item.key;
                        } else {
                            selectedKey = null;
                            props.setSelectedMenuKeys([""]);
                        }
                    } else {
                        selectedKey = item.key
                    }
                }
            })
        }

        if (selectedKey) {
            props.setSelectedMenuKeys([selectedKey]);
        }
    }

    updateProductCategoriesOfMenu = (menu, productCategories) => {
        menu.forEach(item => {
            if (item.key === MENU_PRODUCT_ID) {
                item.children = productCategories;
            }
        })
    }

    getProductCategories() {
        return window.get(GET_ALL_PRODUCT_CATEGORIES).then(
            res => {
                return JSON.parse(res.data);
            }
        ).catch(
            err => {
                alert('Có lỗi xảy ra! [PRODUCT_CATEGORY]')
                console.log('getProductCategories', err)
            }
        )
    }

    checkClickOutSide = (e) => {
        if (this.searchBarMobile &&
            !this.searchBarMobile.contains(e.target) &&
            this.toggleSearchBarBtn &&
            !this.toggleSearchBarBtn.contains(e.target) &&
            this.state.isMenuCollapsable &&
            this.state.showSearchBar) {
            this.setState({ showSearchBar: false })
        }
    }

    handleResize = (e) => {
        const isMenuCollapsable = isMobileOnly || window.innerWidth < smallDevice;
        this.setState({
            isMenuCollapsable,
            inlineCollapsed: isMenuCollapsable
        })
    }

    toogleMenu = () => {
        this.state.inlineCollapsed ? this.openMenu() : this.collapseMenu();
    }

    hanldeMenuClick = (item) => {
        this.props.setSelectedMenuKeys([item.key]);
        switch (item.key) {
            case MENU_HOME_ID:
                this.props.history.push(PATH.HOME);
                break;
            case MENU_PRODUCT_ID:
                this.props.history.push(PATH.LIST_PRODUCTS);
                scrollToBody(500);
                break;
            case MENU_BLOG_ID:
                this.props.history.push(PATH.BLOG);
                break;
            case MENU_ABOUT_US_ID:
                this.props.history.push(PATH.ABOUT_US);
                break;
            case MENU_CONTACT_ID:
                this.props.history.push(PATH.CONTACT);
                break;
            default:
                this.props.history.push(`${PATH.LIST_PRODUCTS}/${item.seoTitle}`);
                scrollToBody(500);
                break;
        }
    }

    openMenu = () => this.setState({ inlineCollapsed: false })

    collapseMenu = () => this.setState({ inlineCollapsed: true });

    showSearchBar = () => this.setState((prevState, props) => { return { showSearchBar: !prevState.showSearchBar } });

    onChangeSearch = (searchValue) => {
        this.props.setSearchValue(searchValue)
    }

    onSearch = (value) => {
        this.props.history.push(`${PATH.SEARCH}/${value}`)
    }

    renderCollapseButton = () => {
        return this.state.isMenuCollapsable
            ?
            <Container
                contentCenter
                callBackRef={inst => this.toggleMenuBtn = inst}
            >
                <Button
                    className={window.classnames(cls.collapseBtn)}
                    onClick={this.toogleMenu.bind(this)}
                >
                    <FaAlignJustify />
                </Button>
            </Container>
            : null;
    }

    render() {
        const {
            children,
            slidesData,
            menu: reduxMenu,
            search: reduxSearch,
            ...headerProps
        } = this.props;
        const {
            selectedMenuKeys
        } = reduxMenu;
        const {
            isMenuCollapsable,
            inlineCollapsed,
            menu
        } = this.state;
        const {
            searchValue
        } = reduxSearch;
        const collapseMenuButton = this.renderCollapseButton();
        const menuJSX = <Menu
            onCollapseMenu={this.collapseMenu.bind(this)}
            refToggleButton={this.toggleMenuBtn}
            containerClassName={window.classnames(cls.menuContainer)}
            className={window.classnames(cls.menu)}
            selectedKeys={selectedMenuKeys}
            onMenuClick={this.hanldeMenuClick.bind(this)}
            isMenuCollapsable={isMenuCollapsable}
            inlineCollapsed={inlineCollapsed}
            menu={menu}
        />;
        const image = <Image
            containerClassName={window.classnames(cls.imgContainer)}
            onClick={this.hanldeMenuClick.bind(this, { key: MENU_HOME_ID })}
            src={require('app-assets/images/logo/logo.png')}
        />;

        const searchBar =
            <Container
                contentCenter={isMenuCollapsable}
                className={window.classnames(!isMenuCollapsable && cls.searchLaptopContainer)}
            >
                {isMenuCollapsable
                    ? <div
                        className={window.classnames(cls.searchMobileContainer)}
                        ref={inst => this.toggleSearchBarBtn = inst}>
                        <Button
                            onClick={this.showSearchBar.bind(this)}
                            className={window.classnames(cls.searchMobile)}>
                            <FaSearch />
                        </Button>
                    </div>
                    : <Input
                        className={window.classnames(cls.searchLaptop)}
                        search
                        allowClear 
                        value={searchValue}
                        onSearch={this.onSearch}
                        onChange={this.onChangeSearch}
                        placeholder="Tìm kiếm..."
                    />
                }
            </Container>;
        return (
            <Fragment>
                <Container className={window.classnames(cls.headerWrapper)}>
                    {isMenuCollapsable &&
                        <div
                            ref={inst => this.searchBarMobile = inst}
                            className={window.classnames(cls.searchBar,
                                this.state.showSearchBar && cls.showSearchBar
                            )}>
                            <Input
                                search
                                allowClear 
                                value={searchValue}
                                onChange={this.onChangeSearch}
                                onSearch={this.onSearch}
                                placeholder="Tìm kiếm..."
                            />
                        </div>
                    }
                    <div className={window.classnames(cls.headerOuter)}>
                        <Row className={window.classnames(cls.headerContainer)} {...headerProps}>
                            {!isMenuCollapsable && image}
                            {!isMenuCollapsable ? menuJSX : collapseMenuButton}
                            {isMenuCollapsable && image}
                            {searchBar}
                        </Row>
                    </div>
                    {isMenuCollapsable && menuJSX}
                </Container >
                {slidesData.length !== 0 && <div className={window.classnames(cls.slider)}>
                    <div id={'sliderHeader'}>
                        <Slider data={slidesData} />
                    </div>
                </div>}
            </Fragment>
        );
    }
}

export default withRouter(connector(Header));