import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import { Container, Loading, Button, Caption } from 'app-commons';
import { withRouter } from 'react-router-dom';
import { PATH, STATUS } from 'app-constants';
import BlogComponent from '../BlogComponent';
import { correctSEOTitle } from 'app-helpers';

class ListBlog extends PureComponent {
    state = {};

    handleBlogClick(article) {
        this.props.history.push(`${PATH.BLOG}/${correctSEOTitle(article.ArticleSEOTitle)}_${article.ArticleID}`);
    }

    render() {
        const { blogs, searchStatus, showMoreStatus, showMore, isShowMore } = this.props;
        const loadingSearch = searchStatus === STATUS.loading;
        const loadingShowMore = showMoreStatus === STATUS.loading;
        return (
            <>
                {loadingSearch
                    ? (
                        <Container>
                            <Loading />
                        </Container>
                    )
                    : blogs.length !== 0
                        ? blogs.map(blog => <BlogComponent
                            key={blog.ArticleID}
                            blog={blog}
                            onClick={this.handleBlogClick.bind(this)}
                        />)
                        : <Caption style={{
                            display: 'block',
                            margin: 'auto',
                            textAlign: 'center'
                        }}>
                            Không tìm thấy bài viết nào.
                        </Caption>
                }

                {isShowMore && !loadingSearch &&
                    <Button
                        loading={loadingShowMore}
                        onClick={showMore}
                        className={window.classnames(cls.btnShowMore,
                            loadingShowMore && cls.btnLoading)}
                        title={"Xem thêm"} />
                }

            </>
        );
    }
}

ListBlog.defaulProps = {
    onBlogClick: () => { },
    blogs: [],
    showMoreStatus: STATUS.default,
    searchStatus: STATUS.default,
    showMore: () => { },
    isShowMore: false
}

export default withRouter(ListBlog);