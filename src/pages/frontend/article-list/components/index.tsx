import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import styles from '@/components/ArticleSkeleton/index.less';
import classNames from 'classnames';
import { ArticleListDataItemType } from '@/pages/frontend/data';
import ReactMarkdown from 'react-markdown';
import Ellipsis from '@/components/Ellipsis';
import ArticleSkeleton from '@/components/ArticleSkeleton/ArticleSkeleton';
import Link from 'umi/link';

interface ArticleProps {
  dataSource: ArticleListDataItemType[];
  loading: boolean;
}
const Index: React.FC<ArticleProps> = ({ loading, dataSource, ...rest }) => {
  const handleClickDetail = () => {
    localStorage.setItem('articleListHeight', String(document.documentElement.scrollTop));
    window.scroll(0, 400);
  };

  useEffect(() => {
    if (Number(localStorage.getItem('articleListHeight')) > 0) {
      window.scroll(0, Number(localStorage.getItem('articleListHeight')));
      localStorage.setItem('articleListHeight', '0');
    }
  }, []);

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
              <Link to={`/article-item/${item.id}`} onClick={handleClickDetail}>
                阅读全文 »
              </Link>
            </div>
          </ArticleSkeleton>
        ))}
      </section>
    </Skeleton>
  );
};

export default Index;
