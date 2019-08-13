import * as React from 'react';
import * as PropTypes from 'prop-types';

export declare type MiMoContainerProps = {
    contentCenter?: Boolean;
    callBackRef?: Function;
} &React.AnchorHTMLAttributes<any>;

declare class MiMoContainer extends React.Component<MiMoContainerProps, any> {
    static defaultProps: {
        contentCenter: Boolean;
        callBackRef: Function;
    }
    static propTypes: {
        contentCenter: React.Requireable<Boolean>;
        callBackRef: React.Requireable<Function>;
    }
    render(): JSX.Element;
}

export default MiMoContainer;