import {GET_POSTS, SET_LOADING, SET_POSTS_FOR_SEARCHING} from "../types"

const handlers = {
    [GET_POSTS]: (state, {payload}) => ({...state, posts: payload, postsForSearching: payload, loading: false}),
    [SET_LOADING]: state => ({...state, loading: true}),
    [SET_POSTS_FOR_SEARCHING]: (state, {payload}) => ({...state, postsForSearching: payload}),
    DEFAULT: state => state
}

export const PostsReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}