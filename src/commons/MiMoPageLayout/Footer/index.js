import React, { PureComponent } from 'react';
import { FaFacebook, FaLocationArrow, FaPhone, FaFax } from 'react-icons/fa';
import { Container, Image, Row, Paragraph, Link } from 'app-commons';
import cls from './styles.module.scss';
import { MENU, GET_HOME_COMPANY_INFO } from 'app-constants';
import { getStorage, setStorage, willUpdateState } from 'app-helpers';

class Footer extends PureComponent {

    state = {
        companyInfo: {}
    };
    unmounted = false;

    componentDidMount() {
        let cache = getStorage();
        if (cache.companyInfo && Object.keys(cache.companyInfo).length !== 0) {
            willUpdateState(
                () => this.setState({ companyInfo: cache.companyInfo })
                , this.unmounted
            )
        }
        this.getCompanyInfo().then(
            companyInfo => {
                cache = getStorage();
                willUpdateState(
                    () => this.setState({ companyInfo })
                    , this.unmounted
                )
                setStorage({
                    ...cache,
                    companyInfo
                })
            }
        )
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    getCompanyInfo() {
        return window.get(GET_HOME_COMPANY_INFO).then(
            res => {
                const companyInfo = {};
                JSON.parse(res.data).forEach(
                    info =>
                        Object.keys(info).forEach(
                            key => companyInfo[key] = info[key]
                        )
                )
                return companyInfo;
            }
        ).catch(err => {
            alert('Get info of company failed');
            console.log('getCompanyInfo', err);
        })
    }

    render() {
        const { companyInfo } = this.state;
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
                            <FaLocationArrow className={window.classnames(cls.infoIcon)} />
                            <Paragraph className={window.classnames(cls.infoParagraph)}>
                                {companyInfo.CompanyHeadOffice}
                            </Paragraph>
                        </Row>
                        <Row className={window.classnames(cls.addressRow)}>
                            <FaPhone className={window.classnames(cls.infoIcon)} />
                            <Paragraph className={window.classnames(cls.infoParagraph)}>
                                {companyInfo.CompanyPhone}
                            </Paragraph>
                        </Row>
                        <Row className={window.classnames(cls.addressRow)}>
                            <FaFax className={window.classnames(cls.infoIcon)} />
                            <Paragraph className={window.classnames(cls.infoParagraph)}>
                                {companyInfo.CompanyFax}
                            </Paragraph>
                        </Row>
                        <Row className={window.classnames(cls.addressRow)}>
                            <FaFacebook className={window.classnames(cls.infoIcon)} />
                            <Link
                                className={window.classnames(cls.infoParagraph)}
                                href={`https://${companyInfo.CompanyFacebook}`}
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                {companyInfo.CompanyFacebook}
                            </Link>
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