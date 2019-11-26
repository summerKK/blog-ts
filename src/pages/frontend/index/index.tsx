import React, { Component } from 'react';
import Article from '@/pages/frontend/index/components/Article/Article';
import styles from './index.less';

class Index extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <div className={styles.mainInner}>
        <Article />
      </div>
    );
  }
}

export default Index;
