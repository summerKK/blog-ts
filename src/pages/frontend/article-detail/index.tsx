import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import classNames from 'classnames';
import { Affix, Card } from 'antd';
import { StateType } from '@/pages/frontend/article-detail/model';
import ArticleSkeleton from '@/components/ArticleSkeleton/ArticleSkeleton';
import { ArticleListDataItemType } from '@/pages/frontend/data';
import { ConnectProps } from '@/models/connect';
import styles from '@/components/ArticleSkeleton/index.less';
import articleListStyle from '@/pages/frontend/article-list/index.less';
import MarkDown from '@/components/MarkDown/MarkDown';
import Tocify from '@/components/MarkDown/Tocify';
import ArticleComment from '@/pages/frontend/article-detail/components/Comment';

interface ArticleDetailStats {
  tocify?: Tocify;
}

interface ArticleDetailProps {
  loading: boolean;
  articleId: number;
  articleItem: StateType;
  dispatch: Dispatch<any>;
  match: ConnectProps['match'] & {
    params: { [K in 'id']: string };
  };
}

@connect(
  ({
    articleItem,
    loading,
  }: {
    articleItem: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    articleItem,
    loading: loading.models.articleItem,
  }),
)
class ArticleDetail extends Component<ArticleDetailProps, ArticleDetailStats> {
  constructor(props: ArticleDetailProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    const {
      dispatch,
      match: { params },
    } = this.props;
    dispatch({
      type: 'articleItem/fetchArticleItem',
      payload: {
        articleId: params.id,
      },
    });
  }

  setTocity = (tocify: Tocify) => {
    this.setState({
      tocify,
    });
  };

  render() {
    const { articleItem, loading } = this.props;
    const item = articleItem.articleItem as ArticleListDataItemType;
    const { tocify } = this.state;
    return (
      <div className={articleListStyle.mainInner}>
        <div className={classNames(styles.content, styles.clearfix)}>
          <ArticleSkeleton item={item} loading={loading}>
            <MarkDown
              content={item.content}
              className={styles.articleBody}
              getTocify={this.setTocity}
            />
          </ArticleSkeleton>
          <div>
            <ArticleComment />
          </div>
        </div>
        <Affix offsetTop={60}>
          <Card style={{ width: 325, float: 'right' }} className={styles.clearfix}>
            {tocify && tocify.render()}
          </Card>
        </Affix>
      </div>
    );
  }
}

export default ArticleDetail;
