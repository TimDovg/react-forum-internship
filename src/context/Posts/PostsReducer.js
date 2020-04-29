import {GET_POSTS, SET_LOADING} from "../types"

const handlers = {
    [GET_POSTS]: (state, {payload}) => ({...state, posts: payload, loading: false}),
    [SET_LOADING]: state => ({...state, loading: true}),
    DEFAULT: state => state
}

export const PostsReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}