import React, { Component } from 'react';
import { PageLayout, Container } from 'app-commons';
import cls from './styles.module.scss';

class NotFound extends Component {
    state = {};
    render() {
        return (
            <PageLayout bodyClassName={window.classnames(cls.body)}>
                <Container>
                    404. Không tìm thấy trang!
                </Container>
            </PageLayout>
        );
    }
}

export default NotFound;