import React, { Component } from 'react';
import { StateType } from '@/pages/frontend/article-detail/model';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ArticleSkeleton from '@/components/ArticleSkeleton/ArticleSkeleton';
import { ArticleListDataItemType } from '@/pages/frontend/data';
import { ConnectProps } from '@/models/connect';
import styles from '@/components/ArticleSkeleton/index.less';
import articleListStyle from '@/pages/frontend/article-list/index.less';
import classNames from 'classnames';
import Introduce from '@/components/Introduce';
import MarkDown from '@/components/MarkDown/MarkDown';
import Tocify from '@/components/MarkDown/Tocify';
import { Card } from 'antd';

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
        <section className={classNames(styles.content, styles.clearfix)}>
          <ArticleSkeleton item={item} loading={loading}>
            <MarkDown
              content={item.content}
              className={styles.articleBody}
              getTocify={this.setTocity}
            />
          </ArticleSkeleton>
        </section>
        <Introduce />
        <Card style={{ width: 325, float: 'right' }}>{tocify && tocify.render()}</Card>
      </div>
    );
  }
}

export default ArticleDetail;
