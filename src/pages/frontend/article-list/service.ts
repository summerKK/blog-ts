import request from '@/utils/request';
import { ArticleListDataItemType } from '@/pages/frontend/data';

interface ParamsType extends Partial<ArticleListDataItemType> {
  count?: number;
}

export async function getArticleList(params: ParamsType) {
  return request('/api/article-list', {
    params,
  });
}
