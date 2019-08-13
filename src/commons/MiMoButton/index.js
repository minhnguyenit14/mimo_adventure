import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { Paragraph } from 'app-commons';
import cls from './styles.module.scss';

class MiMoButton extends PureComponent {
    state = {};

    handleClick = () => this.props.onClick();

    render() {
        const {
            titleClassName,
            className,
            children,
            title,
            callBackRef,
            ...buttonProps
        } = this.props;
        return (
            <Button
                onClick={this.handleClick.bind(this)}
                className={window.classnames(cls.buttonContainer, className)}
                {...buttonProps}
            >
                {title
                    ? <Paragraph button className={window.classnames(titleClassName)}>
                        {title}
                    </Paragraph>
                    : children
                }
            </ Button>
        );
    }
}
export default MiMoButton;