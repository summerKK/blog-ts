import React, { Component } from 'react';
import Article from '@/pages/frontend/home/components/ArticleList';
import styles from './index.less';
import Introduce from '@/components/Introduce';
import { connect } from 'dva';
import { StateType } from '@/pages/frontend/home/model';
import { Dispatch } from 'redux';

interface IndexProps {
  loading: boolean;
  home: StateType;
  dispatch: Dispatch<any>;
}

@connect(
  ({ home, loading }: { home: StateType; loading: { models: { [key: string]: boolean } } }) => ({
    home,
    loading: loading.models.home,
  }),
)
class Index extends Component<IndexProps> {
  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchArticle',
      payload: {
        count: 10,
      },
    });
  }

  render() {
    const { home, loading } = this.props;
    const { list } = home;
    return (
      <div className={styles.mainInner}>
        <Article dataSource={list} loading={loading} />
        <Introduce />
      </div>
    );
  }
}

export default Index;
