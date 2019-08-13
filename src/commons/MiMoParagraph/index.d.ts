import * as React from 'react';
import * as PropTypes from 'prop-types';

export declare type MiMoParagraphProps = {
    button?: boolean;
    link?: boolean;
} & React.AnchorHTMLAttributes<any>;

declare class MiMoParagraph extends React.Component<MiMoParagraphProps, any> {
    static defaultProps: {
        button: boolean;
        link: boolean;
    }
    static propTypes: {
        button: PropTypes.Requireable<Boolean>;
        link: PropTypes.Requireable<Boolean>;
    }
    render(): JSX.Element;
}

export default MiMoParagraph;