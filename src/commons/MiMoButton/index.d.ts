import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ButtonProps } from 'antd/lib/button';

export declare type MiMoButtonProps = {
    titleClassName?: String;
} & ButtonProps;

declare class MiMoButton extends React.Component<MiMoButtonProps, any> {
    static defaultProps: {
        titleClassName: String;
    }
    static propTypes: {
        titleClassName: PropTypes.Requireable<String>;
    }
    handleClick(): any;
    render(): JSX.Element;
}

export default MiMoButton;