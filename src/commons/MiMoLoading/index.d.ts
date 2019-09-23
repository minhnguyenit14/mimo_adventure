import * as React from 'react';
import * as PropTypes from 'prop-types';

export declare type MiMoLoadingProps = {
    sizeUnit?: String,
    size?: Number,
    color?: String,
    loading?: Boolean
};

declare class MiMoLoading extends React.Component<MiMoLoadingProps, any> {
    static defaultProps: {
        sizeUnit: String,
        size: Number,
        color: String,
        loading: Boolean
    };
    static propTypes: {
        sizeUnit: PropTypes.Requireable<String>,
        size: PropTypes.Requireable<Number>,
        color: PropTypes.Requireable<String>,
        loading: PropTypes.Requireable<Boolean>,
    };
    render(): JSX.Element;
}

export default MiMoLoading;