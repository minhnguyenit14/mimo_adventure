import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import { BackTop } from 'antd';

class MiMoBackTop extends PureComponent {
    state = {};
    render() {
        return (
            <BackTop
                visibilityHeight="200"
                className={window.classnames(cls.backTopContainer)}
            />
        );
    }
}

export default MiMoBackTop;