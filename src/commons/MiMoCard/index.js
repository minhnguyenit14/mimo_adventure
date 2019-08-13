import React, { PureComponent } from 'react';
import { Container, Image, Caption, Heading, Col } from 'app-commons';
import cls from './styles.module.scss';

class MiMoCard extends PureComponent {
    state = {}
    render() {
        const { title, src, subTitle, className, id, onClick, contentClassName } = this.props;
        return (
            <Container onClick={() => onClick(id)} className={window.classnames(cls.cardContainer, className)}>
                <Col>
                    <Image src={src} />
                    <Col className={window.classnames(cls.textContainer, contentClassName)}>
                        <Caption className={window.classnames(cls.caption)}>
                            {subTitle}
                        </Caption>
                        <Heading type={3}>
                            {title}
                        </Heading>
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