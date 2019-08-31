import React, { Component } from 'react';
import { Menu } from 'antd';
import { Heading, Container, Row } from 'app-commons';
import cls from './styles.module.scss';
import { MENU } from 'app-constants';

const { SubMenu, Item } = Menu;

const slectedClassName = ' ant-menu-submenu-selected';

class MiMoMenu extends Component {
    menu = null;
    state = {
        openKeys: this.props.openKeys
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        }
        if (nextProps.openKeys && nextProps.openKeys !== this.state.openKeys) {
            this.setState({
                openKeys: nextProps.openKeys
            })
            return false
        }
        return true;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutSide);
        document.addEventListener('touchstart', this.handleClickOutSide);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutSide);
        document.removeEventListener('touchstart', this.handleClickOutSide);
    }

    handleClickOutSide = (e) => {
        if (this.menu &&
            !this.menu.contains(e.target) &&
            this.props.refToggleButton &&
            !this.props.refToggleButton.contains(e.target) &&
            this.props.isMenuCollapsable) {
            this.props.onCollapseMenu();
        }
    }

    hanldeMenuClick = (e, willCollapse = true, isArrow = false) => {
        if (!isArrow) {
            this.props.onClick(e.key);
            this.props.onMenuClick(e);
        };
        this.props.isMenuCollapsable && willCollapse && this.props.onCollapseMenu()
    };

    renderMenuChildren = (menuItem, level = 0) => {
        const heading = <Heading
            type={level === 0 ? 2 : 3}
            className={window.classnames(cls.menuItem)}
            onClick={() => this.hanldeMenuClick(menuItem, true, false)}
        >
            {menuItem.title}
        </Heading>;
        const title = this.props.isMenuCollapsable || this.props.mode === 'inline' ?
            <Row
                className={window.classnames(cls.menuItemRow)}
                onClick={() => this.hanldeMenuClick(menuItem, false, true)}
            >
                {heading}
            </Row>
            : heading;
        return <SubMenu
            key={menuItem.key}
            title={title}
            className={
                menuItem.key === this.props.selectedKeys[0]
                // && level === 0
                && slectedClassName}
        >
            {
                menuItem.children.map(menuItemChildren => {
                    if (menuItemChildren.children.length !== 0) {
                        return this.renderMenuChildren(menuItemChildren, ++level);
                    } else {
                        return <Item
                            key={menuItemChildren.key}
                            onClick={() => this.hanldeMenuClick(menuItemChildren)}
                        >
                            <Heading
                                type={3}
                                className={window.classnames(cls.menuItem)}
                            >
                                {menuItemChildren.title}
                            </Heading>
                        </Item>
                    }
                })
            }
        </SubMenu>
    }

    renderMenu = () => {
        let menu = [];
        this.props.menu.map(menuItem => {
            if (menuItem.children.length !== 0) {
                menu.push(
                    this.renderMenuChildren(menuItem)
                )
            } else {
                menu.push(
                    <Item
                        key={menuItem.key}
                        onClick={() => this.hanldeMenuClick(menuItem)}
                    >
                        <Heading
                            type={2}
                            className={window.classnames(cls.menuItem)}
                        >
                            {menuItem.title}
                        </Heading>
                    </Item>
                )
            }
        })
        return menu;
    }

    handleOpenChange(openKeys) {
        this.setState({
            openKeys
        })
    }

    render() {
        const {
            className,
            isMenuCollapsable,
            inlineCollapsed,
            containerClassName,
            onClick,
            onMenuClick,
            onCollapseMenu,
            refToggleButton,
            mode,
            openKeys,
            ...menuProps
        } = this.props;
        const { openKeys: openKeysState } = this.state;
        const menuMode = mode || (isMenuCollapsable ? "inline" : "horizontal");
        return (
            <Container
                callBackRef={inst => this.menu = inst}
                className={window.classnames(cls.menuContainer,
                    isMenuCollapsable
                        ? cls.menuOnMobile
                        : null,
                    inlineCollapsed
                        ? cls.collapse
                        : null,
                    containerClassName)}>
                <Menu
                    className={window.classnames(menuMode === 'horizontal' && cls.menu, className)}
                    mode={menuMode}
                    onOpenChange={this.handleOpenChange.bind(this)}
                    openKeys={openKeysState}
                    {...menuProps}
                >
                    {this.renderMenu()}
                </Menu>
            </Container>
        );
    }
}

MiMoMenu.defaultProps = {
    selectedKeys: [],
    onMenuClick: () => { },
    onClick: () => { },
    refToggleButton: null,
    menu: MENU
}

export default MiMoMenu;