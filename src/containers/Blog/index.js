import React, { Component } from 'react';
import { PageLayout } from 'app-commons';
import BlogComponent from './BlogComponent';
import cls from './styles.module.scss';
import { PATH, GET_PAGING_ARTICLE, STATUS } from 'app-constants';
import { willUpdateState, addUrlToImages } from 'app-helpers';
import { BLOG_THUMBNAIL_PATH_KEY, ADMIN_URL_KEY } from 'app-config/network';
import ListBlog from './ListBlog';

const ROWS_PER_PAGE = 20;

class Blog extends Component {
    state = {
        articles: [],
        totalArticles: 0,
        showMoreStatus: STATUS.default,
        getBlogStatus: STATUS.default
    };
    unmounted = false;
    pageNumber = 0;


    componentDidMount() {
        this.getBlog();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    getBlog(pageNumber = this.pageNumber, rowsPerPage = ROWS_PER_PAGE) {
        window.get(GET_PAGING_ARTICLE, { pageNumber, rowsPerPage }).then(
            res => {
                const articleData = JSON.parse(res.data);
                let articles = JSON.parse(articleData.data);
                const totalArticles = articleData.totalRecords;
                articles = addUrlToImages(
                    articles,
                    `${res[ADMIN_URL_KEY]}${res[BLOG_THUMBNAIL_PATH_KEY]}`,
                    'ArticleImages'
                );

                willUpdateState(
                    () => this.setState({
                        articles,
                        totalArticles
                    }),
                    this.unmounted
                )
            }
        )
    }

    handleBlogClick(article) {
        this.props.history.push(`${PATH.BLOG}/${article.ArticleSEOTitle}_${article.ArticleID}`);
    }

    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                <ListBlog
                    blogs={this.state.articles}
                    showMoreStatus={this.state.showMoreStatus}
                    searchStatus={this.state.getBlogStatus}
                />
            </PageLayout>
        );
    }
}

export default Blog;