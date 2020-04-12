import React, { Component } from 'react';
import Article from '@/pages/frontend/article-list/components';
import styles from './index.less';
import Introduce from '@/components/Introduce';
import { connect } from 'dva';
import { StateType } from '@/pages/frontend/article-list/model';
import { Dispatch } from 'redux';

interface IndexProps {
  loading: boolean;
  articleList: StateType;
  dispatch: Dispatch<any>;
}

@connect(
  ({
    articleList,
    loading,
  }: {
    articleList: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    articleList,
    loading: loading.models.home,
  }),
)
class Index extends Component<IndexProps> {
  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'articleList/fetchArticle',
      payload: {
        count: 10,
      },
    });
  }

  render() {
    const { articleList, loading } = this.props;
    const { list } = articleList;
    return (
      <div className={styles.mainInner}>
        <Article dataSource={list} loading={loading} />
        <Introduce />
      </div>
    );
  }
}

export default Index;
