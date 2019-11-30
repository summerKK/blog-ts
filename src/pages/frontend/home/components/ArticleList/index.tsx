import React from 'react';
import { Card, Icon, Skeleton } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import { ArticleListDataItemType } from '@/pages/frontend/home/data';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Ellipsis from '@/components/Ellipsis';

interface ArticleProps {
  dataSource: ArticleListDataItemType[];
  loading: boolean;
}
const Index: React.FC<ArticleProps> = ({ loading, dataSource, ...rest }) => (
  <Skeleton loading={loading}>
    <section className={classNames(styles.content, styles.clearfix)}>
      {dataSource.map(item => (
        <Card className={styles.article} key={item.id} {...rest}>
          <div className={styles.articleDate}>
            <div className={styles.articleMonth}>{moment(item.created_at).format('M')}月</div>
            <div className={styles.articleDay}>{moment(item.created_at).format('DD')}</div>
          </div>
          <div className={styles.badge}>
            <span>
              <a href="">
                <span>{item.article_type}</span>
              </a>
            </span>
          </div>
          <div className={styles.block}>
            <div className={styles.articleHeader}>
              <h1>
                <a href="">{item.title}</a>
              </h1>
              <div className={styles.postMeta}>
                <Icon type="calendar" style={{ color: '#00a7e0', marginRight: '5px' }} />
                <span className={styles.postTime}>
                  发表于 {moment(item.created_at).format('Y-MM-DD')}
                </span>
                <span className={styles.wordCount}>
                  <em>•</em>
                  <Icon type="file-word" style={{ color: '#000', marginRight: '5px' }} />
                  数字统计 832
                </span>
                <span className={styles.visitor}>
                  <em>•</em>
                  <Icon type="eye" style={{ color: '#ff3f1a', marginRight: '5px' }} />被{' '}
                  {item.page_view}
                  人看爆
                </span>
              </div>
            </div>
            <Ellipsis lines={6}>
              <div className={styles.articleBody}>
                <ReactMarkdown source={item.content} escapeHtml={false} />
              </div>
            </Ellipsis>
            <div className={styles.articleDetail}>
              <a>阅读全文 »</a>
            </div>
          </div>
        </Card>
      ))}
    </section>
  </Skeleton>
);

export default Index;
