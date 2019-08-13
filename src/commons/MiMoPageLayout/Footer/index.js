import React, { PureComponent } from 'react';
import { FaFacebook, FaLocationArrow, FaPhone } from 'react-icons/fa';
import { Container, Image, Row, Paragraph } from 'app-commons';
import cls from './styles.module.scss';
import { MENU } from 'app-constants';

class Footer extends PureComponent {
    state = {}
    render() {
        const { children, ...footerProps } = this.props;
        return (
            <Container
                className={window.classnames(cls.footerContainer)}
                {...footerProps}
            >
                <div className={window.classnames(cls.footerMenuContainer)}>
                    {
                        MENU.map((menu, index) => <Paragraph
                            key={index}
                            link
                            className={window.classnames(cls.menuItem)}
                        >
                            {menu.title}
                        </Paragraph>)
                    }
                </div>
                <Row className={window.classnames(cls.companyInfoContainer)}>
                    <Image
                        containerClassName={window.classnames(cls.imgContainer)}
                        height="100px"
                        src={require('assets/images/logo/logo.png')}
                    />
                    <div className={window.classnames(cls.companyInfo)}>
                        <Row className={window.classnames(cls.addressRow)}>
                            <FaLocationArrow />
                            <Paragraph>
                                19th California, US
                            </Paragraph>
                        </Row>
                        <Row className={window.classnames(cls.addressRow)}>
                            <FaPhone />
                            <Paragraph>
                                (+84) 987654452
                                </Paragraph>
                        </Row>
                        <Row className={window.classnames(cls.addressRow)}>
                            <FaFacebook />
                            <a>
                                fb.com/demoprojects
                            </a>
                        </Row>
                    </div>
                </Row>
                <div className={window.classnames(cls.copyright)}>
                    <Paragraph>
                        © 2019 demoProjects
                    </Paragraph>
                </div>
            </Container>
        );
    }
}

export default Footer;