import React, { PureComponent } from 'react';
import { FaFacebook, FaLocationArrow, FaPhone, FaFax } from 'react-icons/fa';
import { Container, Image, Row, Paragraph, Link, Col } from 'app-commons';
import cls from './styles.module.scss';
import { MENU, GET_HOME_COMPANY_INFO } from 'app-constants';
import { getStorage, setStorage, willUpdateState } from 'app-helpers';
import { withRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {
    mobile
} from 'appConfig/app_vars.scss';

const mobileWidth = Number.parseInt(mobile);

class Footer extends PureComponent {

    state = {
        companyInfo: {},
        isChangeLayout: this.isMobileDevice()
    };
    unmounted = false;

    isMobileDevice() {
        return isMobile || window.innerWidth <= mobileWidth
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleDeviceResize.bind(this))

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
        window.removeEventListener('resize', this.handleDeviceResize.bind(this));
    }

    handleDeviceResize() {
        willUpdateState(
            () => this.setState({ isChangeLayout: this.isMobileDevice() }),
            this.unmounted
        );
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
        const { companyInfo, isChangeLayout } = this.state;
        const companyInfoNode = <div key={0} className={window.classnames(cls.companyInfo)}>
            <div>
                <Row className={window.classnames(cls.addressRow)}>
                    <Paragraph className={window.classnames(cls.infoTitle)}>Địa chỉ phân phối:</Paragraph>

                    <Paragraph className={window.classnames(cls.infoParagraph)}>
                        {companyInfo && companyInfo.CompanyShowRoom}
                    </Paragraph>
                </Row>
                <Row className={window.classnames(cls.addressRow, cls.phone)}>
                    <div>
                        <Paragraph className={window.classnames(cls.infoTitle)}>Điện thoại:</Paragraph>
                    </div>

                    <Paragraph className={window.classnames(cls.infoParagraph)}>
                        {companyInfo && companyInfo.CompanyPhone}
                    </Paragraph>
                </Row>
                <Row className={window.classnames(cls.addressRow)}>
                    <Paragraph className={window.classnames(cls.infoTitle)}>Fax:</Paragraph>

                    <Paragraph className={window.classnames(cls.infoParagraph)}>
                        {companyInfo && companyInfo.CompanyFax}
                    </Paragraph>
                </Row>
            </div>
        </div>;
        const logoNode = <Col key={1} className={window.classnames(cls.imgWrapper)}>
            <Image
                containerClassName={window.classnames(cls.imgContainer)}
                height="100px"
                src={require('assets/images/logo/logo.png')}
            />
            <Row className={window.classnames(cls.addressRow)}>
                <Link
                    className={window.classnames(cls.infoParagraph)}
                    href={`${companyInfo && companyInfo.CompanyFacebook}`}
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    <FaFacebook
                        className={window.classnames(cls.facebookIcon)}
                    />
                </Link>
            </Row>
        </Col>;

        return (
            <Container
                className={window.classnames(cls.footerContainer)}
            >
                <div className={window.classnames(cls.footerWrapper)}>
                    <div className={window.classnames(cls.footerMenuOuter)}>
                        <div className={window.classnames(cls.footerMenuContainer)}>
                            {
                                MENU.map((menu, index) => <Paragraph
                                    key={index}
                                    link
                                    className={window.classnames(cls.menuItem)}
                                    onClick={() => this.props.history.push(menu.seoTitle)}
                                >
                                    {menu.title}
                                </Paragraph>)
                            }
                        </div>
                    </div>
                    {isChangeLayout
                        ? [logoNode, companyInfoNode]
                        : [companyInfoNode, logoNode]
                    }

                </div>

                <div className={window.classnames(cls.copyright)}>
                    <Paragraph>
                        © 2019 An Nguyen
                    </Paragraph>
                </div>
            </Container >
        );
    }
}

export default withRouter(Footer);