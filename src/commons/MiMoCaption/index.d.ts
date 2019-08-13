import * as React from 'react';
import * as PropTypes from 'prop-types';

declare const FontStyles: ["normal", "italic", "bold"];
export declare type FontStyle = (typeof FontStyles)[string];
export declare type MiMoCaptionProps = {
    fontStyle?: FontStyle
} & React.AnchorHTMLAttributes<any>;

declare class MiMoCaption extends React.Component<MiMoCaptionProps, any> {
    static defaultProps: {
        fontStyle: FontStyle
    }
    static propTypes: {
        fontStyle: React.Requireable<"normal" | "italic" | "bold">
    }
    render(): JSX.Element;
}

export default MiMoCaption;