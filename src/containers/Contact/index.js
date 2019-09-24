import React, { Component } from 'react';
import { PageLayout, Heading, Paragraph, Link, Row, Col } from 'app-commons';
import cls from './styles.module.scss';
import { FaPhone, FaFax } from 'react-icons/fa'
import { getStorage } from 'app-helpers';

class Contact extends Component {
    state = {
        companyInfo: {}
    }

    componentDidMount() {
        let cache = getStorage();
        if (!cache) {
            this.waitForGettingCache = setInterval(() =>
                this.applyCache(), 100);
        } else {
            if (!cache.companyInfo || Object.keys(cache.companyInfo).length === 0) {
                this.waitForGettingCache = setInterval(() =>
                    this.applyCache(), 100);
            } else {
                this.applyCache(cache)
            }
        }
    }

    applyCache(cache = getStorage()) {
        if (cache.companyInfo) {
            if (Object.keys(cache.companyInfo).length > 0) {
                this.setState({
                    companyInfo: cache.companyInfo
                })
                clearInterval(this.waitForGettingCache);
            }
        }
    }

    render() {
        const { companyInfo } = this.state;
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                <Heading className={window.classnames(cls.heading)}>
                    Liên hệ với chúng tôi
                </Heading>
                <Paragraph className={window.classnames(cls.companyName)}>
                    {companyInfo.CompanyName}
                </Paragraph>
                <Row>
                    <Col className={window.classnames(cls.block)}>
                        <Heading type={3} className={window.classnames(cls.titleOffice)}>Trụ sở</Heading>
                        <Paragraph className={window.classnames(cls.companyHeadOffice)}>
                            {companyInfo.CompanyHeadOffice}
                        </Paragraph>
                    </Col>
                    <Col className={window.classnames(cls.block)}>
                        <Heading type={3} className={window.classnames(cls.titleOffice)}>Địa chỉ phân phối</Heading>
                        <Paragraph className={window.classnames(cls.companyHeadOffice)}>
                            {companyInfo.CompanyShowRoom}
                        </Paragraph>
                    </Col>
                    <Col className={window.classnames(cls.block)}>
                        <Heading type={3} className={window.classnames(cls.titleOffice)}>Liên hệ</Heading>

                        <Link
                            className={window.classnames(cls.companyFb)}
                            href={companyInfo.CompanyFacebook}
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            {companyInfo.CompanyName}
                        </Link>
                        <Paragraph className={window.classnames(cls.companyPhone)}>
                            <FaPhone className={window.classnames(cls.phoneIcon)} />
                            {companyInfo.CompanyPhone}
                        </Paragraph>
                        <Paragraph className={window.classnames(cls.companyFax)}>
                            <FaFax className={window.classnames(cls.faxIcon)} />
                            {companyInfo.CompanyFax}
                        </Paragraph>
                    </Col>
                </Row>
            </PageLayout>
        );
    }
}

export default Contact;