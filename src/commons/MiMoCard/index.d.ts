import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MiMoContainerProps } from 'commons/MiMoContainer';

export declare type MiMoCardProps = {
    title?: String,
    subTitle?: String,
    description?: String,
    src?: String,
    contentClassName?: String,
    onClick?: Function,
} & MiMoContainerProps;

declare class MiMoCard extends React.Component<MiMoCardProps, any> {
    static defaultProps: {
        title: String;
        description: String;
        subTitle: String;
        src: String;
        contentClassName: String;
        onClick: Function;
    }
    static propTypes: {
        title: React.Requireable<String>;
        subTitle: React.Requireable<String>;
        description: React.Requireable<String>;
        src: React.Requireable<String>;
        contentClassName: React.Requireable<String>;
        onClick: React.Requireable<Function>;
    }
    render(): JSX.Element;
}

export default MiMoCard;