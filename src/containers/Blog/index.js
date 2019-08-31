import React, { Component } from 'react';
import { PageLayout } from 'app-commons';
import BlogComponent from './BlogComponent';
import cls from './styles.module.scss';
import { PATH, GET_PAGING_ARTICLE } from 'app-constants';
import { getStorage, setStorage, willUpdateState, addUrlToImages } from 'app-helpers';
import { BLOG_THUMBNAIL_PATH_KEY, ADMIN_URL_KEY } from 'app-config/network';

const TEMP = [
    {
        ArticleAuthor: "Administrator",
        ArticleContent: "<p>fdafasfa</p>↵",
        ArticleID: 2,
        ArticleImages: "ZC9knyUymlNT1ROv.jpg",
        ArticleSEOTitle: "abc",
        ArticleShortDescription: "fdsaf ",
        ArticleTitle: "abc vknvka v n j ljnjfn nfj njfjf jfn jnjnfls n slvfbn sld njk skdfjn k sdk nks vnjfsndk skdndn vj kdsn kvnfsknfjkds vkfds",
        CreatedDate: "2019-01-01T00:00:00",
        LastModified: "2019-07-24T22:25:33.637"
    },
    {
        ArticleAuthor: "Administrator",
        ArticleContent: "<p>fdafasfa</p>↵",
        ArticleID: 3,
        ArticleImages: "ZC9knyUymlNT1ROv.jpg",
        ArticleSEOTitle: "abc",
        ArticleShortDescription: "fdsaf ",
        ArticleTitle: "abc",
        CreatedDate: "2019-01-01T00:00:00",
        LastModified: "2019-07-24T22:25:33.637"
    },
    {
        ArticleAuthor: "Administrator",
        ArticleContent: "<p>fdafasfa</p>↵",
        ArticleID: 4,
        ArticleImages: "ZC9knyUymlNT1ROv.jpg",
        ArticleSEOTitle: "abc",
        ArticleShortDescription: "fdsaf ",
        ArticleTitle: "abc",
        CreatedDate: "2019-01-01T00:00:00",
        LastModified: "2019-07-24T22:25:33.637"
    }
];
const ROWS_PER_PAGE = 20;

class Blog extends Component {
    state = {
        articles: [],
        totalArticles: 0
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
        this.props.history.push(`${PATH.BLOG}/${article.ArticleSEOTitle}`);
    }

    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                {this.state.articles.map(article => <BlogComponent
                    key={article.ArticleID}
                    blog={article}
                    onClick={this.handleBlogClick.bind(this)}
                />)}
            </PageLayout>
        );
    }
}

export default Blog;