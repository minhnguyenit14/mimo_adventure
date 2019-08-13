import React, { PureComponent, Fragment } from 'react';
import { Container, Menu, Row, Image, Button, Input, Slider } from 'app-commons';
import cls from './styles.module.scss';
import { withRouter } from 'react-router-dom';
import { isMobileOnly, isTablet } from 'react-device-detect';
import styles from 'app-config/app_vars.scss';
import { FaAlignJustify, FaSearch } from 'react-icons/fa';
import { PATH } from 'app-constants';

const smallDevice = parseInt(styles.smallDevice);

class Header extends PureComponent {

    toggleMenuBtn = null;
    searchBarMobile = null;
    toggleSearchBarBtn = null
    state = {
        inlineCollapsed: this.initIsCollapsable,
        isMenuCollapsable: this.initIsCollapsable,
        selectedMenuKey: "0",
        showSearchBar: false,
        searchValue: ''
    };

    get initIsCollapsable() {
        return isMobileOnly || window.innerWidth < smallDevice;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mousedown', this.checkClickOutSide);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousedown', this.checkClickOutSide);
    }

    checkClickOutSide = (e) => {
        if (this.searchBarMobile &&
            !this.searchBarMobile.contains(e.target) &&
            this.toggleSearchBarBtn &&
            !this.toggleSearchBarBtn.contains(e.target) &&
            this.state.isMenuCollapsable) {
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

    hanldeMenuClick = (e) => {
        this.setState({ selectedMenuKey: e });
        switch (e) {
            case "-1":
                this.props.history.push(PATH.HOME);
                break;
            case "-2":
                this.props.history.push(PATH.PRODUCT);
                break;
            case "-3":
                this.props.history.push(PATH.ABOUT_US);
                break;
            case "-4":
                this.props.history.push(PATH.CONTACT);
                break;
            default:
                this.props.history.push(PATH.PRODUCT);
                break;
        }
    }

    openMenu = () => this.setState({ inlineCollapsed: false })

    collapseMenu = () => this.setState({ inlineCollapsed: true });

    showSearchBar = () => this.setState((prevState, props) => { return { showSearchBar: !prevState.showSearchBar } });

    onChangeSearch = (searchValue) => {
        this.setState({ searchValue })
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
        const { children, slidesData, ...headerProps } = this.props;
        const {
            selectedMenuKey,
            isMenuCollapsable,
            inlineCollapsed
        } = this.state;
        const collapseMenuButton = this.renderCollapseButton();
        const menu = <Menu
            onCollapseMenu={this.collapseMenu.bind(this)}
            refToggleButton={this.toggleMenuBtn}
            containerClassName={window.classnames(cls.menuContainer)}
            className={window.classnames(cls.menu)}
            selectedKeys={[selectedMenuKey]}
            onClick={this.hanldeMenuClick.bind(this)}
            isMenuCollapsable={isMenuCollapsable}
            inlineCollapsed={inlineCollapsed}
        />;
        const image = <Image
            containerClassName={window.classnames(cls.imgContainer)}
            onClick={() => this.props.history.replace(PATH.HOME)}
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
                        value={this.state.searchValue}
                        onChange={this.onChangeSearch} />}
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
                                value={this.state.searchValue}
                                onChange={this.onChangeSearch}
                            />
                        </div>
                    }
                    <Row className={window.classnames(cls.headerContainer)} {...headerProps}>
                        {!isMenuCollapsable && image}
                        {!isMenuCollapsable ? menu : collapseMenuButton}
                        {isMenuCollapsable && image}
                        {searchBar}
                    </Row>
                    {isMenuCollapsable && menu}
                </Container >
                {slidesData.length !== 0 && <div className={window.classnames(cls.slider)}>
                    <Slider data={slidesData} />
                </div>}
            </Fragment>
        );
    }
}

export default withRouter(Header);