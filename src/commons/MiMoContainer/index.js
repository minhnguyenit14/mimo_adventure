import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoContainer extends PureComponent {
    state = {}
    render() {
        const { className, children, contentCenter, callBackRef, ...containerProps } = this.props;
        return (
            <div
                className={window.classnames(cls.container, contentCenter && cls.center, className)}
                ref={inst => callBackRef(inst)}
                {...containerProps}
            >
                {children}
            </div>
        );
    }
}

MiMoContainer.defaultProps = {
    callBackRef: () => {}
}

export default MiMoContainer;