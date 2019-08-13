import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoCol extends PureComponent {
    state = {}
    render() {
        const { className, children, ...colProps } = this.props
        return (
            <div
                className={window.classnames(cls.col, className)}
                {...colProps}
            >
                {children}
            </div>
        );
    }
}

export default MiMoCol;