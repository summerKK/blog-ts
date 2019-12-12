import request from '@/utils/request';

interface ParamsType {
  articleId: number;
}

export async function getArticleItem(params: ParamsType) {
  return request('/api/article-item', {
    params,
  });
}
