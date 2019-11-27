import React, { Component } from 'react';
import Article from '@/pages/frontend/index/components/Article/Article';
import styles from './index.less';
import Introduce from '@/components/Introduce';

class Index extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <div className={styles.mainInner}>
        <Article />
        <Introduce />
      </div>
    );
  }
}

export default Index;
