import {
  ADD_MY_COMMENT,
  GET_COMMENTS_FOR_POST,
  GET_POST,
  SET_COMMENTS_LOADING,
  SET_LOADING,
} from '../types'

const handlers = {
  [GET_POST]: (state, { payload }) => ({
    ...state,
    post: payload,
    loading: false,
  }),
  [SET_LOADING]: state => ({ ...state, loading: true }),
  [SET_COMMENTS_LOADING]: state => ({ ...state, commentsLoading: true }),
  [GET_COMMENTS_FOR_POST]: (state, { payload }) => ({
    ...state,
    comments: payload,
    commentsLoading: false,
  }),
  [ADD_MY_COMMENT]: (state, { payload }) => ({ ...state, comments: payload }),
  DEFAULT: state => state,
}

export const PostReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
