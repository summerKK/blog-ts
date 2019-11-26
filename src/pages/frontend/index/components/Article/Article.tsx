import React, { Component } from 'react';
import { Card, Icon, Skeleton } from 'antd';
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
                <div className={styles.postMeta}>
                  <Icon type="calendar" style={{ color: '#00a7e0', marginRight: '5px' }} />
                  <span className={styles.postTime}>发表于 2019-08-06</span>
                  <span className={styles.wordCount}>
                    <em>•</em>
                    <Icon type="file-word" style={{ color: '#000', marginRight: '5px' }} />
                    数字统计 832
                  </span>
                  <span className={styles.visitor}>
                    <em>•</em>
                    <Icon type="eye" style={{ color: '#ff3f1a', marginRight: '5px' }} />被 19383
                    人看爆
                  </span>
                </div>
              </div>
              <div className={styles.articleBody}></div>
              <div className={styles.articleDetail}>
                <a>阅读全文 »</a>
              </div>
            </div>
          </Card>
        </section>
      </Skeleton>
    );
  }
}

export default Article;
