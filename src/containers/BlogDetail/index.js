import React, { PureComponent } from 'react';
import { Container, PageLayout, Heading, Col, Row, Caption } from 'app-commons';
import cls from './styles.module.scss';
import { FaUser, FaClock } from 'react-icons/fa';
import renderHtml from 'react-render-html';
import {
    FacebookShareButton,
    FacebookShareCount
} from 'react-share';

const temp = {
    ArticleAuthor: "Administrator",
    ArticleContent: "<p>fdafasfa</p>",
    ArticleID: 2,
    ArticleImages: "ZC9knyUymlNT1ROv.jpg",
    ArticleSEOTitle: "abc",
    ArticleShortDescription: "fdsaf ",
    ArticleTitle: "abc vknvka v n j ljnjfn nfj njfjf jfn jnjnfls n slvfbn sld njk skdfjn k sdk nks vnjfsndk skdndn vj kdsn kvnfsknfjkds vkfds",
    CreatedDate: "2019-01-01T00:00:00",
    LastModified: "2019-07-24T22:25:33.637"
}

class BlogDetail extends PureComponent {
    state = {};

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
                            {temp.ArticleTitle}
                        </Heading>
                        <Row className={window.classnames(cls.captionBlock)}>
                            <Row className={window.classnames(cls.captionItem)}>
                                <div className={window.classnames(cls.captionIcon)}>
                                    <FaUser />
                                </div>
                                <Caption>
                                    {temp.ArticleAuthor}
                                </Caption>
                            </Row>

                            <em className={window.classnames(cls.point)}></em>

                            <Row className={window.classnames(cls.captionItem)}>
                                <div className={window.classnames(cls.captionIcon)}>
                                    <FaClock />
                                </div>
                                <Caption>
                                    {this.getLocaleDate(temp.LastModified)}
                                </Caption>
                            </Row>
                        </Row>
                        <Col className={window.classnames(cls.fbWrapper)}>
                            <FacebookShareButton url={window.location.href} >
                                <div className={window.classnames(cls.fbContainer)}>
                                    Chia sẻ
                                <div className={window.classnames(cls.fbShareCount)}>
                                        <FacebookShareCount url={window.location.href}>
                                            {shareCount => (
                                                <div>
                                                    {shareCount}
                                                </div>
                                            )}
                                        </FacebookShareCount>
                                    </div>
                                </div>
                            </FacebookShareButton>
                        </Col>
                    </Col>
                    <Col className={window.classnames(cls.descriptionContainer)}>
                        <Caption className={window.classnames(cls.description)}>
                            {temp.ArticleShortDescription}
                        </Caption>
                    </Col>
                    <Col className={window.classnames(cls.content)}>
                        {renderHtml(temp.ArticleContent)}
                    </Col>
                </Container>
            </PageLayout>
        );
    }
}

export default BlogDetail;