import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoRow extends PureComponent {
    state = {}
    render() {
        const { className, children, onClick} = this.props;
        return (
            <div
                className={window.classnames(cls.row, className)}
                onClick={onClick}
            >
                {children}
            </div>
        );
    }
}

export default MiMoRow;