import React, { useState } from 'react';
import { Skeleton } from 'antd';
import styles from '../index.less';
import classNames from 'classnames';
import { ArticleListDataItemType } from '@/pages/frontend/home/data';
import ReactMarkdown from 'react-markdown';
import Ellipsis from '@/components/Ellipsis';
import ArticleSkeleton from '@/pages/frontend/home/components/ArticleSkeleton';

interface ArticleProps {
  dataSource: ArticleListDataItemType[];
  loading: boolean;
}
const Index: React.FC<ArticleProps> = ({ loading, dataSource, ...rest }) => {
  const [articleState, setArticleState] = useState<boolean>(true);

  const handleClickDetail = () => setArticleState(!articleState);

  return (
    <Skeleton loading={loading}>
      <section className={classNames(styles.content, styles.clearfix)}>
        {dataSource.map(item => (
          <ArticleSkeleton item={item} {...rest}>
            <div className={styles.articleBody}>
              {articleState ? (
                <Ellipsis lines={6}>
                  <ReactMarkdown source={item.content} escapeHtml={false} />
                </Ellipsis>
              ) : (
                <ReactMarkdown source={item.content} escapeHtml={false} />
              )}
            </div>
            <div className={styles.articleDetail}>
              <a onClick={handleClickDetail}>阅读全文 »</a>
            </div>
          </ArticleSkeleton>
        ))}
      </section>
    </Skeleton>
  );
};

export default Index;
