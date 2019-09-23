import React, { PureComponent } from 'react';
import { Container, PageLayout, Heading, Col, Row, Caption } from 'app-commons';
import cls from './styles.module.scss';
import { FaUser, FaClock } from 'react-icons/fa';
import renderHtml from 'react-render-html';
import {
    FacebookShareButton
} from 'react-share';
import { PATH, GET_DETAIL_ARTICLE, ID_AKA } from 'app-constants';
import { BLOG_THUMBNAIL_PATH_KEY, ADMIN_URL_KEY, IMAGE_PATH_KEY } from 'app-config/network';
import { addUrlToImages, addImagesURLToHtmlContent, correctSEOTitle } from 'app-helpers';

class BlogDetail extends PureComponent {
    state = {
        blog: {}
    };

    componentDidMount() {
        let { blogPath } = this.props.match.params;
        let blogId = undefined;
        if (blogPath) {
            const pathArray = blogPath.split("_");
            if (pathArray.length > 1) {
                blogId = pathArray[pathArray.length - 1];
                this.getBlog(blogId)
            } else {
                this.goToNotFound();
            }
        }
    }

    goToNotFound() {
        this.props.history.push(PATH.NOT_FOUND);
    }

    getBlog(blogId) {
        window.get(GET_DETAIL_ARTICLE.replace(ID_AKA, blogId)).then(
            res => {
                let blog = JSON.parse(res.data);
                blog = addUrlToImages(
                    [blog],
                    `${res[ADMIN_URL_KEY]}${res[BLOG_THUMBNAIL_PATH_KEY]}`,
                    "ArticleImages",
                )[0];
                blog.ArticleContent = addImagesURLToHtmlContent(
                    blog.ArticleContent,
                    res[ADMIN_URL_KEY],
                    res[IMAGE_PATH_KEY]
                );
                blog.ArticleSEOTitle = correctSEOTitle(blog.ArticleSEOTitle);
                this.setState({
                    blog
                })
            }
        )
    }

    getLocaleDate(stringDate) {
        try {
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            const date = new Date(stringDate).toLocaleString('vi', options);
            return date;
        } catch (err) {
            console.log('parseBlogDate err', err)
            return '';
        }
    }

    render() {
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                <Container className={window.classnames(cls.blogDetailContainer)}>
                    <Col className={window.classnames(cls.header)}>
                        <Heading>
                            {this.state.blog.ArticleTitle}
                        </Heading>
                        <Row className={window.classnames(cls.captionBlock)}>
                            {/* <Row className={window.classnames(cls.captionItem)}>
                                <div className={window.classnames(cls.captionIcon)}>
                                    <FaUser />
                                </div>
                                <Caption>
                                    {this.state.blog.ArticleAuthor}
                                </Caption>
                            </Row>

                            <em className={window.classnames(cls.point)}></em> */}

                            <Row className={window.classnames(cls.captionItem)}>
                                <div className={window.classnames(cls.captionIcon)}>
                                    <FaClock />
                                </div>
                                <Caption>
                                    {this.getLocaleDate(this.state.blog.LastModified)}
                                </Caption>
                            </Row>
                        </Row>
                        <Col className={window.classnames(cls.fbWrapper)}>
                            <FacebookShareButton url={window.location.href} >
                                <div className={window.classnames(cls.fbContainer)}>
                                    Chia sẻ
                                </div>
                            </FacebookShareButton>
                        </Col>
                    </Col>
                    <Col className={window.classnames(cls.descriptionContainer)}>
                        <Caption className={window.classnames(cls.description)}>
                            {this.state.blog.ArticleShortDescription}
                        </Caption>
                    </Col>
                    <div className={window.classnames(cls.content)}>
                        {this.state.blog.ArticleContent &&
                            renderHtml(this.state.blog.ArticleContent)}
                    </div>
                </Container>
            </PageLayout >
        );
    }
}

export default BlogDetail;