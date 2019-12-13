import React from 'react';
import { Skeleton } from 'antd';
import styles from '@/components/ArticleSkeleton/index.less';
import classNames from 'classnames';
import { ArticleListDataItemType } from '@/pages/frontend/data';
import ReactMarkdown from 'react-markdown';
import Ellipsis from '@/components/Ellipsis';
import ArticleSkeleton from '@/components/ArticleSkeleton/ArticleSkeleton';
import { Link } from 'umi';

interface ArticleProps {
  dataSource: ArticleListDataItemType[];
  loading: boolean;
}
const Index: React.FC<ArticleProps> = ({ loading, dataSource, ...rest }) => {
  const handleClickDetail = () => window.scroll(0, 400);

  return (
    <Skeleton loading={loading}>
      <section className={classNames(styles.content, styles.clearfix)}>
        {dataSource.map(item => (
          <ArticleSkeleton item={item} {...rest} key={item.id}>
            <div className={styles.articleBody}>
              <Ellipsis lines={6}>
                <ReactMarkdown source={item.content} escapeHtml={false} />
              </Ellipsis>
            </div>
            <div className={styles.articleDetail}>
              <Link to={`/article-item/${item.id}`}>
                <a onClick={handleClickDetail}>阅读全文 »</a>
              </Link>
            </div>
          </ArticleSkeleton>
        ))}
      </section>
    </Skeleton>
  );
};

export default Index;
