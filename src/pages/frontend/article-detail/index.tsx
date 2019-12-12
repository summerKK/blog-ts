import React, { Component } from 'react';
import { StateType } from '@/pages/frontend/article-detail/model';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import ArticleSkeleton from '@/components/ArticleSkeleton/ArticleSkeleton';
import { ArticleListDataItemType } from '@/pages/frontend/data';
import ReactMarkdown from 'react-markdown';
import { ConnectProps } from '@/models/connect';
import styles from '@/components/ArticleSkeleton/index.less';

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
class ArticleDetail extends Component<ArticleDetailProps> {
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

  render() {
    const { articleItem, loading } = this.props;
    const item = articleItem.articleItem as ArticleListDataItemType;
    return (
      <ArticleSkeleton item={item} loading={loading}>
        <div className={styles.articleBody}>
          <ReactMarkdown source={item.content} escapeHtml={false} />
        </div>
      </ArticleSkeleton>
    );
  }
}

export default ArticleDetail;