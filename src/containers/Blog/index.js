import React, { Component } from 'react';
import { PageLayout } from 'app-commons';
import cls from './styles.module.scss';

class Blog extends Component {
    state = {}
    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >

            </PageLayout>
        );
    }
}

export default Blog;