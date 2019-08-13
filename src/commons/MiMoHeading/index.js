import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoHeading extends PureComponent {
    state = {};

    renderHeading() {
        const { type, children, center, className, ...headingProps } = this.props;
        let clsName = window.classnames(center && cls.center, className);
        let Comp = 'h1';
        switch (type) {
            case 1:
                Comp = 'h1';
                break;
            case 2:
                Comp = 'h2';
                break;
            case 3:
                Comp = 'h3';
                break;
            default:
                Comp = 'h1';
                break;
        }
        return <Comp className={clsName} {...headingProps}>{children}</Comp>;
    }

    render() {
        return (
            this.renderHeading()
        );
    }
}

export default MiMoHeading;