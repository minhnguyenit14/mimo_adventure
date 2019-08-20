import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HeaderProps } from './Header';
import { BodyProps } from './Body';
import { FooterProps } from './Footer';

export declare type MiMoPageLayoutProps = {
    bodyClassName?: String;
} & HeaderProps & BodyProps & FooterProps;

declare class MiMoPageLayout extends React.Component<MiMoPageLayoutProps, any> {
    static defaultProps: {
        bodyClassName: String;
    }
    static propTypes: {
        bodyClassName: React.Requireable<String>;
    }
    render(): JSX.Element;
}

export default MiMoPageLayout;