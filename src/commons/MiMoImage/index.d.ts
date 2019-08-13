import * as React from 'react';
import * as PropTypes from 'prop-types';

export declare type MiMoImageProps = {
    containerClassName?: String;
} & React.ImgHTMLAttributes<any>;

declare class MiMoImage extends React.Component<MiMoImageProps, any> {
    static defaultProps: {
        containerClassName: String;
    };
    static propTypes: {
        containerClassName: PropTypes.Requireable<String>;
    };
    render(): JSX.Element;
}

export default MiMoImage;