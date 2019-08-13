import React, { PureComponent } from 'react';
import cls from './styles.module.scss';

class MiMoParagraph extends PureComponent {
    state = {};

    renderParagraph() {
        const { button, children, className, link, ...ParagraphProps } = this.props;
        return <p
            className={window.classnames(
                cls.Paragraph,
                button && cls.buttonStyle,
                link && cls.linkStyle,
                className
            )}
            {...ParagraphProps}
        >
            {children}
        </p>;
    }

    render() {
        return (
            this.renderParagraph()
        );
    }
}

export default MiMoParagraph;