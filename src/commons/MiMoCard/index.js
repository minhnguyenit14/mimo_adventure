import React, { PureComponent } from 'react';
import { Container, Image, Caption, Heading, Col, Paragraph } from 'app-commons';
import cls from './styles.module.scss';
import { isMobile } from 'react-device-detect';

class MiMoCard extends PureComponent {
    state = {}
    render() {
        const { title, src, subTitle, description, className, id, onClick, contentClassName, captionClassName, ...props } = this.props;
        return (
            <Container
                onClick={() => onClick(id)}
                className={window.classnames(cls.cardContainer, !isMobile && cls.hover, className)}
                {...props}
            >
                <Col style={{ pointerEvents: 'none' }}>
                    <Image src={src} />
                    <Col className={window.classnames(cls.textContainer, contentClassName)}>
                        {subTitle &&
                            <Paragraph className={window.classnames(cls.paragragh)}>
                                {subTitle}
                            </Paragraph>}
                        {title &&
                            <Heading type={3} className={window.classnames(cls.heading)}>
                                {title}
                            </Heading>}
                        {description &&
                            <Caption className={window.classnames(cls.caption, captionClassName)}>
                                {description}
                            </Caption>}
                    </Col>
                </Col>
            </Container>
        );
    }
}

MiMoCard.defaultProps = {
    onClick: () => { }
}

export default MiMoCard;