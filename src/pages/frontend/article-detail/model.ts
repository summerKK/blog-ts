import { ArticleListDataItemType } from '@/pages/frontend/data';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getArticleItem } from './service';

export interface StateType {
  articleItem: ArticleListDataItemType | {};
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchArticleItem: Effect;
  };
  reducers: {
    articleItem: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'articleItem',
  state: {
    articleItem: {},
  },
  effects: {
    *fetchArticleItem({ payload }, { call, put }) {
      const response = yield call(getArticleItem, payload);
      yield put({
        type: 'articleItem',
        payload: response,
      });
    },
  },
  reducers: {
    articleItem(state, action) {
      return {
        ...state,
        articleItem: action.payload,
      };
    },
  },
};

export default Model;
