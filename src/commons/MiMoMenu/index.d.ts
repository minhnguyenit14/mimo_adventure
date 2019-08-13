import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MenuProps } from 'antd/lib/menu';

export declare type MiMoMenuProps = {
    containerClassName?: String;
    onCollapseMenu?: Function;
    refToggleButton?: React.Ref;
    menu?: Array;
} & MenuProps;

declare class MiMoMenu extends React.Component<MiMoMenuProps, any> {
    static defaultProps: {
        containerClassName: String;
        onCollapseMenu: Function;
        refToggleButton: React.Ref;
        menu: Array;
    };
    static propTypes: {
        containerClassName: PropTypes.Requireable<String>;
        onCollapseMenu: PropTypes.Requireable<Function>;
        refToggleButton: PropTypes.Requireable<React.Ref>;
        menu: PropTypes.Requireable<Array>;
    };
    hanldeMenuClick(): any;
    renderMenuChildren(): any;
    renderMenu(): any;
    render(): JSX.Element;
}

export default MiMoMenu;