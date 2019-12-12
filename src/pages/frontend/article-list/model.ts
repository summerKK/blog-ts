import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ArticleListDataItemType } from '@/pages/frontend/data';
import { getArticleList } from '@/pages/frontend/article-list/service';

export interface StateType {
  list: ArticleListDataItemType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchArticle: Effect;
  };
  reducers: {
    articleList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'articleList',
  state: {
    list: [],
  },
  effects: {
    *fetchArticle({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'articleList',
        payload: response,
      });
    },
  },
  reducers: {
    articleList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
