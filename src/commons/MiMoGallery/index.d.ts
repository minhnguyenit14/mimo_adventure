import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ReactImageGalleryProps } from 'react-image-gallery';

export declare type MiMoGalleryProps = {
} & ReactImageGalleryProps;

declare class MiMoGallery extends React.Component<MiMoGalleryProps, any> {
    static defaultProps: {
    }
    static propTypes: {
    }
    render(): JSX.Element;
}

export default MiMoGallery;