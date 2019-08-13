import * as React from 'react';
import * as PropTypes from 'prop-types';

declare const HeadingTypes: [1, 2, 3];
export declare type HeadingType = (typeof HeadingTypes)[number];
export declare type MiMoHeadingProps = {
    type?: HeadingType,
    center?: Boolean
} & Omit<React.AnchorHTMLAttributes<any>, 'type'>;

declare class MiMoHeading extends React.Component<MiMoHeadingProps, any> {
    static defaultProps: {
        type: HeadingType,
        center: Boolean
    }
    static propTypes: {
        type: PropTypes.Requireable<1 | 2 | 3>,
        center: PropTypes.Requireable<Boolean>
    }
    render(): JSX.Element;
}

export default MiMoHeading;