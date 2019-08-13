import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Settings } from 'react-slick';


export declare type MiMoSliderProps = {
    data: Array
} & Settings;

declare class MiMoSlider extends React.Component<MiMoSliderProps, any> {
    static defaultProps: {
        data: arrray;
    };
    static propTypes: {
        data: React.Requireable<Array>
    };
    renderSlideItem(): any;
    render(): JSX.Element;
}

export default MiMoSlider;