import React, { Component } from 'react';
import { Card, Skeleton } from 'antd';
import styles from './index.less';

class Article extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <Skeleton loading={false}>
        <section className={styles.content}>
          <Card className={styles.article}>
            <div className={styles.articleDate}>
              <div className={styles.articleMonth}>08月</div>
              <div className={styles.articleDay}>06</div>
            </div>
            <div className={styles.badge}>
              <span>
                <a href="">
                  <span>创作集</span>
                </a>
              </span>
            </div>
            <div className={styles.block}>
              <div className={styles.articleHeader}>
                <h1>
                  <a href="">RSSHub Radar — 订阅一个 RSS 源不应该这么难</a>
                </h1>
              </div>
            </div>
          </Card>
        </section>
      </Skeleton>
    );
  }
}

export default Article;
