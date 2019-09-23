import React, { Component } from 'react';
import { PageLayout, Container } from 'app-commons';
import cls from './styles.module.scss';
import { PATH } from 'app-constants';

class NotFound extends Component {
    state = {};

    componentWillMount() {
        if (window.location.pathname !== PATH.NOT_FOUND) {
            // this.props.history.replace(PATH.NOT_FOUND);
        }
    }

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