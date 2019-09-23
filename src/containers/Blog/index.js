import React, { Component } from 'react';
import { PageLayout } from 'app-commons';
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
        searchStatus: STATUS.default
    };
    unmounted = false;
    pageNumber = 0;


    componentDidMount() {
        this.getBlog();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    getBlog(showMore = false, pageNumber = this.pageNumber, rowsPerPage = ROWS_PER_PAGE) {
        if (showMore) {
            this.setState({
                showMoreStatus: STATUS.loading
            })
        } else {
            this.setState({
                searchStatus: STATUS.loading
            })
        }

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

                if (showMore) {
                    articles = [...this.state.articles].concat(articles);
                }

                willUpdateState(
                    () => this.setState(prevState => ({
                        articles,
                        totalArticles,
                        searchStatus: STATUS.finish,
                        showMoreStatus: showMore ? STATUS.finish : prevState.showMoreStatus
                    })
                    ),
                    this.unmounted
                )
            }
        ).catch(
            err => {
                willUpdateState(
                    () => this.setState(prevState => ({
                        searchStatus: STATUS.error,
                        showMoreStatus: showMore ? STATUS.error : prevState.showMoreStatus
                    })
                    ),
                    this.unmounted
                )
            }
        )
    }

    showMore = () => {
        this.pageNumber++;
        this.getBlog(true);
    }

    handleBlogClick(article) {
        this.props.history.push(`${PATH.BLOG}/${article.ArticleSEOTitle}_${article.ArticleID}`);
    }

    render() {
        const isGetFullBlogs = this.state.articles.length === this.state.totalArticles;
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                <ListBlog
                    blogs={this.state.articles}
                    showMoreStatus={this.state.showMoreStatus}
                    searchStatus={this.state.searchStatus}
                    showMore={this.showMore}
                    isShowMore={!isGetFullBlogs}
                />
            </PageLayout>
        );
    }
}

export default Blog;