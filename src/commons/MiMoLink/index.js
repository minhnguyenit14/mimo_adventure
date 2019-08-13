import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoLink extends PureComponent {
    state = {}
    render() {
        const { className, children, ...linkProps } = this.props;
        return (
            <a
                className={[window.classnames(cls.link, className)]}
                {...linkProps}
            >
                {children}
            </a>
        );
    }
}

export default MiMoLink;