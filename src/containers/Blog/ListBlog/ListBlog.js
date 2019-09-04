import React, { PureComponent } from 'react';
import cls from './styles.module.scss';
import { Container } from 'app-commons';
import { withRouter } from 'react-router-dom';
import { PATH } from 'app-constants';
import BlogComponent from '../BlogComponent';

class ListBlog extends PureComponent {
    state = {};

    handleBlogClick(article) {
        this.props.history.push(`${PATH.BLOG}/${article.ArticleSEOTitle}_${article.ArticleID}`);
    }

    render() {
        const { blogs } = this.props;
        return (
            <div>
                {blogs.map(blog => <BlogComponent
                    key={blog.ArticleID}
                    blog={blog}
                    onClick={this.handleBlogClick.bind(this)}
                />)}
            </div>
        );
    }
}

ListBlog.defaulProps = {
    onBlogClick: () => { },
    blogs: []
}

export default withRouter(ListBlog);