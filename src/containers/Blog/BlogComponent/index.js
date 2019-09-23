import React, { PureComponent } from 'react';
import { Container, Row, Image, Heading, Col, Paragraph, Caption, Link } from 'app-commons';
import { FaUser, FaClock } from 'react-icons/fa';
import { isMobileOnly } from 'react-device-detect';
import cls from './styles.module.scss';
import styles from 'app-config/app_vars.scss';

const smallDevice = parseInt(styles.smallDevice);

class BlogComponent extends PureComponent {
    state = {
        isMobile: isMobileOnly || window.innerWidth < smallDevice
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = (e) => {
        const isMobile = isMobileOnly || window.innerWidth < smallDevice;
        this.setState({
            isMobile
        })
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
        const { isMobile } = this.state;
        const { blog, onClick } = this.props;
        const title =
            <Heading key={0} type={2} className={window.classnames(cls.title)}>
                <Link onClick={() => onClick(blog)}>
                    {blog.ArticleTitle}
                </Link>
            </Heading>;

        const caption = <Row key={1} className={window.classnames(cls.captionBlock)}>
            {/* <Row className={window.classnames(cls.captionItem)}>
                <div className={window.classnames(cls.captionIcon)}>
                    <FaUser />
                </div>
                <Caption>
                    {blog.ArticleAuthor}
                </Caption>
            </Row>

            <em className={window.classnames(cls.point)}></em> */}

            <Row className={window.classnames(cls.captionItem)}>
                <div className={window.classnames(cls.captionIcon)}>
                    <FaClock />
                </div>
                <Caption>
                    {this.getLocaleDate(blog.LastModified)}
                </Caption>
            </Row>

        </Row>;

        return (
            <Container className={window.classnames(cls.blogContainer)}>
                {isMobile && <Col>
                    {[title, caption]}
                </Col>}
                <Row className={window.classnames(cls.blogRow)}>
                    <Col className={window.classnames(cls.imageBlock)}>
                        <Image src={blog.ArticleImages} />
                    </Col>
                    <Col className={window.classnames(cls.infoBlock)}>
                        {!isMobile && [title, caption]}
                        <Container>
                            <Paragraph>
                                {blog.ArticleShortDescription}
                            </Paragraph>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

BlogComponent.defaultProps = {
    blog: {},
    onClick: () => { }
}

export default BlogComponent;