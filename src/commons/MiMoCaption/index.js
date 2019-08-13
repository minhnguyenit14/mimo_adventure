import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoCaption extends PureComponent {
    state = {};

    renderCaption() {
        const {
            fontStyle,
            children,
            className,
            ...captionProps
        } = this.props;
        return <span
            style={{ fontStyle }}
            className={window.classnames(className)}
            {...captionProps}
        >
            {children}
        </span>;
    }

    render() {
        return (
            this.renderCaption()
        );
    }
}

export default MiMoCaption;