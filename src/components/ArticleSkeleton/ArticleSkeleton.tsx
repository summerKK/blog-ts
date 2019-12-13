import React from 'react';
import styles from './index.less';
import moment from 'moment';
import { Card, Icon } from 'antd';
import { ArticleListDataItemType } from '@/pages/frontend/data';

interface ArticleSkeletonProps {
  item: ArticleListDataItemType;
  className?: string;
  loading?: boolean;
}

const ArticleSkeleton: React.FC<ArticleSkeletonProps> = ({
  item,
  children,
  className,
  ...rest
}) => (
  <Card className={styles.article} key={item.id} {...rest}>
    <div className={styles.articleDate}>
      <div className={styles.articleMonth}>{moment(item.created_at).format('M')}月</div>
      <div className={styles.articleDay}>{moment(item.created_at).format('DD')}</div>
    </div>
    <div className={styles.badge}>
      <span>
        <a>
          <span>{item.article_type}</span>
        </a>
      </span>
    </div>
    <div className={styles.block}>
      <div className={styles.articleHeader}>
        <h1>
          <a>{item.title}</a>
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
            <Icon type="eye" style={{ color: '#ff3f1a', marginRight: '5px' }} />被 {item.page_view}
            人看爆
          </span>
        </div>
      </div>
      {children}
    </div>
  </Card>
);

export default ArticleSkeleton;
