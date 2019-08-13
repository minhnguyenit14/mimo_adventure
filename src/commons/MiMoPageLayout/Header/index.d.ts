import * as React from 'react';
import * as PropTypes from 'prop-types';

export declare type HeaderProps = {
    slidesData?: Array
} & React.AnchorHTMLAttributes<any>;

declare class Header extends React.Component<HeaderProps, any> {
    static defaultProps: {
        slidesData: Array
    }
    static propTypes: {
        slidesData: Array
    }
    render(): JSX.Element;
}

export default Header;