import {
  CLEAR_ALL_STATE,
  REMOVE_ADMIN,
  REMOVE_EMAIL,
  REMOVE_TOKEN,
  SET_ADMIN,
  SET_EMAIL,
  SET_TOKEN,
} from '../types'

const handlers = {
  [SET_TOKEN]: (state, { payload }) => ({ ...state, token: payload }),
  [REMOVE_TOKEN]: state => ({ ...state, token: false }),
  [SET_ADMIN]: state => ({ ...state, admin: true }),
  [REMOVE_ADMIN]: state => ({ ...state, admin: false }),
  [SET_EMAIL]: (state, { payload }) => ({ ...state, email: payload }),
  [REMOVE_EMAIL]: state => ({ ...state, email: false }),
  [CLEAR_ALL_STATE]: (state, { payload }) => payload,
  DEFAULT: state => state,
}

export const AuthReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
