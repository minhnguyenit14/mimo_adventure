import * as React from 'react';
import * as PropTypes from 'prop-types';
import { InputProps, SearchProps } from 'antd/lib/input';

export declare type MiMoInputProps = {
    search?: boolean;
} & InputProps & SearchProps;

declare class MiMoInput extends React.Component<MiMoInputProps, any> {
    static defaultProps: {
        search: boolean;
    };
    static propTypes: {
        search: PropTypes.Requireable<Boolean>;
    };
    onChange(): any;
    render(): JSX.Element;
}

export default MiMoInput;