import React, { Component } from 'react';
import { PageLayout, Heading, Paragraph, Link, Row } from 'app-commons';
import cls from './styles.module.scss';
import { FaPhone, FaFax } from 'react-icons/fa'

class Contact extends Component {
    state = {}
    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                <Heading className={window.classnames(cls.heading)}>
                    Liên hệ với chúng tôi
                </Heading>
                <Paragraph className={window.classnames(cls.companyName)}>
                    Thúy Ann
                </Paragraph>
                <Paragraph className={window.classnames(cls.companyHeadOffice)}>
                    15 Hàng Bài, Hà Nội
                </Paragraph>
                <Row className={window.classnames(cls.phoneFax)}>
                    <Paragraph className={window.classnames(cls.companyPhone)}>
                        <FaPhone className={window.classnames(cls.phoneIcon)} /> 098745323
                    </Paragraph>
                    <Paragraph className={window.classnames(cls.companyFax)}>
                        <FaFax className={window.classnames(cls.faxIcon)} /> 1123443
                    </Paragraph>
                </Row>
                <Link className={window.classnames(cls.companyFb)}>
                    fb.com/thuyan
                </Link>
            </PageLayout>
        );
    }
}

export default Contact;